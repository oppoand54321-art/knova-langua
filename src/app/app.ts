import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Contact {
  name?: string;
  number: string;
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

  /* ================================
     Contacts
  ================================= */

  searchTerm = '';

  contacts: Contact[] = [
    { name: 'Ali', number: '9256000001' },
    { name: 'Bilal', number: '9256000002' },
    { name: 'Chen', number: '9256000003' },
    { name: 'David', number: '9256000004' },
    { name: 'Emma', number: '9256000005' },
    { name: 'Fatima', number: '9256000006' },
    { name: 'George', number: '9256000007' },
    { name: 'Hassan', number: '9256000008' },
    { number: '9256000009' },
    { number: '9256000010' }
  ];

  selectedContact: Contact | null = null;


  /* ================================
     Languages
  ================================= */

  languages: Language[] = [

    { code: 'en', name: 'English' },
    { code: 'ur', name: 'Urdu' },
    { code: 'ar', name: 'Arabic' },
    { code: 'zh', name: 'Chinese' },
    { code: 'ru', name: 'Russian' },
    { code: 'fa', name: 'Persian' },
    { code: 'hi', name: 'Hindi' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'it', name: 'Italian' },
    { code: 'tr', name: 'Turkish' },
    { code: 'ko', name: 'Korean' },
    { code: 'ja', name: 'Japanese' },
    { code: 'bn', name: 'Bengali' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'sd', name: 'Sindhi' },
    { code: 'ps', name: 'Pashto' },
    { code: 'he', name: 'Hebrew' },
    { code: 'nl', name: 'Dutch' },
    { code: 'pl', name: 'Polish' },
    { code: 'uk', name: 'Ukrainian' },
    { code: 'ro', name: 'Romanian' },
    { code: 'el', name: 'Greek' },
    { code: 'cs', name: 'Czech' },
    { code: 'sv', name: 'Swedish' },
    { code: 'da', name: 'Danish' },
    { code: 'no', name: 'Norwegian' },
    { code: 'fi', name: 'Finnish' },
    { code: 'hu', name: 'Hungarian' },
    { code: 'bg', name: 'Bulgarian' },
    { code: 'sr', name: 'Serbian' },
    { code: 'hr', name: 'Croatian' },
    { code: 'sk', name: 'Slovak' },
    { code: 'sl', name: 'Slovenian' },
    { code: 'et', name: 'Estonian' },
    { code: 'lv', name: 'Latvian' },
    { code: 'lt', name: 'Lithuanian' },
    { code: 'is', name: 'Icelandic' },
    { code: 'ga', name: 'Irish' },
    { code: 'mt', name: 'Maltese' },
    { code: 'sq', name: 'Albanian' },
    { code: 'mk', name: 'Macedonian' },
    { code: 'bs', name: 'Bosnian' },
    { code: 'hy', name: 'Armenian' },
    { code: 'ka', name: 'Georgian' },
    { code: 'az', name: 'Azerbaijani' },
    { code: 'kk', name: 'Kazakh' },
    { code: 'uz', name: 'Uzbek' },
    { code: 'tk', name: 'Turkmen' },
    { code: 'ky', name: 'Kyrgyz' },
    { code: 'tg', name: 'Tajik' },
    { code: 'mn', name: 'Mongolian' },
    { code: 'ne', name: 'Nepali' },
    { code: 'si', name: 'Sinhala' },
    { code: 'ta', name: 'Tamil' },
    { code: 'te', name: 'Telugu' },
    { code: 'mr', name: 'Marathi' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'kn', name: 'Kannada' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'or', name: 'Odia' },
    { code: 'as', name: 'Assamese' },
    { code: 'my', name: 'Burmese' },
    { code: 'th', name: 'Thai' },
    { code: 'vi', name: 'Vietnamese' },
    { code: 'id', name: 'Indonesian' },
    { code: 'ms', name: 'Malay' },
    { code: 'tl', name: 'Filipino' },
    { code: 'km', name: 'Khmer' },
    { code: 'lo', name: 'Lao' },
    { code: 'jv', name: 'Javanese' },
    { code: 'sw', name: 'Swahili' },
    { code: 'am', name: 'Amharic' },
    { code: 'so', name: 'Somali' },
    { code: 'ha', name: 'Hausa' },
    { code: 'yo', name: 'Yoruba' },
    { code: 'ig', name: 'Igbo' },
    { code: 'zu', name: 'Zulu' },
    { code: 'xh', name: 'Xhosa' },
    { code: 'af', name: 'Afrikaans' },
    { code: 'rw', name: 'Kinyarwanda' },
    { code: 'mg', name: 'Malagasy' },
    { code: 'ny', name: 'Chichewa' },
    { code: 'sn', name: 'Shona' },
    { code: 'ar-DZ', name: 'Algerian Arabic' },
    { code: 'ar-MA', name: 'Moroccan Arabic' },
    { code: 'ar-EG', name: 'Egyptian Arabic' },
    { code: 'de-AT', name: 'Austrian German' },
    { code: 'de-CH', name: 'Swiss German' },
    { code: 'fr-CA', name: 'Canadian French' },
    { code: 'pt-BR', name: 'Brazilian Portuguese' },
    { code: 'es-MX', name: 'Mexican Spanish' },
    { code: 'es-AR', name: 'Argentine Spanish' },
    { code: 'es-CO', name: 'Colombian Spanish' },
    { code: 'en-US', name: 'American English' },
    { code: 'en-GB', name: 'British English' },
    { code: 'en-AU', name: 'Australian English' },
    { code: 'en-CA', name: 'Canadian English' },
    { code: 'zh-CN', name: 'Simplified Chinese' },
    { code: 'zh-TW', name: 'Traditional Chinese' },
    { code: 'pt-PT', name: 'European Portuguese' },
    { code: 'fa-AF', name: 'Dari' },
    { code: 'uz-Latn', name: 'Uzbek Latin' },
    { code: 'sr-Latn', name: 'Serbian Latin' },
    { code: 'ku', name: 'Kurdish' },
    { code: 'ckb', name: 'Central Kurdish' },
    { code: 'ps-AF', name: 'Afghan Pashto' },
    { code: 'ur-IN', name: 'Indian Urdu' },
    { code: 'pa-IN', name: 'Indian Punjabi' },
    { code: 'pa-PK', name: 'Pakistani Punjabi' },
    { code: 'sd-PK', name: 'Sindhi' },
    { code: 'bal', name: 'Balochi' },
    { code: 'br', name: 'Breton' },
    { code: 'cy', name: 'Welsh' },
    { code: 'eu', name: 'Basque' },
    { code: 'ca', name: 'Catalan' },
    { code: 'gl', name: 'Galician' },
    { code: 'la', name: 'Latin' },
    { code: 'eo', name: 'Esperanto' },
    { code: 'sw-TZ', name: 'Tanzanian Swahili' },
    { code: 'sw-KE', name: 'Kenyan Swahili' },
    { code: 'fil', name: 'Filipino' },
    { code: 'ceb', name: 'Cebuano' },
    { code: 'hmn', name: 'Hmong' },
    { code: 'ps-PK', name: 'Pakistani Pashto' },
    { code: 'prs', name: 'Dari Persian' },
    { code: 'tk-TM', name: 'Turkmen' },
    { code: 'ku-TR', name: 'Turkish Kurdish' },
    { code: 'tt', name: 'Tatar' },
    { code: 'ba', name: 'Bashkir' },
    { code: 'ug', name: 'Uyghur' },
    { code: 'yi', name: 'Yiddish' },
    { code: 'am-ET', name: 'Amharic' },
    { code: 'om', name: 'Oromo' },
    { code: 'ti', name: 'Tigrinya' },
    { code: 'ee', name: 'Ewe' },
    { code: 'ak', name: 'Akan' },
    { code: 'ig-NG', name: 'Nigerian Igbo' },
    { code: 'yo-NG', name: 'Nigerian Yoruba' },
    { code: 'lg', name: 'Luganda' },
    { code: 'rn', name: 'Kirundi' },
    { code: 'st', name: 'Southern Sotho' },
    { code: 'tn', name: 'Tswana' },
    { code: 'ts', name: 'Tsonga' },
    { code: 've', name: 'Venda' },
    { code: 'wo', name: 'Wolof' },
    { code: 'ff', name: 'Fula' },
    { code: 'lu', name: 'Luba-Katanga' },
    { code: 'ln', name: 'Lingala' },
    { code: 'kg', name: 'Kongo' },
    { code: 'sg', name: 'Sango' },
    { code: 'mo', name: 'Moldovan' },
    { code: 'be', name: 'Belarusian' },
    { code: 'bs-Cyrl', name: 'Bosnian Cyrillic' },
    { code: 'fo', name: 'Faroese' },
    { code: 'lb', name: 'Luxembourgish' },
    { code: 'fy', name: 'Frisian' },
    { code: 'nn', name: 'Norwegian Nynorsk' },
    { code: 'nb', name: 'Norwegian Bokmål' },
    { code: 'gd', name: 'Scottish Gaelic' },
    { code: 'co', name: 'Corsican' },
    { code: 'oc', name: 'Occitan' },
    { code: 'rm', name: 'Romansh' },
    { code: 'wa', name: 'Walloon' },
    { code: 'mi', name: 'Māori' },
    { code: 'sm', name: 'Samoan' },
    { code: 'to', name: 'Tongan' },
    { code: 'fj', name: 'Fijian' },
    { code: 'haw', name: 'Hawaiian' },
    { code: 'ht', name: 'Haitian Creole' },
    { code: 'swc', name: 'Congo Swahili' },
    { code: 'pap', name: 'Papiamento' },
    { code: 'qu', name: 'Quechua' },
    { code: 'ay', name: 'Aymara' },
    { code: 'gn', name: 'Guarani' },
    { code: 'nah', name: 'Nahuatl' },
    { code: 'yo', name: 'Yoruba' },
    { code: 'zu', name: 'Zulu' }
  ];


  /* ================================
     Language State
  ================================= */

  myLanguage = 'ur';

  theirLanguage = 'en';

  myLanguageLocked = false;


  /* ================================
     Favorite / Quick Languages
  ================================= */

  favoriteLanguageCodes = [
    'en',
    'ur',
    'ar',
    'zh',
    'ru',
    'fa',
    'es',
    'fr',
    'de',
    'tr'
  ];

  get favoriteLanguages(): Language[] {
    return this.favoriteLanguageCodes
      .map(code =>
        this.languages.find(language => language.code === code)
      )
      .filter(
        (language): language is Language => !!language
      );
  }


  /* ================================
     Contact Filtering
  ================================= */

  get filteredContacts(): Contact[] {

    const term = this.searchTerm
      .trim()
      .toLowerCase();

    if (!term) {
      return this.contacts;
    }

    return this.contacts.filter(contact => {

      const name =
        contact.name?.toLowerCase() ?? '';

      const number =
        contact.number.toLowerCase();

      return (
        name.includes(term) ||
        number.includes(term)
      );
    });
  }


  /* ================================
     Contact Actions
  ================================= */

  selectContact(contact: Contact): void {
    this.selectedContact = contact;
  }

  displayName(contact: Contact): string {
    return contact.name?.trim() || contact.number;
  }

  getInitial(contact: Contact): string {

    if (contact.name?.trim()) {
      return contact.name
        .trim()
        .charAt(0)
        .toUpperCase();
    }

    return contact.number.charAt(0);
  }


  /* ================================
     Language Actions
  ================================= */

  selectTheirLanguage(code: string): void {
    this.theirLanguage = code;

    console.log(
      'Language Pair →',
      this.myLanguage,
      '→',
      this.theirLanguage
    );
  }


  getLanguageName(code: string): string {

    return (
      this.languages.find(
        language => language.code === code
      )?.name ?? code
    );
  }


  /* ================================
     Calls
  ================================= */

  startAudioCall(): void {

    if (!this.selectedContact) {
      return;
    }

    console.log(
      'Audio Call →',
      this.selectedContact.number
    );

    console.log(
      'Translation →',
      this.getLanguageName(this.myLanguage),
      '→',
      this.getLanguageName(this.theirLanguage)
    );
  }


  startVideoCall(): void {

    if (!this.selectedContact) {
      return;
    }

    console.log(
      'Video Call →',
      this.selectedContact.number
    );

    console.log(
      'Translation →',
      this.getLanguageName(this.myLanguage),
      '→',
      this.getLanguageName(this.theirLanguage)
    );
  }


  /* ================================
     Quick Messages
  ================================= */

  sendQuickMessage(message: string): void {

    if (!this.selectedContact) {
      return;
    }

    console.log(
      'Quick Message →',
      message,
      '→',
      this.selectedContact.number
    );
  }
}