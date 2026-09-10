import {
  Component,
  OnInit,
  ChangeDetectorRef,
  OnDestroy
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LangApiService } from '../../core/services/lang-api.service';
import { LangWebSocketService } from '../../core/services/lang-websocket.service';

type CallMode = 'audio' | 'video' | null;
type CallState = 'idle' | 'calling' | 'ringing' | 'connected';

interface Contact {
  name?: string;
  number: string;
  language: string;
}

interface Language {
  code: string;
  name: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  activeScreen: 'home' | 'credits' = 'home';

  // Identity
  profileName = 'LANG User';
  myLangNumber = 'Loading...';
  verifiedIdentity = true;
  private myUserId: number | null = null;

  // Languages
  myLanguage = 'ur';
  theirLanguage = 'ur';

  languages: Language[] = [
    { code: 'ur', name: 'Urdu' },
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'Arabic' },
    { code: 'zh', name: 'Chinese' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'fa', name: 'Persian' },
    { code: 'tr', name: 'Turkish' },
    { code: 'id', name: 'Indonesian' },
    { code: 'ms', name: 'Malay' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'th', name: 'Thai' },
    { code: 'nl', name: 'Dutch' },
    { code: 'pl', name: 'Polish' },
    { code: 'uk', name: 'Ukrainian' },
    { code: 'ro', name: 'Romanian' },
    { code: 'el', name: 'Greek' },
    { code: 'he', name: 'Hebrew' },
    { code: 'sv', name: 'Swedish' },
    { code: 'no', name: 'Norwegian' },
    { code: 'da', name: 'Danish' },
    { code: 'fi', name: 'Finnish' },
    { code: 'cs', name: 'Czech' },
    { code: 'sk', name: 'Slovak' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'bg', name: 'Bulgarian' },
    { code: 'sr', name: 'Serbian' },
    { code: 'hr', name: 'Croatian' },
    { code: 'sl', name: 'Slovenian' },
    { code: 'bs', name: 'Bosnian' },
    { code: 'sq', name: 'Albanian' },
    { code: 'mk', name: 'Macedonian' },
    { code: 'et', name: 'Estonian' },
    { code: 'lv', name: 'Latvian' },
    { code: 'lt', name: 'Lithuanian' },
    { code: 'is', name: 'Icelandic' },
    { code: 'ga', name: 'Irish' },
    { code: 'cy', name: 'Welsh' },
    { code: 'ca', name: 'Catalan' },
    { code: 'eu', name: 'Basque' },
    { code: 'gl', name: 'Galician' },
    { code: 'af', name: 'Afrikaans' },
    { code: 'sw', name: 'Swahili' },
    { code: 'am', name: 'Amharic' },
    { code: 'so', name: 'Somali' },
    { code: 'ha', name: 'Hausa' },
    { code: 'yo', name: 'Yoruba' },
    { code: 'ig', name: 'Igbo' },
    { code: 'zu', name: 'Zulu' },
    { code: 'xh', name: 'Xhosa' },
    { code: 'rw', name: 'Kinyarwanda' },
    { code: 'mg', name: 'Malagasy' },
    { code: 'ne', name: 'Nepali' },
    { code: 'si', name: 'Sinhala' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
    { code: 'kn', name: 'Kannada' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'mr', name: 'Marathi' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'or', name: 'Odia' },
    { code: 'as', name: 'Assamese' },
    { code: 'my', name: 'Burmese' },
    { code: 'km', name: 'Khmer' },
    { code: 'lo', name: 'Lao' },
    { code: 'mn', name: 'Mongolian' },
    { code: 'ka', name: 'Georgian' },
    { code: 'hy', name: 'Armenian' },
    { code: 'az', name: 'Azerbaijani' },
    { code: 'kk', name: 'Kazakh' },
    { code: 'uz', name: 'Uzbek' },
    { code: 'tk', name: 'Turkmen' },
    { code: 'ky', name: 'Kyrgyz' },
    { code: 'tg', name: 'Tajik' },
    { code: 'ps', name: 'Pashto' },
    { code: 'ku', name: 'Kurdish' },
    { code: 'sd', name: 'Sindhi' },
    { code: 'bal', name: 'Balochi' },
    { code: 'prs', name: 'Dari' },
    { code: 'ug', name: 'Uyghur' },
    { code: 'yi', name: 'Yiddish' },
    { code: 'fil', name: 'Filipino' },
    { code: 'tl', name: 'Tagalog' },
    { code: 'jv', name: 'Javanese' },
    { code: 'su', name: 'Sundanese' },
    { code: 'ceb', name: 'Cebuano' },
    { code: 'haw', name: 'Hawaiian' },
    { code: 'mi', name: 'Māori' },
    { code: 'sm', name: 'Samoan' },
    { code: 'to', name: 'Tongan' },
    { code: 'fj', name: 'Fijian' },
    { code: 'la', name: 'Latin' },
    { code: 'eo', name: 'Esperanto' },
    { code: 'sn', name: 'Shona' },
    { code: 'ny', name: 'Chichewa' },
    { code: 'st', name: 'Sesotho' },
    { code: 'tn', name: 'Tswana' },
    { code: 'ts', name: 'Tsonga' },
    { code: 've', name: 'Venda' },
    { code: 'wo', name: 'Wolof' },
    { code: 'ee', name: 'Ewe' },
    { code: 'ln', name: 'Lingala' },
    { code: 'lu', name: 'Luba-Katanga' },
    { code: 'co', name: 'Corsican' },
    { code: 'fy', name: 'Frisian' },
    { code: 'lb', name: 'Luxembourgish' },
    { code: 'mt', name: 'Maltese' },
    { code: 'br', name: 'Breton' },
    { code: 'oc', name: 'Occitan' },
    { code: 'rm', name: 'Romansh' },
    { code: 'be', name: 'Belarusian' },
    { code: 'mo', name: 'Moldovan' },
    { code: 'ht', name: 'Haitian Creole' },
    { code: 'dv', name: 'Dhivehi' },
    { code: 'bo', name: 'Tibetan' },
    { code: 'dz', name: 'Dzongkha' },
    { code: 'tt', name: 'Tatar' },
    { code: 'ba', name: 'Bashkir' },
    { code: 'os', name: 'Ossetian' },
    { code: 'ab', name: 'Abkhazian' },
    { code: 'ce', name: 'Chechen' },
    { code: 'cv', name: 'Chuvash' },
    { code: 'sah', name: 'Yakut' },
    { code: 'fo', name: 'Faroese' },
    { code: 'gd', name: 'Scottish Gaelic' },
    { code: 'ti', name: 'Tigrinya' },
    { code: 'om', name: 'Oromo' },
    { code: 'arq', name: 'Algerian Arabic' },
    { code: 'arz', name: 'Egyptian Arabic' },
    { code: 'ary', name: 'Moroccan Arabic' },
    { code: 'acm', name: 'Iraqi Arabic' },
    { code: 'apc', name: 'Levantine Arabic' }
  ];

  // Real contacts only
  contacts: Contact[] = [];

  selectedContact: Contact | null = null;
  searchTerm = '';

  // Dialer
  showDialer = false;
  dialedNumber = '';
  newContactName = '';

  // Message box
  showMessageBox = false;

  // Credits / Packages
  hasLocalPackage = true;
  hasTranslationPackage = false;

  localCredits = 1000;
  translationCredits = 0;
  messageCredits = 0;

  packageName = 'Local Annual Package';
  packageExpiry = 'Not connected to backend yet';

  // Call
  callState: CallState = 'idle';
  callMode: CallMode = null;
  callDuration = 0;

  private callTimer: ReturnType<typeof setInterval> | null = null;

  // Backend call
  private activeCallId: number | null = null;
  private remoteUserId: number | null = null;
  private callStartedByMe = false;
  private acceptingIncomingCall = false;

  // WebRTC
  private peerConnection: RTCPeerConnection | null = null;
  private localStream: MediaStream | null = null;
  private remoteStream: MediaStream | null = null;

  private localVideoElement: HTMLVideoElement | null = null;
  private remoteVideoElement: HTMLVideoElement | null = null;
  private remoteAudioElement: HTMLAudioElement | null = null;

  private iceServers: RTCIceServer[] = [];

  // Incoming call
  incomingCallVisible = false;
  incomingCaller: Contact | null = null;
  incomingCallMode: CallMode = null;

  private incomingCallId: number | null = null;
  private incomingCallerUserId: number | null = null;

  constructor(
    private api: LangApiService,
    private ws: LangWebSocketService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPrimaryLangNumber();
    this.loadProfile();
    this.connectWebSocket();
  }

  ngOnDestroy(): void {
    this.clearCallTimers();
    this.destroyPeerConnection();
    this.removeMediaElements();
    this.ws.disconnect();
  }

  private connectWebSocket(): void {
    this.ws.connect();

    this.ws.messages$.subscribe({
      next: (message: any) => {
        this.handleWebSocketMessage(message);
      },
      error: (err) => {
        console.error('LANG WebSocket stream error:', err);
      }
    });
  }

  private handleWebSocketMessage(message: any): void {
    if (!message?.type) {
      return;
    }

    switch (message.type) {
      case 'call-invite':
        this.handleCallInvite(message);
        break;

      case 'call-accept':
        this.handleCallAccepted(message);
        break;

      case 'call-reject':
        this.handleCallRejected(message);
        break;

      case 'call-end':
        this.handleCallEnded(message);
        break;

      case 'offer':
        this.handleOffer(message);
        break;

      case 'answer':
        this.handleAnswer(message);
        break;

      case 'ice-candidate':
        this.handleIceCandidate(message);
        break;

      case 'media-control':
        console.log('Media control:', message);
        break;

      default:
        console.log('LANG WebSocket message:', message);
        break;
    }

    this.cdr.detectChanges();
  }

  private handleCallInvite(message: any): void {
    const callId = Number(message.call_id);
    const callerUserId = Number(message.from_user_id);

    if (!callId || !callerUserId) {
      return;
    }

    if (this.activeCallId && this.activeCallId !== callId) {
      return;
    }

    this.activeCallId = callId;
    this.incomingCallId = callId;
    this.incomingCallerUserId = callerUserId;
    this.remoteUserId = callerUserId;

    const callerNumber = message.caller_number || 'LANG User';

    let contact = this.contacts.find(
      item => item.number === callerNumber
    );

    if (!contact) {
      contact = {
        name: callerNumber,
        number: callerNumber,
        language: message.source_language || 'ur'
      };

      this.contacts.unshift(contact);
    }

    this.incomingCaller = contact;
    this.incomingCallMode =
      message.call_type === 'video' ? 'video' : 'audio';

    this.incomingCallVisible = true;

    this.callMode = this.incomingCallMode;
    this.callState = 'ringing';
    this.callDuration = 0;
    this.callStartedByMe = false;
    this.acceptingIncomingCall = false;

    // Receiver's language is the target language selected by caller.
    if (message.target_language) {
      this.theirLanguage = message.source_language || this.myLanguage;
    }
  }

  private handleCallAccepted(message: any): void {
    const callId = Number(message.call_id);

    if (!this.activeCallId || callId !== this.activeCallId) {
      return;
    }

    if (!this.callStartedByMe) {
      return;
    }

    this.callState = 'calling';

    this.prepareOutgoingPeerConnection()
      .then(() => this.createAndSendOffer())
      .catch((err) => {
        console.error('Failed to start outgoing WebRTC:', err);
        this.failCurrentCall('webrtc-offer-failed');
      });
  }

  private handleCallRejected(message: any): void {
    const callId = Number(message.call_id);

    if (this.activeCallId !== callId) {
      return;
    }

    this.clearCallTimers();
    this.destroyPeerConnection();
    this.removeMediaElements();

    this.callState = 'idle';
    this.callMode = null;
    this.callDuration = 0;

    this.activeCallId = null;
    this.remoteUserId = null;
    this.callStartedByMe = false;

    this.incomingCallVisible = false;
    this.incomingCaller = null;
    this.incomingCallMode = null;
    this.incomingCallId = null;
    this.incomingCallerUserId = null;

    this.cdr.detectChanges();
  }

  private handleCallEnded(message: any): void {
    const callId = Number(message.call_id);

    if (this.activeCallId !== callId) {
      return;
    }

    this.clearCallTimers();
    this.destroyPeerConnection();
    this.removeMediaElements();

    this.callState = 'idle';
    this.callMode = null;
    this.callDuration = 0;

    this.activeCallId = null;
    this.remoteUserId = null;
    this.callStartedByMe = false;

    this.incomingCallVisible = false;
    this.incomingCaller = null;
    this.incomingCallMode = null;
    this.incomingCallId = null;
    this.incomingCallerUserId = null;

    this.cdr.detectChanges();
  }

  private async handleOffer(message: any): Promise<void> {
    const callId = Number(message.call_id);
    const fromUserId = Number(message.from_user_id);
    const sdp = message.sdp;

    if (!callId || !fromUserId || !sdp) {
      return;
    }

    if (this.activeCallId !== callId) {
      return;
    }

    this.remoteUserId = fromUserId;

    try {
      if (!this.peerConnection) {
        await this.prepareIncomingPeerConnection();
      }

      if (!this.peerConnection) {
        throw new Error('PeerConnection unavailable');
      }

      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription({
          type: 'offer',
          sdp
        })
      );

      const answer = await this.peerConnection.createAnswer();

      await this.peerConnection.setLocalDescription(answer);

      this.ws.sendAnswer(
        callId,
        fromUserId,
        answer.sdp || ''
      );
    } catch (err) {
      console.error('Failed to handle WebRTC offer:', err);
      this.failCurrentCall('webrtc-answer-failed');
    }
  }

  private async handleAnswer(message: any): Promise<void> {
    const callId = Number(message.call_id);
    const sdp = message.sdp;

    if (!callId || !sdp) {
      return;
    }

    if (this.activeCallId !== callId) {
      return;
    }

    if (!this.peerConnection) {
      return;
    }

    try {
      await this.peerConnection.setRemoteDescription(
        new RTCSessionDescription({
          type: 'answer',
          sdp
        })
      );
    } catch (err) {
      console.error('Failed to set WebRTC answer:', err);
      this.failCurrentCall('webrtc-answer-description-failed');
    }
  }

  private async handleIceCandidate(message: any): Promise<void> {
    const callId = Number(message.call_id);
    const candidate = message.candidate;

    if (!callId || !candidate) {
      return;
    }

    if (this.activeCallId !== callId) {
      return;
    }

    if (!this.peerConnection) {
      return;
    }

    try {
      await this.peerConnection.addIceCandidate(
        new RTCIceCandidate(candidate)
      );
    } catch (err) {
      console.error('Failed to add remote ICE candidate:', err);
    }
  }

  private async prepareOutgoingPeerConnection(): Promise<void> {
    if (!this.activeCallId || !this.remoteUserId) {
      throw new Error('Missing active call information');
    }

    await this.loadWebRTCConfig();

    await this.prepareLocalMedia();

    this.createPeerConnection();

    this.addLocalTracks();
  }

  private async prepareIncomingPeerConnection(): Promise<void> {
    if (!this.activeCallId || !this.remoteUserId) {
      throw new Error('Missing incoming call information');
    }

    await this.loadWebRTCConfig();

    await this.prepareLocalMedia();

    this.createPeerConnection();

    this.addLocalTracks();
  }

  private async loadWebRTCConfig(): Promise<void> {
    if (this.iceServers.length > 0) {
      return;
    }

    const response: any = await this.api.getWebRTCConfig().toPromise();

    const servers = response?.ice_servers || response?.iceServers || [];

    this.iceServers = servers
      .map((server: any) => ({
        urls: server.urls,
        username: server.username || undefined,
        credential: server.credential || undefined
      }))
      .filter((server: RTCIceServer) => !!server.urls);

    console.log('LANG WebRTC ICE servers loaded:', this.iceServers);
  }

  private async prepareLocalMedia(): Promise<void> {
    if (this.localStream) {
      return;
    }

    const audio = true;
    const video = this.callMode === 'video';

    this.localStream = await navigator.mediaDevices.getUserMedia({
      audio,
      video
    });

    if (video) {
      this.createLocalVideoElement();
      this.attachLocalVideo();
    }
  }

  private createPeerConnection(): void {
    if (this.peerConnection) {
      return;
    }

    this.peerConnection = new RTCPeerConnection({
      iceServers: this.iceServers
    });

    this.peerConnection.onicecandidate = (event) => {
      if (
        event.candidate &&
        this.activeCallId &&
        this.remoteUserId
      ) {
        this.ws.sendIceCandidate(
          this.activeCallId,
          this.remoteUserId,
          event.candidate.toJSON()
        );
      }
    };

    this.peerConnection.ontrack = (event) => {
      this.handleRemoteTrack(event);
    };

    this.peerConnection.onconnectionstatechange = () => {
      this.handlePeerConnectionState();
    };

    this.peerConnection.oniceconnectionstatechange = () => {
      if (
        this.peerConnection?.iceConnectionState === 'failed'
      ) {
        console.error('WebRTC ICE connection failed');

        if (this.activeCallId && this.remoteUserId) {
          this.ws.send({
            type: 'webrtc-failure',
            call_id: this.activeCallId,
            reason: 'ice-connection-failed'
          });
        }
      }
    };
  }

  private addLocalTracks(): void {
    if (!this.peerConnection || !this.localStream) {
      return;
    }

    const senders = this.peerConnection
      .getSenders()
      .map(sender => sender.track?.id)
      .filter(Boolean);

    for (const track of this.localStream.getTracks()) {
      if (!senders.includes(track.id)) {
        this.peerConnection.addTrack(
          track,
          this.localStream
        );
      }
    }
  }

  private async createAndSendOffer(): Promise<void> {
    if (
      !this.peerConnection ||
      !this.activeCallId ||
      !this.remoteUserId
    ) {
      throw new Error('Cannot create offer');
    }

    const offer = await this.peerConnection.createOffer({
      offerToReceiveAudio: true,
      offerToReceiveVideo: this.callMode === 'video'
    });

    await this.peerConnection.setLocalDescription(offer);

    this.ws.sendOffer(
      this.activeCallId,
      this.remoteUserId,
      offer.sdp || ''
    );
  }

  private handleRemoteTrack(event: RTCTrackEvent): void {
    if (!this.remoteStream) {
      this.remoteStream = new MediaStream();
    }

    const alreadyAdded = this.remoteStream
      .getTracks()
      .some(track => track.id === event.track.id);

    if (!alreadyAdded) {
      this.remoteStream.addTrack(event.track);
    }

    if (event.track.kind === 'video') {
      this.createRemoteVideoElement();
      this.attachRemoteVideo();
    } else if (event.track.kind === 'audio') {
      this.createRemoteAudioElement();
      this.attachRemoteAudio();
    }

    this.callState = 'connected';

    if (!this.callTimer) {
      this.callDuration = 0;
      this.startCallTimer();
    }

    this.cdr.detectChanges();
  }

  private handlePeerConnectionState(): void {
    const state = this.peerConnection?.connectionState;

    console.log('WebRTC connection state:', state);

    if (state === 'connected') {
      this.callState = 'connected';

      if (!this.callTimer) {
        this.callDuration = 0;
        this.startCallTimer();
      }

      this.cdr.detectChanges();
    }

    if (state === 'failed') {
      this.failCurrentCall('peer-connection-failed');
    }

    if (state === 'disconnected') {
      console.warn('WebRTC peer disconnected');
    }
  }

  private createLocalVideoElement(): void {
    if (this.localVideoElement) {
      return;
    }

    const video = document.createElement('video');

    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;

    video.style.position = 'fixed';
    video.style.right = '20px';
    video.style.bottom = '100px';
    video.style.width = '180px';
    video.style.maxHeight = '240px';
    video.style.objectFit = 'cover';
    video.style.borderRadius = '14px';
    video.style.zIndex = '9998';
    video.style.background = '#000';

    document.body.appendChild(video);

    this.localVideoElement = video;
  }

  private createRemoteVideoElement(): void {
    if (this.remoteVideoElement) {
      return;
    }

    const video = document.createElement('video');

    video.autoplay = true;
    video.playsInline = true;

    video.style.position = 'fixed';
    video.style.inset = '0';
    video.style.width = '100vw';
    video.style.height = '100vh';
    video.style.objectFit = 'cover';
    video.style.zIndex = '9997';
    video.style.background = '#000';

    document.body.appendChild(video);

    this.remoteVideoElement = video;
  }

  private createRemoteAudioElement(): void {
    if (this.remoteAudioElement) {
      return;
    }

    const audio = document.createElement('audio');

    audio.autoplay = true;
    audio.style.display = 'none';

    document.body.appendChild(audio);

    this.remoteAudioElement = audio;
  }

  private attachLocalVideo(): void {
    if (
      this.localVideoElement &&
      this.localStream
    ) {
      this.localVideoElement.srcObject =
        this.localStream;

      this.localVideoElement.play().catch(() => {});
    }
  }

  private attachRemoteVideo(): void {
    if (
      this.remoteVideoElement &&
      this.remoteStream
    ) {
      const videoTracks =
        this.remoteStream.getVideoTracks();

      if (videoTracks.length > 0) {
        this.remoteVideoElement.srcObject =
          this.remoteStream;

        this.remoteVideoElement.play().catch(() => {});
      }
    }
  }

  private attachRemoteAudio(): void {
    if (
      this.remoteAudioElement &&
      this.remoteStream
    ) {
      this.remoteAudioElement.srcObject =
        this.remoteStream;

      this.remoteAudioElement.play().catch(() => {});
    }
  }

  private destroyPeerConnection(): void {
    if (this.peerConnection) {
      this.peerConnection.onicecandidate = null;
      this.peerConnection.ontrack = null;
      this.peerConnection.onconnectionstatechange = null;
      this.peerConnection.oniceconnectionstatechange = null;

      this.peerConnection.close();
      this.peerConnection = null;
    }

    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        track.stop();
      });

      this.localStream = null;
    }

    if (this.remoteStream) {
      this.remoteStream.getTracks().forEach(track => {
        track.stop();
      });

      this.remoteStream = null;
    }
  }

  private removeMediaElements(): void {
    if (this.localVideoElement) {
      this.localVideoElement.srcObject = null;
      this.localVideoElement.remove();
      this.localVideoElement = null;
    }

    if (this.remoteVideoElement) {
      this.remoteVideoElement.srcObject = null;
      this.remoteVideoElement.remove();
      this.remoteVideoElement = null;
    }

    if (this.remoteAudioElement) {
      this.remoteAudioElement.srcObject = null;
      this.remoteAudioElement.remove();
      this.remoteAudioElement = null;
    }
  }

  private async loadProfile(): Promise<void> {
    const anyApi = this.api as any;

    if (typeof anyApi.getMe !== 'function') {
      return;
    }

    anyApi.getMe().subscribe({
      next: (res: any) => {
        this.myUserId =
          res?.id ??
          res?.user_id ??
          res?.data?.id ??
          null;

        this.profileName =
          res?.full_name ||
          res?.name ||
          res?.email ||
          'LANG User';

        if (res?.primary_language_code) {
          this.myLanguage =
            res.primary_language_code;
        }

        this.verifiedIdentity =
          !!(
            res?.is_verified ||
            res?.email_verified
          );

        this.cdr.detectChanges();
      },
      error: () => {
        // Profile is optional for UI.
      }
    });
  }

  private extractNumber(res: any): string | null {
    return (
      res?.number ||
      res?.display_number ||
      res?.data?.number ||
      res?.data?.display_number ||
      null
    );
  }

  private loadPrimaryLangNumber(): void {
    this.api.getPrimaryNumber().subscribe({
      next: (res: any) => {
        console.log(
          'PRIMARY RESPONSE:',
          res
        );

        const number =
          this.extractNumber(res);

        if (number) {
          this.myLangNumber = number;
          this.cdr.detectChanges();
        } else {
          this.assignFirstLangNumber();
        }
      },

      error: (err) => {
        if (err?.status === 404) {
          this.assignFirstLangNumber();
          return;
        }

        this.myLangNumber = 'Unavailable';
        this.cdr.detectChanges();

        console.error(
          'Failed to load primary LANG number:',
          err
        );
      }
    });
  }

  private assignFirstLangNumber(): void {
    this.api.assignNumber().subscribe({
      next: (res: any) => {
        console.log(
          'ASSIGN RESPONSE:',
          res
        );

        const number =
          this.extractNumber(res);

        if (number) {
          this.myLangNumber = number;
        } else {
          this.myLangNumber = 'Assigned';
        }

        this.cdr.detectChanges();
      },

      error: (err) => {
        this.myLangNumber = 'Unavailable';
        this.cdr.detectChanges();

        console.error(
          'Failed to assign LANG number:',
          err
        );
      }
    });
  }

  get totalCredits(): number {
    return (
      this.localCredits +
      this.translationCredits +
      this.messageCredits
    );
  }

  get currentMode(): 'local' | 'translation' {
    return this.myLanguage === this.theirLanguage
      ? 'local'
      : 'translation';
  }

  get sendMessageEnabled(): boolean {
    return (
      this.hasTranslationPackage &&
      !!this.selectedContact &&
      this.messageCredits > 0
    );
  }

  get filteredContacts(): Contact[] {
    const term =
      this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.contacts;
    }

    return this.contacts.filter(contact =>
      (contact.name || '')
        .toLowerCase()
        .includes(term) ||
      contact.number
        .toLowerCase()
        .includes(term)
    );
  }

  get callStateLabel(): string {
    switch (this.callState) {
      case 'calling':
        return 'Calling...';

      case 'ringing':
        return 'Ringing...';

      case 'connected':
        return 'Connected';

      default:
        return 'Ready';
    }
  }

  get formattedCallDuration(): string {
    return this.formatCallDuration(
      this.callDuration
    );
  }

  get selectedContactName(): string {
    if (!this.selectedContact) {
      return 'No contact selected';
    }

    return this.displayName(
      this.selectedContact
    );
  }

  openCredits(): void {
    this.activeScreen = 'credits';
  }

  closeCredits(): void {
    this.activeScreen = 'home';
  }

  selectContact(contact: Contact): void {
    this.selectedContact = contact;

    if (contact.language) {
      this.theirLanguage =
        contact.language;
    }
  }

  displayName(contact: Contact): string {
    const name =
      contact.name?.trim();

    return name || contact.number;
  }

  getInitial(contact: Contact): string {
    const name =
      this.displayName(contact).trim();

    if (!name) {
      return '#';
    }

    return name.charAt(0).toUpperCase();
  }

  openDialer(): void {
    this.showDialer = true;
    this.newContactName = '';
  }

  closeDialer(): void {
    this.showDialer = false;
  }

  dialKey(key: string): void {
    if (this.dialedNumber.length >= 20) {
      return;
    }

    this.dialedNumber += key;
  }

  backspaceDialer(): void {
    if (!this.dialedNumber) {
      return;
    }

    this.dialedNumber =
      this.dialedNumber.slice(0, -1);
  }

  clearDialer(): void {
    this.dialedNumber = '';
  }

  saveDialedContact(): void {
    const number =
      this.dialedNumber.trim();

    if (!number) {
      return;
    }

    const existing =
      this.contacts.find(
        contact =>
          contact.number === number
      );

    if (existing) {
      if (this.newContactName.trim()) {
        existing.name =
          this.newContactName.trim();
      }

      this.selectedContact = existing;

      this.theirLanguage =
        existing.language ||
        this.detectLanguageFromNumber(
          number
        );

      this.showDialer = false;
      this.newContactName = '';

      return;
    }

    const language =
      this.detectLanguageFromNumber(
        number
      );

    const contact: Contact = {
      name:
        this.newContactName.trim() ||
        number,
      number,
      language
    };

    this.contacts.unshift(contact);

    this.selectedContact = contact;
    this.theirLanguage = language;

    this.showDialer = false;
    this.dialedNumber = '';
    this.newContactName = '';
  }

  useDialedNumberForCall(
    mode: 'audio' | 'video'
  ): void {
    const number =
      this.dialedNumber.trim();

    if (!number) {
      return;
    }

    let contact =
      this.contacts.find(
        item =>
          item.number === number
      );

    if (!contact) {
      contact = {
        name: number,
        number,
        language:
          this.detectLanguageFromNumber(
            number
          )
      };

      this.contacts.unshift(contact);
    }

    this.selectedContact = contact;

    this.theirLanguage =
      contact.language ||
      this.detectLanguageFromNumber(
        number
      );

    this.showDialer = false;

    if (mode === 'audio') {
      this.startAudioCall();
    } else {
      this.startVideoCall();
    }
  }

  getLanguageName(code: string): string {
    const language =
      this.languages.find(
        item => item.code === code
      );

    return language?.name || code;
  }

  setMyLanguage(code: string): void {
    this.myLanguage = code;
  }

  setTheirLanguage(code: string): void {
    this.theirLanguage = code;
  }

  detectLanguageFromNumber(
    number: string
  ): string {
    const normalized =
      number.replace(/\s/g, '');

    if (
      normalized.startsWith('+92') ||
      normalized.startsWith('0092')
    ) {
      return 'ur';
    }

    if (
      normalized.startsWith('+966') ||
      normalized.startsWith('00966')
    ) {
      return 'ar';
    }

    if (
      normalized.startsWith('+86') ||
      normalized.startsWith('0086')
    ) {
      return 'zh';
    }

    if (
      normalized.startsWith('+81') ||
      normalized.startsWith('0081')
    ) {
      return 'ja';
    }

    if (
      normalized.startsWith('+82') ||
      normalized.startsWith('0082')
    ) {
      return 'ko';
    }

    if (
      normalized.startsWith('+44') ||
      normalized.startsWith('0044')
    ) {
      return 'en';
    }

    if (
      normalized.startsWith('+1') ||
      normalized.startsWith('001')
    ) {
      return 'en';
    }

    if (
      normalized.startsWith('+33') ||
      normalized.startsWith('0033')
    ) {
      return 'fr';
    }

    if (
      normalized.startsWith('+49') ||
      normalized.startsWith('0049')
    ) {
      return 'de';
    }

    if (
      normalized.startsWith('+34') ||
      normalized.startsWith('0034')
    ) {
      return 'es';
    }

    if (
      normalized.startsWith('+39') ||
      normalized.startsWith('0039')
    ) {
      return 'it';
    }

    if (
      normalized.startsWith('+7') ||
      normalized.startsWith('007')
    ) {
      return 'ru';
    }

    if (
      normalized.startsWith('+90') ||
      normalized.startsWith('0090')
    ) {
      return 'tr';
    }

    if (
      normalized.startsWith('+91') ||
      normalized.startsWith('0091')
    ) {
      return 'hi';
    }

    if (
      normalized.startsWith('+880') ||
      normalized.startsWith('00880')
    ) {
      return 'bn';
    }

    /*
     * LANG internal numbers such as:
     * 234500004
     *
     * are not country-code numbers.
     *
     * For the current Local-to-Local testing,
     * use the selected/current language rather
     * than incorrectly changing Urdu to English.
     */
    return this.myLanguage || 'ur';
  }

  startAudioCall(): void {
    this.startCall('audio');
  }

  startVideoCall(): void {
    this.startCall('video');
  }

  private startCall(
    mode: 'audio' | 'video'
  ): void {
    if (!this.selectedContact) {
      this.openDialer();
      return;
    }

    if (this.callState !== 'idle') {
      return;
    }

    if (!this.canStartCall()) {
      console.warn(
        'Call cannot start: package/credits unavailable.'
      );
      return;
    }

    const receiverNumber =
      this.selectedContact.number.trim();

    if (!receiverNumber) {
      return;
    }

    this.clearCallTimers();
    this.destroyPeerConnection();
    this.removeMediaElements();

    this.callMode = mode;
    this.callState = 'calling';
    this.callDuration = 0;
    this.callStartedByMe = true;
    this.incomingCallVisible = false;

    this.api
      .initiateCall(
        receiverNumber,
        mode
      )
      .subscribe({
        next: async (response: any) => {
          const callId =
            Number(
              response?.id ??
              response?.call_id ??
              response?.data?.id ??
              response?.data?.call_id
            );

          if (!callId) {
            console.error(
              'Call initiated but no call ID returned:',
              response
            );

            this.failCurrentCall(
              'missing-call-id'
            );

            return;
          }

          this.activeCallId = callId;

          this.remoteUserId =
            Number(
              response?.receiver_id ??
              response?.data?.receiver_id ??
              0
            ) || null;

          console.log(
            'LANG call initiated:',
            response
          );

          this.api
            .ringCall(callId)
            .subscribe({
              next: () => {
                this.callState = 'calling';
                this.cdr.detectChanges();
              },

              error: (err) => {
                console.error(
                  'Failed to ring call:',
                  err
                );

                this.failCurrentCall(
                  'ring-failed'
                );
              }
            });
        },

        error: (err) => {
          console.error(
            'Failed to initiate call:',
            err
          );

          this.failCurrentCall(
            'initiate-failed'
          );
        }
      });
  }

  private canStartCall(): boolean {
    if (this.currentMode === 'local') {
      return (
        this.hasLocalPackage &&
        this.localCredits > 0
      );
    }

    return (
      this.hasTranslationPackage &&
      this.translationCredits > 0
    );
  }

  disconnectCall(): void {
    const callId =
      this.activeCallId;

    this.clearCallTimers();

    if (callId) {
      this.api
        .endCall(callId)
        .subscribe({
          next: () => {
            console.log(
              'LANG call ended:',
              callId
            );
          },

          error: (err) => {
            console.error(
              'Failed to end call:',
              err
            );
          }
        });

      this.ws.sendHangup(callId);
    }

    this.clearCurrentCallState();
  }

  private clearCurrentCallState(): void {
    this.clearCallTimers();
    this.destroyPeerConnection();
    this.removeMediaElements();

    this.callState = 'idle';
    this.callMode = null;
    this.callDuration = 0;

    this.activeCallId = null;
    this.remoteUserId = null;
    this.callStartedByMe = false;
    this.acceptingIncomingCall = false;

    this.incomingCallVisible = false;
    this.incomingCaller = null;
    this.incomingCallMode = null;
    this.incomingCallId = null;
    this.incomingCallerUserId = null;

    this.cdr.detectChanges();
  }

  private failCurrentCall(
    reason: string
  ): void {
    console.error(
      'LANG call failed:',
      reason
    );

    const callId =
      this.activeCallId;

    if (callId) {
      this.ws.send({
        type: 'webrtc-failure',
        call_id: callId,
        reason
      });

      this.api
        .endCall(callId)
        .subscribe({
          error: () => {}
        });
    }

    this.clearCurrentCallState();
  }

  private startCallTimer(): void {
    this.stopCallTimer();

    this.callTimer =
      setInterval(() => {
        this.callDuration++;

        if (
          this.callDuration > 0 &&
          this.callDuration % 30 === 0
        ) {
          this.consumeCallCredit();
        }

        this.cdr.detectChanges();
      }, 1000);
  }

  private stopCallTimer(): void {
    if (this.callTimer) {
      clearInterval(this.callTimer);
      this.callTimer = null;
    }
  }

  private clearCallTimers(): void {
    this.stopCallTimer();
  }

  private consumeCallCredit(): void {
    if (!this.callMode) {
      return;
    }

    const units =
      this.callMode === 'video'
        ? 2
        : 1;

    if (
      this.currentMode === 'local'
    ) {
      this.localCredits =
        Math.max(
          0,
          this.localCredits - units
        );

      if (this.localCredits === 0) {
        this.disconnectCall();
      }

      return;
    }

    this.translationCredits =
      Math.max(
        0,
        this.translationCredits - units
      );

    if (
      this.translationCredits === 0
    ) {
      this.disconnectCall();
    }
  }

  private formatCallDuration(
    seconds: number
  ): string {
    const mins =
      Math.floor(seconds / 60);

    const secs =
      seconds % 60;

    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  receiveIncomingCall(
    contact: Contact,
    mode: 'audio' | 'video'
  ): void {
    this.incomingCaller = contact;
    this.incomingCallMode = mode;
    this.incomingCallVisible = true;
    this.callState = 'ringing';
  }

  answerIncomingCall(): void {
    if (
      !this.incomingCaller ||
      !this.incomingCallId ||
      !this.incomingCallerUserId
    ) {
      return;
    }

    const callId =
      this.incomingCallId;

    this.selectedContact =
      this.incomingCaller;

    if (
      this.incomingCaller.language
    ) {
      this.theirLanguage =
        this.incomingCaller.language;
    }

    this.callMode =
      this.incomingCallMode;

    this.callDuration = 0;
    this.callState = 'ringing';

    this.acceptingIncomingCall = true;
    this.callStartedByMe = false;
    this.activeCallId = callId;
    this.remoteUserId =
      this.incomingCallerUserId;

    this.api
      .acceptCall(callId)
      .subscribe({
        next: async () => {
          this.incomingCallVisible = false;

          try {
            await this.prepareIncomingPeerConnection();

            this.callState = 'ringing';

            this.cdr.detectChanges();
          } catch (err) {
            console.error(
              'Failed to prepare incoming WebRTC:',
              err
            );

            this.failCurrentCall(
              'incoming-media-failed'
            );
          }
        },

        error: (err) => {
          console.error(
            'Failed to accept call:',
            err
          );

          this.failCurrentCall(
            'accept-failed'
          );
        }
      });
  }

  rejectIncomingCall(): void {
    const callId =
      this.incomingCallId;

    if (callId) {
      this.api
        .rejectCall(callId)
        .subscribe({
          error: (err) => {
            console.error(
              'Failed to reject call:',
              err
            );
          }
        });
    }

    this.clearCallTimers();
    this.destroyPeerConnection();
    this.removeMediaElements();

    this.incomingCallVisible = false;
    this.incomingCaller = null;
    this.incomingCallMode = null;
    this.incomingCallId = null;
    this.incomingCallerUserId = null;

    this.activeCallId = null;
    this.remoteUserId = null;

    this.callState = 'idle';
    this.callMode = null;
    this.callDuration = 0;

    this.callStartedByMe = false;
    this.acceptingIncomingCall = false;

    this.cdr.detectChanges();
  }

  openMessageBox(): void {
    if (!this.sendMessageEnabled) {
      return;
    }

    this.showMessageBox = true;
  }

  closeMessageBox(): void {
    this.showMessageBox = false;
  }

  startVoiceMessage(): void {
    if (!this.sendMessageEnabled) {
      return;
    }

    console.log(
      'Voice message recording will start here.'
    );
  }

  sendQuickMessage(message: string): void {
    if (!this.selectedContact) {
      return;
    }

    console.log(
      'Quick message:',
      message,
      'to:',
      this.selectedContact.number
    );
  }

  enableTranslationDemo(): void {
    this.hasTranslationPackage = true;
    this.translationCredits = 100;
    this.messageCredits = 10;

    this.packageName =
      'Translation Demo Package';

    this.packageExpiry =
      'Demo balance';

    this.showMessageBox = false;
  }
}