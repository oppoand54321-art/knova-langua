import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the home page', () => {
    expect(component).toBeTruthy();
  });

  it('should start with the home screen active', () => {
    expect(component.activeScreen).toBe('home');
  });

  it('should have the default profile identity', () => {
    expect(component.profileName).toBe('LANG User');
    expect(component.myLangNumber).toBe('+92-925-600-000');
    expect(component.verifiedIdentity).toBeTrue();
  });

  it('should calculate local mode when both languages are the same', () => {
    component.myLanguage = 'ur';
    component.theirLanguage = 'ur';

    expect(component.currentMode).toBe('local');
  });

  it('should calculate translation mode when languages are different', () => {
    component.myLanguage = 'ur';
    component.theirLanguage = 'en';

    expect(component.currentMode).toBe('translation');
  });

  it('should filter contacts by name', () => {
    component.searchTerm = 'Ahmed';

    expect(component.filteredContacts.length).toBeGreaterThan(0);
    expect(
      component.filteredContacts.some(contact =>
        (contact.name || '').toLowerCase().includes('ahmed')
      )
    ).toBeTrue();
  });

  it('should select a contact and update their language', () => {
    const contact = component.contacts[3];

    component.selectContact(contact);

    expect(component.selectedContact).toBe(contact);
    expect(component.theirLanguage).toBe(contact.language);
  });

  it('should open and close the dialer', () => {
    component.openDialer();

    expect(component.showDialer).toBeTrue();

    component.closeDialer();

    expect(component.showDialer).toBeFalse();
  });

  it('should add digits to the dialer', () => {
    component.dialKey('1');
    component.dialKey('2');
    component.dialKey('3');

    expect(component.dialedNumber).toBe('123');
  });

  it('should remove the last dialer digit', () => {
    component.dialedNumber = '123';

    component.backspaceDialer();

    expect(component.dialedNumber).toBe('12');
  });

  it('should clear the dialer', () => {
    component.dialedNumber = '12345';

    component.clearDialer();

    expect(component.dialedNumber).toBe('');
  });

  it('should detect Pakistani numbers as Urdu', () => {
    expect(
      component.detectLanguageFromNumber('+92-925-600-125')
    ).toBe('ur');
  });

  it('should detect UK numbers as English', () => {
    expect(
      component.detectLanguageFromNumber('+44-925-600-129')
    ).toBe('en');
  });

  it('should detect Saudi numbers as Arabic', () => {
    expect(
      component.detectLanguageFromNumber('+966-925-600-128')
    ).toBe('ar');
  });

  it('should detect Chinese numbers as Chinese', () => {
    expect(
      component.detectLanguageFromNumber('+86-925-600-130')
    ).toBe('zh');
  });

  it('should detect Japanese numbers as Japanese', () => {
    expect(
      component.detectLanguageFromNumber('+81-925-600-131')
    ).toBe('ja');
  });

  it('should open the credits screen', () => {
    component.openCredits();

    expect(component.activeScreen).toBe('credits');
  });

  it('should return from credits to home', () => {
    component.openCredits();
    component.closeCredits();

    expect(component.activeScreen).toBe('home');
  });

  it('should calculate total credits', () => {
    component.localCredits = 100;
    component.translationCredits = 50;
    component.messageCredits = 10;

    expect(component.totalCredits).toBe(160);
  });

  it('should initially keep translation messaging disabled', () => {
    expect(component.sendMessageEnabled).toBeFalse();
  });

  it('should enable translation demo package', () => {
    component.enableTranslationDemo();

    expect(component.hasTranslationPackage).toBeTrue();
    expect(component.translationCredits).toBe(100);
    expect(component.messageCredits).toBe(10);
    expect(component.packageName).toBe(
      'Translation Demo Package'
    );
  });

  it('should start an audio call with a selected contact', async () => {
    component.selectedContact = component.contacts[0];

    component.startAudioCall();

    expect(component.callMode).toBe('audio');
    expect(component.callState).toBe('calling');

    component.disconnectCall();
  });

  it('should start a video call with a selected contact', () => {
    component.selectedContact = component.contacts[0];

    component.startVideoCall();

    expect(component.callMode).toBe('video');
    expect(component.callState).toBe('calling');

    component.disconnectCall();
  });

  it('should disconnect an active call', () => {
    component.selectedContact = component.contacts[0];

    component.startAudioCall();
    component.disconnectCall();

    expect(component.callState).toBe('idle');
    expect(component.callMode).toBeNull();
    expect(component.callDuration).toBe(0);
  });

  it('should format call duration', () => {
    component.callDuration = 65;

    expect(component.formattedCallDuration).toBe('01:05');
  });

  it('should reject an incoming call', () => {
    const contact = component.contacts[0];

    component.receiveIncomingCall(contact, 'audio');

    expect(component.incomingCallVisible).toBeTrue();
    expect(component.callState).toBe('ringing');

    component.rejectIncomingCall();

    expect(component.incomingCallVisible).toBeFalse();
    expect(component.incomingCaller).toBeNull();
    expect(component.incomingCallMode).toBeNull();
    expect(component.callState).toBe('idle');
  });
});