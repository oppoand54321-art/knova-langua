import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LangApiService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private get headers() {
    const token = localStorage.getItem('access_token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  // ========== AUTH ==========

  register(data: {
    email: string;
    password: string;
    full_name?: string;
    phone_number: string;
  }) {
    return this.http.post(
      `${this.baseUrl}/auth/register`,
      data
    );
  }

  login(data: {
    email: string;
    password: string;
  }) {
    return this.http.post(
      `${this.baseUrl}/auth/login`,
      data
    );
  }

  getMe() {
    return this.http.get(
      `${this.baseUrl}/auth/me`,
      { headers: this.headers }
    );
  }

  // ========== LANG NUMBERS ==========

  getPrimaryNumber() {
    return this.http.get(
      `${this.baseUrl}/numbers/primary`,
      { headers: this.headers }
    );
  }

  assignNumber() {
    return this.http.post(
      `${this.baseUrl}/numbers/assign`,
      {},
      { headers: this.headers }
    );
  }

  // ========== CALLS ==========

  initiateCall(
    receiverNumber: string,
    callType: 'audio' | 'video' = 'audio'
  ) {
    return this.http.post(
      `${this.baseUrl}/calls/initiate`,
      {
        receiver_number: receiverNumber,
        call_type: callType
      },
      { headers: this.headers }
    );
  }

  ringCall(callId: number) {
    return this.http.post(
      `${this.baseUrl}/calls/${callId}/ring`,
      {},
      { headers: this.headers }
    );
  }

  acceptCall(callId: number) {
    return this.http.post(
      `${this.baseUrl}/calls/${callId}/accept`,
      {},
      { headers: this.headers }
    );
  }

  rejectCall(callId: number) {
    return this.http.post(
      `${this.baseUrl}/calls/${callId}/reject`,
      {},
      { headers: this.headers }
    );
  }

  endCall(callId: number) {
    return this.http.post(
      `${this.baseUrl}/calls/${callId}/end`,
      {},
      { headers: this.headers }
    );
  }

  getWebRTCConfig() {
    return this.http.get(
      `${this.baseUrl}/calls/webrtc-config`,
      { headers: this.headers }
    );
  }

  // ========== AUDIO PIPELINE ==========

  startPipeline(
    callId: number,
    preferredVoiceGender?: string
  ) {
    return this.http.post(
      `${this.baseUrl}/audio/pipeline/start`,
      {
        call_id: callId,
        preferred_voice_gender: preferredVoiceGender
      },
      { headers: this.headers }
    );
  }

  stopPipeline(callId: number) {
    return this.http.post(
      `${this.baseUrl}/audio/pipeline/stop/${callId}`,
      {},
      { headers: this.headers }
    );
  }

  // ========== VOICE MESSAGE ==========

  sendVoiceMessage(data: {
    receiver_number: string;
    audio_base64: string;
    duration_seconds: number;
    sample_rate?: number;
  }) {
    return this.http.post(
      `${this.baseUrl}/voice-messages/send`,
      data,
      { headers: this.headers }
    );
  }

  getVoiceInbox() {
    return this.http.get(
      `${this.baseUrl}/voice-messages/inbox`,
      { headers: this.headers }
    );
  }
}