import { Component } from '@angular/core';
import { ConferenceList } from './conference-list/conference-list';
import { Footer } from './footer/footer';
import { FriendsList } from './friends-list/friends-list';
import { Header } from './header/header';
import { NavBar } from './nav-bar/nav-bar';
import { NotificationList } from './notification-list/notification-list';
import { ProfileUser } from './profile-user/profile-user';

@Component({
  selector: 'app-root',
  imports: [Header, NavBar, ProfileUser, FriendsList, NotificationList, ConferenceList, Footer],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
