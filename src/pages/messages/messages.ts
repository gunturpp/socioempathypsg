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
import { MessagePage } from "../message/message";
import * as firebase from "firebase";
import { NotifPage } from "../notif/notif";
import * as moment from "moment";

@Component({
  selector: "page-messages",
  templateUrl: "messages.html"
})
export class MessagesPage {
  profileUser=[];
  panjang: any;
  count: number;
  bookingDay=[];
  bookSession=[];
  bookConfirmation=[];
  inputSeconds = [];
  iterate = 0;
  timeInSeconds: any;
  time: any;
  displayTime = [];
  countOrders: any;
  increment=0;

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
  ) {}

  ionViewDidLoad() {
    // Create userData on the database if it doesn't exist yet.
    this.loadingProvider.show();
    this.devicesTokenUpdate();
    this.searchFriend = "";
    // notification new booking
    this.countOrder();
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
        Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'flex';
        });
    } 
    // Get info of conversations of current logged in user.
    this.dataProvider.getConversations().subscribe(conversations => {
      console.log("conversations", conversations);
      if (conversations.length > 0) {
        conversations.forEach(conversation => {
          // Get conversation partner info.
          this.dataProvider.getClient(conversation.key).subscribe(users => {
            this.profileUser.push(users);
            console.log("profileUser", this.profileUser);
            if (conversation.key) {
              // Get conversation info.
              this.dataProvider
              .getConversationbyUser(conversation.key).subscribe(listConv => {
                listConv.forEach(listConversations => {
                  listConversations.key = conversation.key;
                    if (listConversations.conversationId != null) {
                      this.dataProvider
                      .getConversation(listConversations.conversationId).subscribe(obj => {
                          this.bookingDay[this.increment] = obj.scheduleId;
                          this.bookSession[this.increment] = obj.sessionke;
                          if(obj.confirmation) {
                            this.bookConfirmation[this.increment] = obj.confirmation
                          }
                          this.countdown(obj.scheduleId, obj.sessionke,this.increment);
                          this.increment++;

                          let lastMessage = obj.messages[obj.messages.length - 1];
                          listConversations.date = lastMessage.date;
                          listConversations.sender = lastMessage.sender;
                         
                          // Set unreadMessagesCount
                          listConversations.unreadMessagesCount =
                            obj.messages.length - listConversations.messagesRead;
                          // Process last message depending on messageType.
                          if (lastMessage.type == "text") {
                            if (
                              lastMessage.sender == firebase.auth().currentUser.uid
                            ) {
                              listConversations.message =
                                "You: " + lastMessage.message;
                            } else {
                              listConversations.message = lastMessage.message;
                            }
                          } else {
                            if (
                              lastMessage.sender == firebase.auth().currentUser.uid
                            ) {
                              listConversations.message =
                                "You sent a photo message.";
                            } else {
                              listConversations.message =
                                "has sent you a photo message.";
                            }
                          }
                          this.addOrUpdateConversation(listConversations);

                          // Add or update listConversations.
                        });
                    }
                  }); //end of for each
                }); // end of user3
            }
          });
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
      that.updateDateTime = setInterval(function() {
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
  countdown(date,time,index){
    var b = moment(date+' '+time);
    setInterval(() => { 
      var a = moment();
      this.timeInSeconds = Math.round(b.diff(a)/1000);
      this.displayTime[index] = this.getSecondsAsDigitalClock(this.timeInSeconds,index)
      // console.log("this.displayTime[index]", index); //just uncoment to show countdown in console	
   }, 1000);
  }
  getSecondsAsDigitalClock(inputSeconds: number,index) {	
      var sec_num = inputSeconds; // don't forget the second param	
      if (sec_num < 0) {	
        return 'timeover';	
      } else {	
      // console.log("milisecond", sec_num); //just uncoment to show countdown in console	
      var days = Math.floor(sec_num / 86400); // 3600 * 24	
      var hours = Math.floor(sec_num / 3600) - days * 24;	
      var temphours = Math.floor(sec_num / 3600);	
      var minutes = Math.floor((sec_num - temphours * 3600) / 60);	
      // console.log("minutes", minutes);	
      var seconds = Math.floor(sec_num - temphours * 3600 - minutes * 60);	
      var hoursString = "";	
      var minutesString = "";	
      var secondsString = "";	
      var daysString = "";	
      hoursString = hours < 10 ? "0" + hours : hours.toString();	
      minutesString = minutes < 10 ? "0" + minutes : minutes.toString();	
      secondsString = seconds < 10 ? "0" + seconds : seconds.toString();	
      daysString = days.toString();	
      // return daysString + "days ";	
      if (daysString == "0") {	
        return hoursString + ":" + minutesString + ":" + secondsString;	
      } else {	
        return (daysString +" days " +hoursString +":" +minutesString +":" + secondsString);	
      }	
    }	
  }

  devicesTokenUpdate() {
    this.dataProvider
      .updateDevicesToken(localStorage.getItem("devices_token"))
      .update({
        userId: firebase.auth().currentUser.uid
      });
    this.dataProvider.updateCurrentUser().update({
      devices_token: localStorage.getItem("devices_token")
    });
  }

  // delete personal message
  deleteConversation(conversation) {
    // realtime load data
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    this.angularfireDatabase
      .list("/psg/" + firebase.auth().currentUser.uid + "/conversations/")
      .remove(conversation);
  }

  // Add or update conversation for real-time sync based on our observer, sort by active date.
  addOrUpdateConversation(conversation) {
    if (!this.conversations) {
      this.conversations = [conversation];
    } else {
      var index = -1;
      for (var i = 0; i < this.conversations.length; i++) {
        if (
          this.conversations[i].key == conversation.key
          
        ) {
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

  // Open chat with friend.
  message(userId, idConv,i) {
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
        Object.keys(tabs).map((key) => {
            tabs[key].style.display = 'none';
        });
    }

    console.log("userId :", userId);    
    console.log("idConv :", idConv);    
    this.navCtrl.push(MessagePage, {
       userId: userId, 
       idConv: idConv,
       session: this.bookSession[i],
       day:this.bookingDay[i],
       confirmation:this.bookConfirmation[i]
    });
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
      title: "Hapus Obrolan?",
      message:
        "Setelah anda menghapus obrolan,histori akan hilang, anda yakin?",
      buttons: [
        {
          text: "Tidak",
          handler: () => {
            console.log("Disagree clicked");
          }
        },
        {
          text: "Iya",
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
    let tabs = document.querySelectorAll('.show-tabbar');
    if (tabs !== null) {
      Object.keys(tabs).map((key) => {
        tabs[key].style.display = 'none';
      });
    }
    this.navCtrl.push(NotifPage);
  
  }
  //untuk count order
  countOrder() {
    this.countOrders = 0;
    this.dataProvider.getListBooking().subscribe(data => {
      data.forEach(book => {
        this.dataProvider.getValueBooking(book.key).subscribe(val => {
          console.log("data2data2", val.id);
          this.dataProvider.getDetailBooking(val.id).subscribe(data2 => {
            if (data2.confirmation == "waiting") {
              this.countOrders++;
            }
          });
        })
      });
    });
  }
}
