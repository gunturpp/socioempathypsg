import { Component } from "@angular/core";
import { NavController, NavParams, AlertController } from "ionic-angular";
import { DataProvider } from "../../providers/data";
import { AngularFireDatabase } from "angularfire2/database";
import { DetailUserPage } from "../detail-user/detail-user";
import { AlertProvider } from "../../providers/alert";

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
        this.session = "08.00 - 10.00";
        break;
      case "session2":
        this.session = "10.00 - 12.00";
        break;
      case "session3":
        this.session = "12.00 - 14.00";
        break;
      case "session4":
        this.session = "14.00 - 16.00";
        break;
      case "session5":
        this.session = "16.00 - 18.00";
        break;
      default:
        return 0;
    }

  }

  accept() {
    this.dataProvider.accBooking(this.createdAt).then(() => {
      //  this.loadingProvider.hide();
      //make a conversation to users
      this.send();
      this.booking.confirmation = "accepted";
      this.navCtrl.pop();
      console.log("sukses update booking");
      //this.viewCtrl.dismiss(this.event); 
    });
  }

  declinez() {
    this.dataProvider.rejectBooking(this.createdAt).then(() => {
      this.booking.confirmation = "rejected";
      this.navCtrl.pop();
      console.log("sukses reject booking");
    });
  }

  send() {
    var messages = [];
    messages.push({
      date: new Date().toString(),
      sender: localStorage.getItem("uid_psg"),
      receiver: this.userId,
      type: "text",
      message: "Selamat Request anda telah diterima oleh PSG"
    });
    // Add conversation.
    this.angularfireDatabase.list("conversations").push({
        dateCreated: new Date().toString(),
        messages: messages,
        scheduleId: this.schedule,
        sessionke: this.session
      })
      .then(success => {
        console.log("sukses buat conversation", success);
        let conversationId = success.key;
        this.message = "";
        // Add conversation reference to the users.
        this.angularfireDatabase.object("/psg/" + localStorage.getItem("uid_psg") + "/conversations/" + this.userId + "/" + conversationId)
          .update({
            conversationId: conversationId,
            messagesRead: 1
          });
        this.angularfireDatabase
          .object("/users/" + this.userId + "/conversations/" + localStorage.getItem("uid_psg") + "/" + conversationId)
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

  detail() {
    this.navCtrl.push(DetailUserPage, { uid: this.userId });
  }
  //end of send()
}
