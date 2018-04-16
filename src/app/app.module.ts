import { MoodTrackerPage } from './../pages/mood-tracker/mood-tracker';
import { BoardingPage } from './../pages/boarding/boarding';
import { AchievementPage } from './../pages/achievement/achievement';
import { DuplicateMessagePage } from './../pages/duplicate-message/duplicate-message';
import { Message2Page } from './../pages/message2/message2';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { GooglePlus } from '@ionic-native/google-plus';
import { Keyboard } from '@ionic-native/keyboard';
import { TextMaskModule } from 'angular2-text-mask';
import { SignupPage } from '../pages/signup/signup';

import { MyApp } from './app.component';
import { FirstProfilePage } from '../pages/first-profile/first-profile';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { VerificationPage } from '../pages/verification/verification';
import { TabsPage } from '../pages/tabs/tabs';
import { MessagesPage } from '../pages/messages/messages';
import { FriendsPage } from '../pages/friends/friends';
import { SearchPeoplePage } from '../pages/search-people/search-people';
import { RequestsPage } from '../pages/requests/requests';
import { UserInfoPage } from '../pages/user-info/user-info';
import { NewMessagePage } from '../pages/new-message/new-message';
import { MessagePage } from '../pages/message/message';
import { ImageModalPage } from '../pages/image-modal/image-modal';
import { PayDetailPage } from '../pages/pay-detail/pay-detail';
import { PaySuccessPage } from '../pages/pay-success/pay-success';
import { BuyPremiumPage } from '../pages/buy-premium/buy-premium';
import { ProfilePage } from '../pages/profile/profile';
import { CalendarPage } from '../pages/calendar/calendar';
import { EventModalPage } from '../pages/event-modal/event-modal';
import { EventModalPageModule } from '../pages/event-modal/event-modal.module.ts';
import {NotifPage} from '../pages/notif/notif';
//import calendar plugin
import { NgCalendarModule } from 'ionic2-calendar';

// Guntur
import { DynamiclinkPage } from '../pages/dynamiclink/dynamiclink';

import { LoginProvider } from '../providers/login';
import { LogoutProvider } from '../providers/logout';
import { LoadingProvider } from '../providers/loading';
import { AlertProvider } from '../providers/alert';
import { ImageProvider } from '../providers/image';
import { DataProvider } from '../providers/data';
import { FirebaseProvider } from '../providers/firebase';

import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { Login } from '../login';

import { FriendPipe } from '../pipes/friend';
import { SearchPipe } from '../pipes/search';
import { ConversationPipe } from '../pipes/conversation';
import { DateFormatPipe } from '../pipes/date';
import { GroupPipe } from '../pipes/group';

firebase.initializeApp(Login.firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    HomePage,
    VerificationPage,
    TabsPage,
    MessagesPage,
    FriendsPage,
    SearchPeoplePage,
    RequestsPage,
    UserInfoPage,
    NewMessagePage,
    MessagePage,
    ImageModalPage,
    FriendPipe,
    ConversationPipe,
    SearchPipe,
    DateFormatPipe,
    DuplicateMessagePage,
    AchievementPage,
    BoardingPage,
    FirstProfilePage,
    DynamiclinkPage,
    MoodTrackerPage,
    PayDetailPage,
    PaySuccessPage,
    BuyPremiumPage,
    SignupPage,
    ProfilePage,
    CalendarPage,
    NotifPage
   // EventModalPage
  ],
  imports: [
    NgCalendarModule,
    BrowserModule,
    TextMaskModule,

    IonicModule.forRoot(MyApp, {
      scrollAssist: false,
      autoFocusAssist: false
    }),
    AngularFireModule.initializeApp(Login.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    EventModalPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SignupPage,
    LoginPage,
    HomePage,
    VerificationPage,
    TabsPage,
    MessagesPage,
    FriendsPage,
    SearchPeoplePage,
    RequestsPage,
    UserInfoPage,
    NewMessagePage,
    MessagePage,
    ImageModalPage,
    DuplicateMessagePage,
    AchievementPage,
    BoardingPage,
    FirstProfilePage,
    DynamiclinkPage,
    MoodTrackerPage,
    PayDetailPage,
    PaySuccessPage,
    BuyPremiumPage,
    ProfilePage,
    CalendarPage,
    EventModalPage,
    NotifPage
  ],
  providers: [
    StatusBar, SplashScreen, Camera, GooglePlus, Keyboard, { provide: ErrorHandler, useClass: IonicErrorHandler }, LoginProvider, LogoutProvider, LoadingProvider, AlertProvider, ImageProvider, DataProvider, FirebaseProvider]
})
export class AppModule { }
  