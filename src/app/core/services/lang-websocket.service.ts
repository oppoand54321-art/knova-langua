import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LangWebSocketService {

  private socket: WebSocket | null = null;
  private messageSubject = new Subject<any>();

  public messages$: Observable<any> = this.messageSubject.asObservable();

  connect() {
    const token = localStorage.getItem('access_token');
    if (!token) {
      console.error('No access token found');
      return;
    }

    const wsUrl = `$( {environment.wsUrl}/api/v1/ws?token= $){token}`;
    // environment.wsUrl = ws://localhost:8000

    this.socket = new WebSocket(wsUrl);

    this.socket.onopen = () => {
      console.log('LANG WebSocket connected');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.messageSubject.next(data);
    };

    this.socket.onclose = () => {
      console.log('LANG WebSocket closed');
      // Optional: auto reconnect logic
    };

    this.socket.onerror = (err) => {
      console.error('WebSocket error', err);
    };
  }

  send(data: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(data));
    }
  }

  // Convenience methods
  sendOffer(callId: number, toUserId: number, sdp: string) {
    this.send({ type: 'offer', call_id: callId, to_user_id: toUserId, sdp });
  }

  sendAnswer(callId: number, toUserId: number, sdp: string) {
    this.send({ type: 'answer', call_id: callId, to_user_id: toUserId, sdp });
  }

  sendIceCandidate(callId: number, toUserId: number, candidate: any) {
    this.send({ type: 'ice-candidate', call_id: callId, to_user_id: toUserId, candidate });
  }

  sendAudioChunk(callId: number, sequence: number, audioBase64: string, sampleRate = 16000, speakerGender?: string) {
    this.send({
      type: 'audio-chunk',
      call_id: callId,
      sequence,
      audio_base64: audioBase64,
      sample_rate: sampleRate,
      speaker_gender: speakerGender
    });
  }

  sendMediaControl(callId: number, action: string, value: boolean = true) {
    this.send({ type: 'media-control', call_id: callId, action, value });
  }

  sendHangup(callId: number) {
    this.send({ type: 'hangup', call_id: callId });
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
  }
}