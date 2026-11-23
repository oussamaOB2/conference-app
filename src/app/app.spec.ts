import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('renders the independent homepage sections', async () => {
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    const sectionSelectors = [
      'app-header',
      'app-nav-bar',
      'app-profile-user',
      'app-friends-list',
      'app-notification-list',
      'app-conference-list',
      'app-footer',
    ];

    for (const selector of sectionSelectors) {
      expect(compiled.querySelector(selector)).not.toBeNull();
    }
  });
});
