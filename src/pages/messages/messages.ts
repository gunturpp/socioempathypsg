import { FirebaseProvider } from "./../../providers/firebase";
import { Component } from "@angular/core";
import {
  AlertController,
  NavController,
  NavParams,
  App,
  ActionSheetController
} from "ionic-angular";
import { AngularFireDatabase } from "angularfire2/database";
import { LoadingProvider } from "../../providers/loading";
import { DataProvider } from "../../providers/data";
import { NewMessagePage } from "../new-message/new-message";
import { MessagePage } from "../message/message";
import * as firebase from "firebase";
//import { Message2Page } from "../message2/message2";
import { concat } from "rxjs/observable/concat";
import { NotifPage } from "../notif/notif";
import { LovestorePage } from "../lovestore/lovestore";
import * as moment from "moment";

@Component({
  selector: "page-messages",
  templateUrl: "messages.html"
})
export class MessagesPage {
  bookingDay: any;
  bookSession: any;
  inputSeconds = [];
  iterate = 0;
  timeInSeconds: any;
  time: any;
  runTimer: boolean;
  hasStarted: boolean;
  hasFinished: boolean;
  remainingTime = [];
  displayTime = [];
  countOrders: any;
  i(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  conversation: any;
  public conversations = [];
  private conversationsById: any;
  private updateDateTime: any;
  private searchFriend: any;
  // MessagesPage
  // This is the page where the user can see their current conversations with their friends.
  // The user can also start a new conversation.
  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public angularfireDatabase: AngularFireDatabase,
    public loadingProvider: LoadingProvider,
    public app: App,
    public dataProvider: DataProvider,
    public firebaseProvider: FirebaseProvider,
    public alertCtrl: AlertController
  ) { }

  countdown() {
    let bookDay, bookMonth, bookYear, bookSec, bookMin, bookHour;
    bookDay = this.bookingDay.substring(9, 11);
    bookMonth = this.bookingDay.substring(6, 8);
    bookYear = this.bookingDay.substring(1, 5);
    this.bookSession;
    console.log('booksess', this.bookSession);
    switch (this.bookSession) {
      case "session1":
        bookHour = 8;
        break;
      case "session2":
        bookHour = 10;
        break;
      case "session3":
        bookHour = 12;
        break;
      case "session4":
        bookHour = 14;
        break;
      case "session5":
        bookHour = 16;
        break;
      default:
        return 0;
    }
    console.log("sesi", bookHour);
    // bookYear = moment(this.bookingDay).year();
    // bookMonth = moment(this.bookingDay).month() + 1;
    // bookDay = moment(this.bookingDay).days();
    // bookHour = moment(this.bookingDay).hours() * 3600;
    // bookMin = moment(this.bookingDay).minutes() * 60;
    // bookSec = moment(this.bookingDay).seconds();
    // current date
    let sec, min, hour, day, days, today, month, year, spareDay, now, later;
    today = moment(new Date())
      .local()
      .format();
    year = moment(today).year();
    month = moment(today).month() + 1;
    days = moment(today).days();
    hour = moment(today).hours() * 3600 - bookHour * 3600;
    min = moment(today).minutes() * 60;
    sec = moment(today).seconds();

    // booking date
    later = moment([bookYear, bookMonth, bookDay]);
    now = moment([year, month, days]);
    spareDay = later.diff(now, "days");
    console.log("booking day later", bookDay, bookMonth, bookYear);
    console.log("booking day now", days, month, year);
    console.log("spare day", spareDay);

    // waktunya countdownnya masih sama tiap list

    day = spareDay * 86400;
    console.log("times", day, hour, min, sec);
    this.inputSeconds[this.iterate] = day + hour + min + sec;
    console.log("inputseconds", this.inputSeconds);
    localStorage.setItem("inputSec", JSON.stringify(this.inputSeconds));
    this.iterate++;
  }
  /* Initialize and setup the time for question */
  // ngOnInit() {
  //   this.initTimer();
  //   this.startTimer();
  // }

  initTimer() {
    // Pomodoro is usually for 25 minutes
    if (!this.timeInSeconds) {
      // this.timeInSeconds = this.inputSeconds;
      this.timeInSeconds = JSON.parse(localStorage.getItem("inputSec"));
      console.log("init timer", this.timeInSeconds);
    }
    for (var i = 0; i < this.timeInSeconds.length; i++) {
      console.log("increment", i);
      this.time = this.timeInSeconds[i];
      this.runTimer = false;
      this.hasStarted = false;
      this.hasFinished = false;
      this.remainingTime[i] = this.timeInSeconds[i];
      console.log("remain", this.remainingTime[i]);
      this.displayTime[i] = this.getSecondsAsDigitalClock(
        this.remainingTime[i]
      );
      console.log("display", this.displayTime[i]);
    }
  }
  // timer countdown
  startTimer() {
    this.runTimer = true;
    this.hasStarted = true;
    this.timerTick();
  }

  pauseTimer() {
    this.runTimer = false;
  }

  resumeTimer() {
    this.startTimer();
  }

  timerTick() {
    setTimeout(() => {
      var length = JSON.parse(localStorage.getItem("inputSec")).length;
      for (var i = 0; i < length; i++) {
        if (!this.runTimer) {
          return;
        }
        this.remainingTime[i]--;
        this.displayTime[i] = this.getSecondsAsDigitalClock(
          this.remainingTime[i]
        );
      }
      // masi statis di array 0 doang
      if (this.remainingTime[0] > 0) {
        this.timerTick();
      } else {
        this.hasFinished = true;
      }
    }, 1000);
  }

  getSecondsAsDigitalClock(inputSeconds: number) {
    if (inputSeconds != null) {
      var sec_num = parseInt(inputSeconds.toString(), 10); // don't forget the second param
      //console.log("sec sum", sec_num); //just uncoment to show countdown in console
    }
    var days = Math.floor(sec_num / 3600 / 24);
    var hours = Math.floor(sec_num / 3600) - days * 24;
    var temphours = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - temphours * 3600) / 60);
    var seconds = sec_num - temphours * 3600 - minutes * 60;
    var hoursString = "";
    var minutesString = "";
    var secondsString = "";
    var daysString = "";
    hoursString = hours < 10 ? "0" + hours : hours.toString();
    minutesString = minutes < 10 ? "0" + minutes : minutes.toString();
    secondsString = seconds < 10 ? "0" + seconds : seconds.toString();
    daysString = days.toString();
    return (
      daysString +
      "day " +
      hoursString +
      ":" +
      minutesString +
      ":" +
      secondsString
    );
  }
  // close timer countdown


   ionViewDidEnter() {
  //ionViewDidLoad() {
    this.countOrder();
    this.conversations = [];
    //untuk psg baru
    //this.createUserData();
    //console.log('uid gue ' , firebase.auth().currentUser.uid);
    if (localStorage.getItem('uid') == null) {
      localStorage.setItem('uid', firebase.auth().currentUser.uid);
      console.log('');
    }
    console.log('uid dari local', localStorage.getItem('uid'));
    // Create userData on the database if it doesn't exist yet.
    //this.createUserData();
    this.searchFriend = "";
    //this.loadingProvider.show();

    // Get info of conversations of current logged in user.
    this.dataProvider.getConversations().subscribe(conversations => {
      console.log('list cet', conversations);
      if (conversations.length > 0) {
        // this.initTimer();
        // this.startTimer();
        conversations.forEach(conversation => {
          console.log('con ', conversation.key);

          // if (conversation.$exists()) {
          // Get conversation partner info.
          this.dataProvider.getUserss(conversation.key).subscribe(user => {
            conversation.friend = user;
            console.log('temen', conversation.friend);
            console.log('con 2', conversation.key);
            console.log('idcon ', conversation.conversationId);
            // Get conversation info.
            this.dataProvider.getConversationbyCurrentUser(conversation.key).subscribe(user3 => {
              console.log('user3 ', user3);
              user3.forEach(user2 => {
                if (user2.conversationId != null) {
                  this.dataProvider
                    .getConversation(user2.conversationId)
                    .subscribe(obj => {
                      console.log('obj ', obj);
                      console.log('conId', user2.conversationId);
                      // Get last message of conversation.
                      console.log("scheduleeyid", obj.scheduleId);
                      this.bookingDay = JSON.stringify(obj.scheduleId);
                      this.bookSession = obj.sessionke;
                      this.countdown();

                      let lastMessage = obj.messages[obj.messages.length - 1];
                      user2.date = lastMessage.date;
                      user2.sender = lastMessage.sender;
                      user2.idConv = user2.conversationId;
                      user2.key = conversation.key;
                      user2.friend = conversation.friend;
                      console.log('conv id', user2);
                      // Set unreadMessagesCount
                      user2.unreadMessagesCount =
                        obj.messages.length - user2.messagesRead;
                      console.log('unread', conversation.unreadMessagesCount);
                      console.log('messages.length', obj.messages.length);
                      console.log('conversation.messageRead', user2.messagesRead);
                      // Process last message depending on messageType.
                      if (lastMessage.type == "text") {
                        if (lastMessage.sender == localStorage.getItem('uid')) {
                          user2.message = "You: " + lastMessage.message;
                        } else {
                          user2.message = lastMessage.message;
                        }
                      } else {
                        if (lastMessage.sender == localStorage.getItem('uid')) {
                          conversation.message = "You sent a photo message.";
                        } else {
                          conversation.message = "has sent you a photo message.";
                        }
                      }
                      // Add or update conversation.

                      this.addOrUpdateConversation(user2);
                      console.log('print this.conversations', this.conversations);

                    });
                }

              }); //end of for each
            }); // end of user3

          });
          //  }
        });
        this.loadingProvider.hide();
      } else {
        this.conversations = [];
        this.loadingProvider.hide();
      }
    });

    // Update conversations' last active date time elapsed every minute based on Moment.js.
    var that = this;
    if (!that.updateDateTime) {
      that.updateDateTime = setInterval(function () {
        if (that.conversations) {
          that.conversations.forEach(conversation => {
            let date = conversation.date;
            conversation.date = new Date(date);
            //console.log(conversation.date);
          });
        }
      }, 60000);
    }
  }

  //ngOnInit() {
  //  this.initTimer();
  //  this.startTimer();
  //}

  // delete personal message
  deleteConversation(conversation) {
    // realtime load data
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    this.angularfireDatabase.list('/psg/' + localStorage.getItem('uid') + '/conversations/').remove(conversation);
  }

  // Add or update conversation for real-time sync based on our observer, sort by active date.
  addOrUpdateConversation(conversation) {
    if (!this.conversations) {
      this.conversations = [conversation];
    } else {
      var index = -1;
      for (var i = 0; i < this.conversations.length; i++) {
        if (this.conversations[i].conversationId == conversation.conversationId) {
          index = i;
        }
      }
      if (index > -1) {
        this.conversations[index] = conversation;
      } else {
        this.conversations.push(conversation);
      }
      // Sort by last active date.
      this.conversations.sort((a: any, b: any) => {
        let date1 = new Date(a.date);
        let date2 = new Date(b.date);
        if (date1 > date2) {
          return -1;
        } else if (date1 < date2) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }

  ionViewDidLeave() {
    this.conversations = [];
  }
  // Create userData on the database if it doesn't exist yet.
  createUserData() {
    firebase
      .database()
      .ref("psg/" + localStorage.getItem('uid'))
      .once("value")
      .then(account => {
        //console.log(account.val());
        // No database data yet, create user data on database
        if (!account.val()) {
          this.loadingProvider.show();
          let user = firebase.auth().currentUser;
          console.log(user);
          var userId, name, provider, img, email;
          let providerData = user.providerData[0];

          userId = user.uid;

          // Get name from Firebase user.
          if (user.displayName || providerData.displayName) {
            name = user.displayName;
            name = providerData.displayName;
          } else {
            name = "SocioEmpathy PSG";
          }

          // Set default username based on name and userId.
          let username = name.replace(/ /g, "") + userId.substring(0, 8);

          // Get provider from Firebase user.
          if (providerData.providerId == "password") {
            provider = "Firebase";
          } else if (providerData.providerId == "facebook.com") {
            provider = "Facebook";
          } else if (providerData.providerId == "google.com") {
            provider = "Google";
          }

          // Get photoURL from Firebase user.
          if (user.photoURL || providerData.photoURL) {
            img = user.photoURL;
            img = providerData.photoURL;
          } else {
            img = "assets/images/profile.png";
          }

          // Get email from Firebase user.
          email = user.email;

          // Set default description.
          let description = "Hello! I am a new SocioEmpathy PSG.";
          // set default displayName to Firebase

          // Insert data on our database using AngularFire.
          this.angularfireDatabase
            .object("/psg/" + userId)
            .set({
              userId: userId,
              displayName: "Ganti Nama",
              name: name,
              username: username,
              role: localStorage.getItem('registerRole'),
              anonymouse: "false",
              realName: name,
              moodLevel: "Normal",
              provider: provider,
              img: img,
              docStatus: "false",
              KTM: "",
              PsyCard: "",
              KTP: "",
              gender: localStorage.getItem('gender'),
              email: email,
              phone: localStorage.getItem('phone'),
              description: description,
              dateCreated: new Date().toString()
            })
            .then(() => {
              this.loadingProvider.hide();
            });
        }
      });
  }

  // New conversation.
  newMessage() {
    this.app.getRootNav().push(NewMessagePage);
  }

  // Open chat with friend.
  message(userId, idConv) {
    console.log(userId);
    this.app.getRootNav().push(MessagePage, { userId: userId, idConv: idConv });
  }

  // Return class based if conversation has unreadMessages or not.
  hasUnreadMessages(conversation) {
    if (conversation.unreadMessagesCount > 0) {
      return "bold";
    } else return "";
  }
  // alert
  showConfirm(i) {
    let confirm = this.alertCtrl.create({
      title: 'Hapus Obrolan?',
      message: 'Setelah anda menghapus obrolan,histori akan hilang, anda yakin?',
      buttons: [
        {
          text: 'Tidak',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: 'Iya',
          handler: () => {
            this.deleteConversation(i);
          }
        }
      ]
    });
    confirm.present();
  }
  //hold button
  pressEvent(e) {
    this.openMenu(e);
  }
  // action sheet
  // press button
  openMenu(deleteChat) {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Opsi",
      buttons: [
        {
          text: "Delete",
          role: "Delete",
          handler: () => {
            this.showConfirm(deleteChat);
          }
        },
        // ,{
        //   text: 'Block',
        //   handler: () => {
        //     console.log('Archive clicked');
        //   }
        // }
        {
          text: "Cancel",
          role: "cancel",
          handler: () => {
            console.log("Cancel clicked");
          }
        }
      ]
    });
    actionSheet.present();
  }

  notif() {
    this.navCtrl.push(NotifPage);
  }

  store() {
    this.navCtrl.push(LovestorePage);
  }

  //untuk count order
  countOrder() {
    this.countOrders = 0;
    this.dataProvider.getListBooking().subscribe(data => {
      data.forEach(book => {
        this.dataProvider.getDetailBooking(book.key).subscribe(data2 => {

          if (data2.confirmation == "waiting") {
            this.countOrders += 1;
          }

        });
      });
    });

  }

  //this is the last
}
