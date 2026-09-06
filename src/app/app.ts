import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

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
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  activeScreen: 'home' | 'credits' = 'home';

  // Identity
  profileName = 'LANG User';
  myLangNumber = '+92-925-600-000';
  verifiedIdentity = true;

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
    { code: 'fa', name: 'Farsi' },
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
    { code: 'af', name: 'Afrikaans' },
    { code: 'sw', name: 'Swahili' },
    { code: 'yo', name: 'Yoruba' },
    { code: 'ig', name: 'Igbo' },
    { code: 'ha', name: 'Hausa' },
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
    { code: 'cy', name: 'Welsh' },
    { code: 'br', name: 'Breton' },
    { code: 'oc', name: 'Occitan' },
    { code: 'rm', name: 'Romansh' },
    { code: 'ka', name: 'Georgian' },
    { code: 'be', name: 'Belarusian' },
    { code: 'mo', name: 'Moldovan' },
    { code: 'jv', name: 'Javanese' },
    { code: 'ht', name: 'Haitian Creole' },
    { code: 'sw', name: 'Swahili' },
    { code: 'ps', name: 'Pashto' },
    { code: 'dv', name: 'Dhivehi' },
    { code: 'bo', name: 'Tibetan' },
    { code: 'dz', name: 'Dzongkha' },
    { code: 'kk', name: 'Kazakh' },
    { code: 'tk', name: 'Turkmen' },
    { code: 'uz', name: 'Uzbek' },
    { code: 'tt', name: 'Tatar' },
    { code: 'ba', name: 'Bashkir' },
    { code: 'os', name: 'Ossetian' },
    { code: 'ab', name: 'Abkhazian' },
    { code: 'ce', name: 'Chechen' },
    { code: 'cv', name: 'Chuvash' },
    { code: 'sah', name: 'Yakut' },
    { code: 'fo', name: 'Faroese' },
    { code: 'gd', name: 'Scottish Gaelic' },
    { code: 'yi', name: 'Yiddish' },
    { code: 'am', name: 'Amharic' },
    { code: 'ti', name: 'Tigrinya' },
    { code: 'om', name: 'Oromo' },
    { code: 'arq', name: 'Algerian Arabic' },
    { code: 'arz', name: 'Egyptian Arabic' },
    { code: 'ary', name: 'Moroccan Arabic' },
    { code: 'acm', name: 'Iraqi Arabic' },
    { code: 'apc', name: 'Levantine Arabic' }
  ];

  // Contacts
  contacts: Contact[] = [
    {
      name: 'Ahmed Khan',
      number: '+92-925-600-125',
      language: 'ur'
    },
    {
      name: 'Ali Raza',
      number: '+92-925-600-126',
      language: 'ur'
    },
    {
      name: 'Sara Ahmed',
      number: '+92-925-600-127',
      language: 'ur'
    },
    {
      name: 'Omar Hassan',
      number: '+966-925-600-128',
      language: 'ar'
    },
    {
      name: 'John Smith',
      number: '+44-925-600-129',
      language: 'en'
    },
    {
      name: 'Chen Wei',
      number: '+86-925-600-130',
      language: 'zh'
    },
    {
      name: 'Yuki Tanaka',
      number: '+81-925-600-131',
      language: 'ja'
    },
    {
      name: 'David Miller',
      number: '+1-925-600-132',
      language: 'en'
    },
    {
      name: 'Maria Garcia',
      number: '+34-925-600-133',
      language: 'es'
    },
    {
      name: 'Pierre Martin',
      number: '+33-925-600-134',
      language: 'fr'
    }
  ];

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
  private connectionTimer: ReturnType<typeof setTimeout> | null = null;

  // Incoming call
  incomingCallVisible = false;
  incomingCaller: Contact | null = null;
  incomingCallMode: CallMode = null;

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
    const term = this.searchTerm.trim().toLowerCase();

    if (!term) {
      return this.contacts;
    }

    return this.contacts.filter(contact =>
      (contact.name || '').toLowerCase().includes(term) ||
      contact.number.toLowerCase().includes(term)
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
    return this.formatCallDuration(this.callDuration);
  }

  get selectedContactName(): string {
    if (!this.selectedContact) {
      return 'No contact selected';
    }

    return this.displayName(this.selectedContact);
  }

  // -------------------------
  // Screen
  // -------------------------

  openCredits(): void {
    this.activeScreen = 'credits';
  }

  closeCredits(): void {
    this.activeScreen = 'home';
  }

  // -------------------------
  // Contacts
  // -------------------------

  selectContact(contact: Contact): void {
    this.selectedContact = contact;

    if (contact.language) {
      this.theirLanguage = contact.language;
    }
  }

  displayName(contact: Contact): string {
    const name = contact.name?.trim();

    return name || contact.number;
  }

  getInitial(contact: Contact): string {
    const name = this.displayName(contact).trim();

    if (!name) {
      return '#';
    }

    return name.charAt(0).toUpperCase();
  }

  // -------------------------
  // Dialer
  // -------------------------

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

    this.dialedNumber = this.dialedNumber.slice(0, -1);
  }

  clearDialer(): void {
    this.dialedNumber = '';
  }

  saveDialedContact(): void {
    const number = this.dialedNumber.trim();

    if (!number) {
      return;
    }

    const existing = this.contacts.find(
      contact => contact.number === number
    );

    if (existing) {
      if (this.newContactName.trim()) {
        existing.name = this.newContactName.trim();
      }

      this.selectedContact = existing;
      this.theirLanguage = existing.language || this.detectLanguageFromNumber(number);

      this.showDialer = false;
      this.newContactName = '';

      return;
    }

    const language = this.detectLanguageFromNumber(number);

    const contact: Contact = {
      name: this.newContactName.trim() || number,
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

  useDialedNumberForCall(mode: 'audio' | 'video'): void {
    const number = this.dialedNumber.trim();

    if (!number) {
      return;
    }

    let contact = this.contacts.find(
      item => item.number === number
    );

    if (!contact) {
      contact = {
        name: number,
        number,
        language: this.detectLanguageFromNumber(number)
      };

      this.contacts.unshift(contact);
    }

    this.selectedContact = contact;
    this.theirLanguage =
      contact.language || this.detectLanguageFromNumber(number);

    this.showDialer = false;

    if (mode === 'audio') {
      this.startAudioCall();
    } else {
      this.startVideoCall();
    }
  }

  // -------------------------
  // Language
  // -------------------------

  getLanguageName(code: string): string {
    const language = this.languages.find(
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

  detectLanguageFromNumber(number: string): string {
    const normalized = number.replace(/\s/g, '');

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

    return 'en';
  }

  // -------------------------
  // Calling
  // -------------------------

  startAudioCall(): void {
    this.startCall('audio');
  }

  startVideoCall(): void {
    this.startCall('video');
  }

  private startCall(mode: 'audio' | 'video'): void {
    if (!this.selectedContact) {
      this.openDialer();
      return;
    }

    if (!this.canStartCall()) {
      return;
    }

    this.clearCallTimers();

    this.callMode = mode;
    this.callState = 'calling';
    this.callDuration = 0;

    this.connectionTimer = setTimeout(() => {
      if (this.callState !== 'calling') {
        return;
      }

      this.callState = 'connected';
      this.startCallTimer();
    }, 1200);
  }

  private canStartCall(): boolean {
    if (this.currentMode === 'local') {
      return this.hasLocalPackage && this.localCredits > 0;
    }

    return this.hasTranslationPackage &&
      this.translationCredits > 0;
  }

  disconnectCall(): void {
    this.clearCallTimers();

    this.callState = 'idle';
    this.callMode = null;
    this.callDuration = 0;
  }

  // -------------------------
  // Call Timer
  // -------------------------

  private startCallTimer(): void {
    this.stopCallTimer();

    this.callTimer = setInterval(() => {
      this.callDuration++;

      if (this.callDuration > 0 && this.callDuration % 30 === 0) {
        this.consumeCallCredit();
      }
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

    if (this.connectionTimer) {
      clearTimeout(this.connectionTimer);
      this.connectionTimer = null;
    }
  }

  private consumeCallCredit(): void {
    if (!this.callMode) {
      return;
    }

    const units = this.callMode === 'video' ? 2 : 1;

    if (this.currentMode === 'local') {
      this.localCredits = Math.max(
        0,
        this.localCredits - units
      );

      if (this.localCredits === 0) {
        this.disconnectCall();
      }

      return;
    }

    this.translationCredits = Math.max(
      0,
      this.translationCredits - units
    );

    if (this.translationCredits === 0) {
      this.disconnectCall();
    }
  }

  private formatCallDuration(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;

    return `${String(mins).padStart(2, '0')}:${String(
      secs
    ).padStart(2, '0')}`;
  }

  // -------------------------
  // Incoming Calls
  // -------------------------

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
    if (!this.incomingCaller) {
      return;
    }

    this.selectedContact = this.incomingCaller;

    if (this.incomingCaller.language) {
      this.theirLanguage = this.incomingCaller.language;
    }

    this.callMode = this.incomingCallMode;
    this.callState = 'connected';
    this.callDuration = 0;

    this.incomingCallVisible = false;
    this.startCallTimer();
  }

  rejectIncomingCall(): void {
    this.incomingCallVisible = false;
    this.incomingCaller = null;
    this.incomingCallMode = null;

    this.clearCallTimers();

    this.callState = 'idle';
    this.callMode = null;
    this.callDuration = 0;
  }

  // -------------------------
  // Messages
  // -------------------------

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

    // Backend / MediaRecorder integration will be added in Phase 2.
    console.log('Voice message recording will start here.');
  }

  // -------------------------
  // Fixed Quick Messages
  // -------------------------

  sendQuickMessage(message: string): void {
    if (!this.selectedContact) {
      return;
    }

    // These messages are free and do not use AI or credits.
    console.log(
      'Quick message:',
      message,
      'to:',
      this.selectedContact.number
    );
  }

  // -------------------------
  // Translation Package Demo
  // -------------------------

  enableTranslationDemo(): void {
    this.hasTranslationPackage = true;
    this.translationCredits = 100;
    this.messageCredits = 10;

    this.packageName = 'Translation Demo Package';
    this.packageExpiry = 'Demo balance';

    this.showMessageBox = false;
  }
}