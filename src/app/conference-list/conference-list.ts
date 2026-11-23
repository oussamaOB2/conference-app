import { DatePipe, NgClass, UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Conference } from './conference';

@Component({
  selector: 'app-conference-list',
  imports: [DatePipe, FormsModule, NgClass, UpperCasePipe],
  templateUrl: './conference-list.html',
  styleUrl: './conference-list.css',
})
export class ConferenceList {
  conferences: Conference[] = [
    {
      id: 1,
      title: 'Angular 21',
      description: 'Composants standalone, signaux et nouveaux contrôles de flux.',
      date: '2027-02-18T09:00:00',
      place: 'Tunis',
      maxParticipants: 120,
      nbParticipants: 45,
    },
    {
      id: 2,
      title: 'Architecture microservices',
      description: 'Conception d’API distribuées, résilience et communication entre services.',
      date: '2027-03-12T14:00:00',
      place: 'Ariana',
      maxParticipants: 80,
      nbParticipants: 74,
    },
    {
      id: 3,
      title: 'DevOps et Cloud',
      description: 'Intégration continue, conteneurs et déploiement d’applications cloud natives.',
      date: '2027-04-09T10:00:00',
      place: 'Sousse',
      maxParticipants: 60,
      nbParticipants: 60,
    },
  ];

  searchTerm = '';

  get filteredConferences(): Conference[] {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const search = this.searchTerm.trim().toLocaleLowerCase('fr-FR');

    return this.conferences.filter(
      (conference) =>
        new Date(conference.date) >= startOfToday &&
        conference.title.toLocaleLowerCase('fr-FR').includes(search),
    );
  }

  remainingPlaces(conference: Conference): number {
    return Math.max(0, conference.maxParticipants - conference.nbParticipants);
  }

  registrationClass(conference: Conference): 'available' | 'limited' | 'full' {
    const remaining = this.remainingPlaces(conference);
    if (remaining === 0) {
      return 'full';
    }
    return remaining < 10 ? 'limited' : 'available';
  }

  register(conference: Conference): void {
    if (this.remainingPlaces(conference) > 0) {
      conference.nbParticipants++;
    }
  }
}
