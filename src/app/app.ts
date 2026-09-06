import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Contact {
  name?: string;
  number: string;
  language: string;
  favorite?: boolean;
}

interface Language {
  code: string;
  name: string;
}

type CallMode = 'audio' | 'video' | null;
type CallState = 'idle' | 'calling' | 'ringing' | 'connected';
type Screen = 'home' | 'credits';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnDestroy {

  // =========================================================
  // SCREEN / MODALS
  // =========================================================

  activeScreen: Screen = 'home';

  showDialer = false;
  showMessageBox = false;

  // =========================================================
  // USER IDENTITY
  // =========================================================

  profileName = 'LANG User';

  myLangNumber = '+92-925-600-000';

  verifiedIdentity = true;

  // =========================================================
  // PACKAGES / CREDITS
  // =========================================================

  hasLocalPackage = true;
  hasTranslationPackage = false;

  localCredits = 1000;
  translationCredits = 0;
  messageCredits = 0;

  packageName = 'Local Annual Package';

  packageExpiry = 'Not connected to backend yet';

  get totalCredits(): number {
    return (
      this.localCredits +
      this.translationCredits +
      this.messageCredits
    );
  }

  get sendMessageEnabled(): boolean {
    return (
      this.hasTranslationPackage &&
      !!this.selectedContact
    );
  }

  // =========================================================
  // LANGUAGE STATE
  // =========================================================

  myLanguage = 'ur';
  theirLanguage = 'en';

  // =========================================================
  // CONTACT SEARCH
  // =========================================================

  searchTerm = '';

  // =========================================================
  // DIALER
  // =========================================================

  dialedNumber = '';

  newContactName = '';

  // =========================================================
  // CALL STATE
  // =========================================================

  callState: CallState = 'idle';

  callMode: CallMode = null;

  callDuration = 0;

  private callTimer: ReturnType<typeof setInterval> | null = null;

  // =========================================================
  // INCOMING CALL
  // =========================================================

  incomingCallVisible = false;

  incomingCallMode: 'audio' | 'video' = 'audio';

  incomingCaller: Contact = {
    name: 'Ahmed Khan',
    number: '+92-925-600-125',
    language: 'ur',
    favorite: true
  };

  // =========================================================
  // CONTACTS
  // =========================================================

  contacts: Contact[] = [
    {
      name: 'Ahmed Khan',
      number: '+92-925-600-125',
      language: 'ur',
      favorite: true
    },
    {
      name: 'Sarah Ahmed',
      number: '+92-925-600-126',
      language: 'ur',
      favorite: true
    },
    {
      name: 'Mohammed Ali',
      number: '+966-925-600-127',
      language: 'ar',
      favorite: false
    },
    {
      name: 'John Smith',
      number: '+44-925-600-128',
      language: 'en',
      favorite: false
    },
    {
      name: 'Li Wei',
      number: '+86-925-600-129',
      language: 'zh',
      favorite: false
    },
    {
      name: 'Kenji Tanaka',
      number: '+81-925-600-130',
      language: 'ja',
      favorite: false
    },
    {
      name: 'Maria Garcia',
      number: '+34-925-600-131',
      language: 'es',
      favorite: false
    },
    {
      name: 'Jean Martin',
      number: '+33-925-600-132',
      language: 'fr',
      favorite: false
    },
    {
      name: 'Omar Hassan',
      number: '+20-925-600-133',
      language: 'ar',
      favorite: false
    },
    {
      name: 'David Miller',
      number: '+1-925-600-134',
      language: 'en',
      favorite: false
    }
  ];

  selectedContact: Contact | null = null;

  // =========================================================
  // LANGUAGES
  // =========================================================

  languages: Language[] = [

    { code: 'ur', name: 'Urdu' },
    { code: 'en', name: 'English' },
    { code: 'ar', name: 'Arabic' },
    { code: 'zh', name: 'Chinese (Mandarin)' },
    { code: 'hi', name: 'Hindi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'fa', name: 'Persian' },
    { code: 'tr', name: 'Turkish' },
    { code: 'ru', name: 'Russian' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'th', name: 'Thai' },
    { code: 'id', name: 'Indonesian' },
    { code: 'ms', name: 'Malay' },
    { code: 'fil', name: 'Filipino' },
    { code: 'nl', name: 'Dutch' },
    { code: 'pl', name: 'Polish' },
    { code: 'uk', name: 'Ukrainian' },
    { code: 'ro', name: 'Romanian' },
    { code: 'el', name: 'Greek' },
    { code: 'cs', name: 'Czech' },
    { code: 'sk', name: 'Slovak' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'sv', name: 'Swedish' },
    { code: 'no', name: 'Norwegian' },
    { code: 'da', name: 'Danish' },
    { code: 'fi', name: 'Finnish' },
    { code: 'he', name: 'Hebrew' },
    { code: 'sw', name: 'Swahili' },
    { code: 'am', name: 'Amharic' },
    { code: 'so', name: 'Somali' },
    { code: 'ha', name: 'Hausa' },
    { code: 'yo', name: 'Yoruba' },
    { code: 'ig', name: 'Igbo' },
    { code: 'zu', name: 'Zulu' },
    { code: 'xh', name: 'Xhosa' },
    { code: 'af', name: 'Afrikaans' },
    { code: 'sq', name: 'Albanian' },
    { code: 'hy', name: 'Armenian' },
    { code: 'az', name: 'Azerbaijani' },
    { code: 'eu', name: 'Basque' },
    { code: 'be', name: 'Belarusian' },
    { code: 'bs', name: 'Bosnian' },
    { code: 'bg', name: 'Bulgarian' },
    { code: 'ca', name: 'Catalan' },
    { code: 'hr', name: 'Croatian' },
    { code: 'et', name: 'Estonian' },
    { code: 'ka', name: 'Georgian' },
    { code: 'is', name: 'Icelandic' },
    { code: 'ga', name: 'Irish' },
    { code: 'lv', name: 'Latvian' },
    { code: 'lt', name: 'Lithuanian' },
    { code: 'mk', name: 'Macedonian' },
    { code: 'mt', name: 'Maltese' },
    { code: 'sr', name: 'Serbian' },
    { code: 'sl', name: 'Slovenian' },
    { code: 'cy', name: 'Welsh' },
    { code: 'gl', name: 'Galician' },
    { code: 'eo', name: 'Esperanto' },
    { code: 'la', name: 'Latin' },
    { code: 'ne', name: 'Nepali' },
    { code: 'si', name: 'Sinhala' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'kn', name: 'Kannada' },
    { code: 'mr', name: 'Marathi' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'or', name: 'Odia' },
    { code: 'as', name: 'Assamese' },
    { code: 'my', name: 'Burmese' },
    { code: 'km', name: 'Khmer' },
    { code: 'lo', name: 'Lao' },
    { code: 'mn', name: 'Mongolian' },
    { code: 'ka', name: 'Georgian' },
    { code: 'kk', name: 'Kazakh' },
    { code: 'ky', name: 'Kyrgyz' },
    { code: 'tg', name: 'Tajik' },
    { code: 'tk', name: 'Turkmen' },
    { code: 'uz', name: 'Uzbek' },
    { code: 'ps', name: 'Pashto' },
    { code: 'ku', name: 'Kurdish' },
    { code: 'sd', name: 'Sindhi' },
    { code: 'bal', name: 'Balochi' },
    { code: 'ckb', name: 'Central Kurdish' },
    { code: 'dv', name: 'Dhivehi' },
    { code: 'jv', name: 'Javanese' },
    { code: 'su', name: 'Sundanese' },
    { code: 'ceb', name: 'Cebuano' },
    { code: 'haw', name: 'Hawaiian' },
    { code: 'mi', name: 'Māori' },
    { code: 'sm', name: 'Samoan' },
    { code: 'to', name: 'Tongan' },
    { code: 'fj', name: 'Fijian' },
    { code: 'mg', name: 'Malagasy' },
    { code: 'ny', name: 'Chichewa' },
    { code: 'rw', name: 'Kinyarwanda' },
    { code: 'sn', name: 'Shona' },
    { code: 'st', name: 'Sesotho' },
    { code: 'tn', name: 'Tswana' },
    { code: 'ts', name: 'Tsonga' },
    { code: 'wo', name: 'Wolof' },
    { code: 'yo', name: 'Yoruba' },
    { code: 'ig', name: 'Igbo' },
    { code: 'ln', name: 'Lingala' },
    { code: 'lu', name: 'Luba-Katanga' },
    { code: 'co', name: 'Corsican' },
    { code: 'fy', name: 'Frisian' },
    { code: 'lb', name: 'Luxembourgish' },
    { code: 'oc', name: 'Occitan' },
    { code: 'br', name: 'Breton' },
    { code: 'gd', name: 'Scottish Gaelic' },
    { code: 'fo', name: 'Faroese' },
    { code: 'bs', name: 'Bosnian' },
    { code: 'nn', name: 'Norwegian Nynorsk' },
    { code: 'jv', name: 'Javanese' },
    { code: 'su', name: 'Sundanese' },
    { code: 'hmn', name: 'Hmong' },
    { code: 'la', name: 'Latin' },
    { code: 'yi', name: 'Yiddish' },
    { code: 'ht', name: 'Haitian Creole' },
    { code: 'haw', name: 'Hawaiian' },
    { code: 'pap', name: 'Papiamento' },
    { code: 'af', name: 'Afrikaans' },
    { code: 'sw', name: 'Swahili' },
    { code: 'am', name: 'Amharic' },
    { code: 'ti', name: 'Tigrinya' },
    { code: 'om', name: 'Oromo' },
    { code: 'ee', name: 'Ewe' },
    { code: 'tw', name: 'Twi' },
    { code: 'lg', name: 'Luganda' },
    { code: 'ak', name: 'Akan' },
    { code: 'bm', name: 'Bambara' },
    { code: 'ff', name: 'Fulah' },
    { code: 'rn', name: 'Kirundi' },
    { code: 'sg', name: 'Sango' },
    { code: 'ss', name: 'Swati' },
    { code: 've', name: 'Venda' },
    { code: 'nr', name: 'Southern Ndebele' },
    { code: 'dz', name: 'Dzongkha' },
    { code: 'bo', name: 'Tibetan' },
    { code: 'ug', name: 'Uyghur' },
    { code: 'malt', name: 'Maltese' },
    { code: 'fo', name: 'Faroese' },
    { code: 'ku', name: 'Kurdish' },
    { code: 'prs', name: 'Dari' },
    { code: 'az', name: 'Azerbaijani' },
    { code: 'tk', name: 'Turkmen' },
    { code: 'uz', name: 'Uzbek' },
    { code: 'kk', name: 'Kazakh' },
    { code: 'ky', name: 'Kyrgyz' },
    { code: 'tg', name: 'Tajik' },
    { code: 'mn', name: 'Mongolian' },
    { code: 'tatar', name: 'Tatar' },
    { code: 'ba', name: 'Bashkir' },
    { code: 'tt', name: 'Tatar' },
    { code: 'cv', name: 'Chuvash' },
    { code: 'os', name: 'Ossetian' },
    { code: 'ab', name: 'Abkhazian' },
    { code: 'ce', name: 'Chechen' },
    { code: 'av', name: 'Avar' },
    { code: 'lez', name: 'Lezghian' },
    { code: 'sah', name: 'Yakut' },
    { code: 'rom', name: 'Romani' },
    { code: 'tl', name: 'Tagalog' },
    { code: 'brx', name: 'Bodo' },
    { code: 'mai', name: 'Maithili' },
    { code: 'bho', name: 'Bhojpuri' },
    { code: 'doi', name: 'Dogri' },
    { code: 'kok', name: 'Konkani' },
    { code: 'mni', name: 'Manipuri' },
    { code: 'sat', name: 'Santali' },
    { code: 'syr', name: 'Syriac' },
    { code: 'arc', name: 'Aramaic' },
    { code: 'he', name: 'Hebrew' },
    { code: 'fa', name: 'Persian' },
    { code: 'ps', name: 'Pashto' },
    { code: 'sd', name: 'Sindhi' },
    { code: 'ur', name: 'Urdu' }
  ];

  // =========================================================
  // FILTERED CONTACTS
  // =========================================================

  get filteredContacts(): Contact[] {

    const query = this.searchTerm
      .trim()
      .toLowerCase();

    if (!query) {
      return this.contacts;
    }

    return this.contacts.filter((contact) => {

      const name = (contact.name || '').toLowerCase();

      const number = contact.number.toLowerCase();

      const language = this
        .getLanguageName(contact.language)
        .toLowerCase();

      return (
        name.includes(query) ||
        number.includes(query) ||
        language.includes(query)
      );
    });
  }

  // =========================================================
  // SCREEN METHODS
  // =========================================================

  openCredits(): void {
    this.activeScreen = 'credits';
  }

  closeCredits(): void {
    this.activeScreen = 'home';
  }

  // =========================================================
  // CONTACT METHODS
  // =========================================================

  selectContact(contact: Contact): void {
    this.selectedContact = contact;

    if (contact.language) {
      this.theirLanguage = contact.language;
    }
  }

  displayName(contact: Contact): string {
    return contact.name?.trim()
      ? contact.name
      : contact.number;
  }

  getInitial(contact: Contact): string {

    const name = contact.name?.trim();

    if (!name) {
      return contact.number.charAt(0) || 'L';
    }

    const parts = name
      .split(' ')
      .filter(Boolean);

    if (parts.length >= 2) {
      return (
        parts[0].charAt(0) +
        parts[parts.length - 1].charAt(0)
      ).toUpperCase();
    }

    return name.charAt(0).toUpperCase();
  }

  // =========================================================
  // DIALER
  // =========================================================

  openDialer(): void {
    this.showDialer = true;
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

    const number = this.dialedNumber.trim();

    if (!number) {
      return;
    }

    const exists = this.contacts.some(
      contact => contact.number === number
    );

    if (exists) {
      return;
    }

    const detectedLanguage =
      this.detectLanguageFromNumber(number);

    const contact: Contact = {
      name: this.newContactName.trim() || undefined,
      number,
      language: detectedLanguage,
      favorite: false
    };

    this.contacts.unshift(contact);

    this.selectedContact = contact;

    this.theirLanguage = detectedLanguage;

    this.newContactName = '';

    this.closeDialer();
  }

  // =========================================================
  // COUNTRY CODE → DEFAULT LANGUAGE
  // =========================================================

  detectLanguageFromNumber(number: string): string {

    const cleanNumber =
      number.replace(/\s/g, '');

    const countryMap: Record<string, string> = {

      '+92': 'ur',
      '+966': 'ar',
      '+971': 'ar',
      '+974': 'ar',
      '+973': 'ar',
      '+965': 'ar',
      '+968': 'ar',
      '+962': 'ar',
      '+964': 'ar',
      '+20': 'ar',
      '+86': 'zh',
      '+81': 'ja',
      '+82': 'ko',
      '+44': 'en',
      '+1': 'en',
      '+61': 'en',
      '+64': 'en',
      '+27': 'en',
      '+91': 'hi',
      '+880': 'bn',
      '+93': 'ps',
      '+98': 'fa',
      '+90': 'tr',
      '+7': 'ru',
      '+380': 'uk',
      '+49': 'de',
      '+33': 'fr',
      '+34': 'es',
      '+39': 'it',
      '+351': 'pt',
      '+55': 'pt',
      '+31': 'nl',
      '+46': 'sv',
      '+47': 'no',
      '+45': 'da',
      '+358': 'fi',
      '+48': 'pl',
      '+40': 'ro',
      '+30': 'el',
      '+420': 'cs',
      '+421': 'sk',
      '+36': 'hu',
      '+43': 'de',
      '+41': 'de',
      '+32': 'nl',
      '+52': 'es',
      '+54': 'es',
      '+57': 'es',
      '+56': 'es',
      '+51': 'es',
      '+58': 'es',
      '+62': 'id',
      '+60': 'ms',
      '+63': 'fil',
      '+66': 'th',
      '+84': 'vi',
      '+94': 'si',
      '+95': 'my',
      '+977': 'ne',
      '+212': 'ar',
      '+213': 'ar',
      '+216': 'ar',
      '+218': 'ar',
      '+249': 'ar',
      '+254': 'sw',
      '+255': 'sw',
      '+256': 'en',
      '+260': 'en',
      '+263': 'en',
      '+234': 'en',
      '+233': 'en',
      '+221': 'fr',
      '+225': 'fr',
      '+237': 'fr',
      '+250': 'rw',
      '+258': 'pt',
      '+244': 'pt'
    };

    const matchedCode =
      Object.keys(countryMap)
        .sort((a, b) => b.length - a.length)
        .find(code => cleanNumber.startsWith(code));

    return matchedCode
      ? countryMap[matchedCode]
      : 'en';
  }

  // =========================================================
  // DIALER CALL
  // =========================================================

  useDialedNumberForCall(
    mode: 'audio' | 'video'
  ): void {

    const number = this.dialedNumber.trim();

    if (!number) {
      return;
    }

    const existingContact =
      this.contacts.find(
        contact => contact.number === number
      );

    if (existingContact) {

      this.selectedContact = existingContact;

      this.theirLanguage =
        existingContact.language;

    } else {

      const detectedLanguage =
        this.detectLanguageFromNumber(number);

      this.selectedContact = {
        number,
        language: detectedLanguage
      };

      this.theirLanguage =
        detectedLanguage;
    }

    this.closeDialer();

    if (mode === 'audio') {
      this.startAudioCall();
    } else {
      this.startVideoCall();
    }
  }

  // =========================================================
  // LANGUAGE
  // =========================================================

  getLanguageName(code: string): string {

    const language =
      this.languages.find(
        item => item.code === code
      );

    return language?.name || code;
  }

  selectTheirLanguage(code: string): void {
    this.theirLanguage = code;
  }

  get currentMode(): 'local' | 'translation' {

    return this.myLanguage === this.theirLanguage
      ? 'local'
      : 'translation';
  }

  // =========================================================
  // CALLS
  // =========================================================

  startAudioCall(): void {

    if (!this.selectedContact) {
      this.openDialer();
      return;
    }

    this.startCall('audio');
  }

  startVideoCall(): void {

    if (!this.selectedContact) {
      this.openDialer();
      return;
    }

    this.startCall('video');
  }

  private startCall(
    mode: 'audio' | 'video'
  ): void {

    if (this.callState !== 'idle') {
      return;
    }

    this.callMode = mode;

    this.callDuration = 0;

    this.callState = 'calling';

    this.startCallTimer();

    /*
     * Backend integration point:
     *
     * 1. Create call session
     * 2. Validate recipient
     * 3. Determine Local / Translation mode
     * 4. Reserve required credits
     * 5. Establish WebRTC connection
     * 6. Connect LANG WebSocket signaling
     * 7. Connect KNova Core only when translation is required
     */
  }

  disconnectCall(): void {

    this.stopCallTimer();

    this.callState = 'idle';

    this.callMode = null;

    this.callDuration = 0;
  }

  // =========================================================
  // CALL TIMER
  // =========================================================

  private startCallTimer(): void {

    this.stopCallTimer();

    this.callTimer = setInterval(() => {

      if (
        this.callState === 'calling' ||
        this.callState === 'ringing' ||
        this.callState === 'connected'
      ) {
        this.callDuration++;
      }

      /*
       * Demo behavior:
       * After a short simulated ringing period,
       * the call becomes connected.
       *
       * This will be removed when WebRTC/backend
       * signaling is connected.
       */
      if (
        this.callState === 'calling' &&
        this.callDuration >= 2
      ) {
        this.callState = 'connected';
      }

    }, 1000);
  }

  private stopCallTimer(): void {

    if (this.callTimer) {
      clearInterval(this.callTimer);
      this.callTimer = null;
    }
  }

  formatCallDuration(): string {

    const minutes =
      Math.floor(this.callDuration / 60);

    const seconds =
      this.callDuration % 60;

    return (
      `${minutes.toString().padStart(2, '0')}:` +
      `${seconds.toString().padStart(2, '0')}`
    );
  }

  callStateLabel(): string {

    switch (this.callState) {

      case 'calling':
        return 'Calling…';

      case 'ringing':
        return 'Ringing…';

      case 'connected':
        return 'Connected';

      default:
        return '';
    }
  }

  // =========================================================
  // INCOMING CALL
  // =========================================================

  receiveIncomingCall(
    caller?: Contact,
    mode: 'audio' | 'video' = 'audio'
  ): void {

    if (caller) {
      this.incomingCaller = caller;
    }

    this.incomingCallMode = mode;

    this.incomingCallVisible = true;
  }

  answerIncomingCall(): void {

    this.selectedContact =
      this.incomingCaller;

    this.theirLanguage =
      this.incomingCaller.language;

    this.incomingCallVisible = false;

    this.callMode =
      this.incomingCallMode;

    this.callState = 'connected';

    this.callDuration = 0;

    this.startCallTimer();
  }

  rejectIncomingCall(): void {

    this.incomingCallVisible = false;

    this.callState = 'idle';

    this.callMode = null;

    this.stopCallTimer();
  }

  // =========================================================
  // MESSAGE BOX
  // =========================================================

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

    /*
     * Future backend integration:
     *
     * MediaRecorder
     * ↓
     * max 30 seconds
     * ↓
     * upload / realtime transport
     * ↓
     * KNova Core translation
     * ↓
     * TTS
     * ↓
     * recipient
     *
     * 1 message credit per 30 seconds.
     */

    console.log(
      'Voice message recording will start here.'
    );
  }

  // =========================================================
  // FIXED QUICK MESSAGES
  // =========================================================

  sendQuickMessage(
    message: 'Call Me' | 'Help Me' | 'I’ll Call You Back'
  ): void {

    /*
     * Fixed messages are:
     *
     * FREE
     * No AI
     * No translation credit
     * No message credit
     *
     * Backend will later enforce:
     * maximum 3 quick messages / 24 hours.
     */

    console.log(
      'Quick message:',
      message,
      'to:',
      this.selectedContact?.number
    );
  }

  // =========================================================
  // DEMO TRANSLATION PACKAGE
  // =========================================================

  enableTranslationDemo(): void {

    this.hasTranslationPackage = true;

    this.translationCredits = 500;

    this.messageCredits = 50;

    this.packageName =
      'Local + Translation Demo Package';

    
  }

  // =========================================================
  // CLEANUP
  // =========================================================

  ngOnDestroy(): void {
    this.stopCallTimer();
  }
}