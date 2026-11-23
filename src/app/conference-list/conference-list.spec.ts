import { TestBed } from '@angular/core/testing';
import { appConfig } from '../app.config';
import { ConferenceList } from './conference-list';
import { Conference } from './conference';

function conference(overrides: Partial<Conference> = {}): Conference {
  return {
    id: 1,
    title: 'Angular',
    description: 'Découverte du framework',
    date: '2027-05-20T12:00:00',
    place: 'Tunis',
    maxParticipants: 100,
    nbParticipants: 20,
    ...overrides,
  };
}

function localDateAtNoon(date: Date): string {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 12).toISOString();
}

describe('ConferenceList', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConferenceList],
      providers: appConfig.providers,
    }).compileComponents();
  });

  it('excludes past conferences and includes the current day', () => {
    const component = TestBed.createComponent(ConferenceList).componentInstance;
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(now.getDate() - 1);
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);
    component.conferences = [
      conference({ id: 1, title: 'Passée', date: localDateAtNoon(yesterday) }),
      conference({ id: 2, title: 'Aujourd’hui', date: localDateAtNoon(now) }),
      conference({ id: 3, title: 'Future', date: localDateAtNoon(tomorrow) }),
    ];

    expect(component.filteredConferences.map((item) => item.id)).toEqual([2, 3]);
  });

  it('searches partial titles without case or surrounding-space sensitivity', () => {
    const component = TestBed.createComponent(ConferenceList).componentInstance;
    component.conferences = [
      conference({ id: 1, title: 'Angular avancé' }),
      conference({ id: 2, title: 'Spring Boot' }),
    ];
    component.searchTerm = '  gUlAr aV  ';

    expect(component.filteredConferences.map((item) => item.title)).toEqual(['Angular avancé']);
  });

  it('uses green at ten places, orange below ten and red when full', () => {
    const component = TestBed.createComponent(ConferenceList).componentInstance;

    expect(component.registrationClass(conference({ maxParticipants: 100, nbParticipants: 90 }))).toBe('available');
    expect(component.registrationClass(conference({ maxParticipants: 100, nbParticipants: 91 }))).toBe('limited');
    expect(component.registrationClass(conference({ maxParticipants: 100, nbParticipants: 100 }))).toBe('full');
  });

  it('increments participants once per registration without exceeding capacity', () => {
    const component = TestBed.createComponent(ConferenceList).componentInstance;
    const available = conference({ maxParticipants: 30, nbParticipants: 10 });
    const full = conference({ maxParticipants: 20, nbParticipants: 20 });

    component.register(available);
    component.register(full);

    expect(available.nbParticipants).toBe(11);
    expect(full.nbParticipants).toBe(20);
  });

  it('formats titles and dates in the rendered card', async () => {
    const fixture = TestBed.createComponent(ConferenceList);
    fixture.componentInstance.conferences = [conference({ title: 'angular', date: '2027-05-20T12:00:00' })];
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;

    expect(compiled.querySelector('h3')?.textContent?.trim()).toBe('ANGULAR');
    expect(compiled.textContent).toContain('20 mai 2027');
  });

  it('binds registration clicks and disables the button of a full conference', async () => {
    const fixture = TestBed.createComponent(ConferenceList);
    const available = conference({ id: 1, maxParticipants: 30, nbParticipants: 10 });
    const full = conference({ id: 2, maxParticipants: 20, nbParticipants: 20 });
    fixture.componentInstance.conferences = [available, full];
    fixture.detectChanges();
    await fixture.whenStable();
    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('button');

    buttons[0].click();
    fixture.detectChanges();

    expect(available.nbParticipants).toBe(11);
    expect(buttons[0].classList.contains('available')).toBe(true);
    expect(buttons[1].classList.contains('full')).toBe(true);
    expect(buttons[1].disabled).toBe(true);
  });

  it('shows a specific message when no conference is registered', async () => {
    const fixture = TestBed.createComponent(ConferenceList);
    fixture.componentInstance.conferences = [];
    fixture.detectChanges();
    await fixture.whenStable();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Aucune conférence enregistrée.');
  });

  it('shows another message when the search has no result', async () => {
    const fixture = TestBed.createComponent(ConferenceList);
    fixture.componentInstance.conferences = [conference()];
    fixture.componentInstance.searchTerm = 'inconnue';
    fixture.detectChanges();
    await fixture.whenStable();

    expect((fixture.nativeElement as HTMLElement).textContent).toContain('Aucune conférence ne correspond à votre recherche.');
  });
});
