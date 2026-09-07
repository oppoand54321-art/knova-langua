import { Injectable } from '@angular/core';
import { LangApiService } from './lang-api.service';
import { LangWebSocketService } from './lang-websocket.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LangCallService {

  public currentCall$ = new BehaviorSubject<any>(null);
  public callStatus$ = new BehaviorSubject<string>('idle'); // idle | ringing | connected | ended
  public subtitles$ = new BehaviorSubject<any[]>([]);

  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private sequence = 0;

  constructor(
    private api: LangApiService,
    private ws: LangWebSocketService
  ) {
    // Listen to all WebSocket events
    this.ws.messages$.subscribe(msg => this.handleSignaling(msg));
  }

  async startOutgoingCall(receiverNumber: string, callType: 'audio' | 'video' = 'audio') {
    // 1. Initiate
    const call: any = await this.api.initiateCall(receiverNumber, callType).toPromise();
    this.currentCall$.next(call);
    this.callStatus$.next('initiated');

    // 2. Ring
    await this.api.ringCall(call.id).toPromise();
    this.callStatus$.next('ringing');

    // 3. Setup WebRTC
    await this.setupWebRTC(callType === 'video');
  }

  async acceptIncomingCall(call: any) {
    this.currentCall$.next(call);
    await this.api.acceptCall(call.id).toPromise();
    this.callStatus$.next('accepted');
    await this.setupWebRTC(call.call_type === 'video');
    await this.api.startPipeline(call.id).toPromise();
  }

  private async setupWebRTC(withVideo: boolean) {
    const config: any = await this.api.getWebRTCConfig().toPromise();

    this.peerConnection = new RTCPeerConnection({
      iceServers: config.ice_servers
    });

    this.localStream = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: withVideo
    });

    this.localStream.getTracks().forEach(track => {
      this.peerConnection!.addTrack(track, this.localStream!);
    });

    this.peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        const call = this.currentCall$.value;
        // to_user_id frontend pe store karna hoga
        this.ws.sendIceCandidate(call.id, call.receiver_id || call.caller_id, event.candidate);
      }
    };

    this.peerConnection.ontrack = (event) => {
      // remote audio/video play karo
      const remoteAudio = document.getElementById('remoteAudio') as HTMLAudioElement;
      if (remoteAudio) {
        remoteAudio.srcObject = event.streams[0];
      }
    };
  }

  private handleSignaling(msg: any) {
    switch (msg.type) {
      case 'call-invite':
        // UI pe incoming call dikhao
        this.currentCall$.next(msg);
        this.callStatus$.next('incoming');
        break;

      case 'call-accept':
        this.callStatus$.next('connected');
        break;

      case 'offer':
        this.handleOffer(msg);
        break;

      case 'answer':
        this.handleAnswer(msg);
        break;

      case 'ice-candidate':
        this.peerConnection?.addIceCandidate(msg.candidate);
        break;

      case 'translated-audio':
        // Play translated audio
        this.playTranslatedAudio(msg.audio_base64);
        break;

      case 'subtitle':
        const current = this.subtitles$.value;
        this.subtitles$.next([...current, msg]);
        break;

      case 'call-end':
      case 'hangup':
        this.cleanup();
        break;
    }
  }

  private async handleOffer(msg: any) {
    await this.peerConnection!.setRemoteDescription({ type: 'offer', sdp: msg.sdp });
    const answer = await this.peerConnection!.createAnswer();
    await this.peerConnection!.setLocalDescription(answer);
    this.ws.sendAnswer(msg.call_id, msg.from_user_id, answer.sdp!);
  }

  private async handleAnswer(msg: any) {
    await this.peerConnection!.setRemoteDescription({ type: 'answer', sdp: msg.sdp });
  }

  private playTranslatedAudio(base64: string) {
    const audio = new Audio(`data:audio/wav;base64,${base64}`);
    audio.play();
  }

  endCall() {
    const call = this.currentCall$.value;
    if (call) {
      this.api.endCall(call.id).subscribe();
      this.ws.sendHangup(call.id);
    }
    this.cleanup();
  }

  private cleanup() {
    this.localStream?.getTracks().forEach(t => t.stop());
    this.peerConnection?.close();
    this.peerConnection = null;
    this.currentCall$.next(null);
    this.callStatus$.next('ended');
    this.subtitles$.next([]);
  }
}