import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { DataProvider } from "../../providers/data";
import { AngularFireDatabase } from "angularfire2/database";
import { DetailUserPage } from "../detail-user/detail-user";
import { AlertProvider } from "../../providers/alert";
import { TabsPage } from "../tabs/tabs";
import * as firebase from 'firebase';

@Component({
  selector: "page-consultation-request",
  templateUrl: "consultation-request.html"
})
export class ConsultationRequestPage {
  alert: Promise<any>;
  message: string;
  client:any;
  booking:any;
  createdAt: any;
  session: any;
  confirmation:any;
  schedule:any;
  userId: any;
  problem: any;
  displayName:any;
  img:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider: DataProvider,
    public angularfireDatabase: AngularFireDatabase,
    public alertCtrl: AlertController
  ) {}

  ionViewDidLoad() {
    console.log("ionViewDidLoad ConsultationRequestPage");
    this.booking = this.navParams.get("booking");
    this.client = this.navParams.get("client");
    // console.log("booking", this.booking);
    // console.log("client", this.client);

    this.createdAt = this.booking.createdAt;
    this.userId = this.booking.userId;
    this.problem = this.booking.problem;
    this.confirmation = this.booking.confirmation;
    this.schedule = this.booking.scheduleId;
    this.displayName = this.client.displayName;
    this.img = this.client.img;

    switch (this.booking.sessionke) {
      case "session1":
        this.session = "08:00:00";
        break;
      case "session2":
        this.session = "09:00:00";
        break;
      case "session3":
        this.session = "10:00:00";
        break;
      case "session4":
        this.session = "11:00:00";
        break;
      case "session5":
        this.session = "12:00:00";
        break;
      case "session6":
        this.session = "13:00:00";
        break;
      case "session7":
        this.session = "14:00:00";
        break;
      case "session8":
        this.session = "15:00:00";
        break;
      case "session9":
        this.session = "16:00:00";
        break;
      case "session10":
        this.session = "17:00:00";
        break;
        case "session11":
        this.session = "18:00:00";
        break;
      case "session12":
        this.session = "19:00:00";
        break;
      case "session13":
        this.session = "21:00:00";
        break;
      case "session14":
        this.session = "22:00:00";
        break;
      default:
      return 0;
    }
  }
  ionViewWillEnter() {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
        Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'none';
        });
    }
  }

  accept() {
    this.dataProvider.accBooking(this.createdAt).then(() => {
      //  this.loadingProvider.hide();
      this.send();
      this.booking.confirmation = "accepted";
      console.log("sukses update booking");
    });
  }
  send() {
    var messages = [];
    messages.push({
      date: new Date().toString(),
      sender: firebase.auth().currentUser.uid,
      receiver: this.userId,
      type: "text",
      message: "Selamat Request anda telah diterima oleh psikolog"
    });
    // Add conversation.
    this.angularfireDatabase.list("conversations").push({
        dateCreated: new Date().toString(),
        messages: messages,
        scheduleId: this.schedule,
        sessionke: this.session
      })
      .then(success => {
        this.navCtrl.parent.parent.setRoot(TabsPage);
        console.log("sukses buat conversation", success);
        let conversationId = success.key;
        this.message = "";
        // Add conversation reference to the users.
        this.angularfireDatabase.object("/psg/" + firebase.auth().currentUser.uid + "/conversations/" + this.userId + "/" + conversationId)
          .update({
            conversationId: conversationId,
            messagesRead: 1
          });
        this.angularfireDatabase
          .object("/users/" + this.userId + "/conversations/" + firebase.auth().currentUser.uid + "/" + conversationId)
          .update({
            conversationId: conversationId,
            messagesRead: 0
          });
      });
  }

  decline() {
    this.alert = this.alertCtrl
      .create({
        title: "Confirm Reject",
        message: "Are you sure you want to reject this request?",
        buttons: [
          {
            text: "Cancel"
          },
          {
            text: "Confirm",
            handler: data => {
              this.declinez();
            }
          }
        ]
      })
      .present();
  }
  declinez() {
    this.dataProvider.rejectBooking(this.createdAt).then(success => {
      var newTicket:number;
      newTicket = this.client.ticketTotal + 1;
      this.angularfireDatabase.object("/users/" + this.client.userId).update({
        ticketTotal:newTicket
      })
      this.booking.confirmation = "rejected";
      this.navCtrl.parent.parent.setRoot(TabsPage);
      console.log("sukses reject booking");
    });
  }

  detail() {
    this.navCtrl.push(DetailUserPage, { uid: this.userId });
  }
}
