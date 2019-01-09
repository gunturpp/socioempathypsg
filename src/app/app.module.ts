import { MoodTrackerPage } from './../pages/mood-tracker/mood-tracker';
import { BoardingPage } from './../pages/boarding/boarding';
import { AchievementPage } from './../pages/achievement/achievement';
import { DuplicateMessagePage } from './../pages/duplicate-message/duplicate-message';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Camera } from '@ionic-native/camera';
import { GooglePlus } from '@ionic-native/google-plus';
import { FCM } from '@ionic-native/fcm';
import { Keyboard } from '@ionic-native/keyboard';
import { TextMaskModule } from 'angular2-text-mask';
import { SignupPage } from '../pages/signup/signup';
import { Firebase } from '@ionic-native/firebase';
import { MyApp } from './app.component';
import { FirstProfilePage } from '../pages/first-profile/first-profile';
import { LoginPage } from '../pages/login/login';
import { HomePage } from '../pages/home/home';
import { VerificationPage } from '../pages/verification/verification';
import { TabsPage } from '../pages/tabs/tabs';
import { MessagesPage } from '../pages/messages/messages';
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
import { NotifPage } from '../pages/notif/notif';
import { LovestorePage } from '../pages/lovestore/lovestore';
import { ConsultationRequestPage } from '../pages/consultation-request/consultation-request';
import { DetailUserPage } from '../pages/detail-user/detail-user';
import { FormWithdrawPage } from '../pages/form-withdraw/form-withdraw';
import { DetailWithdrawPage } from '../pages/detail-withdraw/detail-withdraw';
import { TransactionsPage } from '../pages/transactions/transactions';
import { DetailTransactionPage } from '../pages/detail-transaction/detail-transaction';

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
import { FcmProvider } from '../providers/fcm/fcm';

import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { Login } from '../login';

import { FriendPipe } from '../pipes/friend';
import { SearchPipe } from '../pipes/search';
import { ConversationPipe } from '../pipes/conversation';
import { DateFormatPipe } from '../pipes/date';

firebase.initializeApp(Login.firebaseConfig);

@NgModule({
  declarations: [
    MyApp,
    SignupPage,
    LoginPage,
    HomePage,
    VerificationPage,
    TabsPage,
    MessagesPage,
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
    NotifPage,
    LovestorePage,
    ConsultationRequestPage,
    DetailUserPage,
    FormWithdrawPage,
    DetailWithdrawPage,
    TransactionsPage,
    DetailTransactionPage,    
    FriendPipe,
    SearchPipe, 
    DateFormatPipe,
    ConversationPipe
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
    NotifPage,
    LovestorePage,
    ConsultationRequestPage,
    DetailUserPage,
    FormWithdrawPage,
    DetailWithdrawPage,
    TransactionsPage,
    DetailTransactionPage
  ],
  providers: [
    Firebase,
    FCM,
    FcmProvider,
    StatusBar, SplashScreen, Camera, GooglePlus, Keyboard, { provide: ErrorHandler, useClass: IonicErrorHandler }, LoginProvider, LogoutProvider, LoadingProvider, AlertProvider, ImageProvider, DataProvider, FirebaseProvider]
})
export class AppModule { }
  