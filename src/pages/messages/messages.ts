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
import { Message2Page } from "../message2/message2";
import { concat } from "rxjs/observable/concat";
import { NotifPage } from "../notif/notif";

@Component({
  selector: "page-messages",
  templateUrl: "messages.html"
})
export class MessagesPage {
  i(arg0: any): any {
    throw new Error("Method not implemented.");
  }
  conversation: any;
  private conversations: any;
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
    // post new data
    this.createUserData();

    // Create userData on the database if it doesn't exist yet.
    //this.createUserData();
    this.searchFriend = "";
    this.loadingProvider.show();

    // Get info of conversations of current logged in user.
    this.dataProvider.getConversations().subscribe(conversations => {
      if (conversations.length > 0) {
        conversations.forEach(conversation => {
          if (conversation.$exists()) {
            // Get conversation partner info.
            this.dataProvider.getUser(conversation.$key).subscribe(user => {
              conversation.friend = user;
              // Get conversation info.
              this.dataProvider
                .getConversation(conversation.conversationId)
                .subscribe(obj => {
                  // Get last message of conversation.
                  let lastMessage = obj.messages[obj.messages.length - 1];
                  conversation.date = lastMessage.date;
                  conversation.sender = lastMessage.sender;
                  // Set unreadMessagesCount
                  conversation.unreadMessagesCount =
                    obj.messages.length - conversation.messagesRead;
                  // Process last message depending on messageType.
                  if (lastMessage.type == "text") {
                    if (lastMessage.sender == firebase.auth().currentUser.uid) {
                      conversation.message = "You: " + lastMessage.message;
                    } else {
                      conversation.message = lastMessage.message;
                    }
                  } else {
                    if (lastMessage.sender == firebase.auth().currentUser.uid) {
                      conversation.message = "You sent a photo message.";
                    } else {
                      conversation.message = "has sent you a photo message.";
                    }
                  }
                  // Add or update conversation.
                  this.addOrUpdateConversation(conversation);
                });
            });
          }
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
  
  // delete personal message
  deleteConversation(conversation) {
    // realtime load data
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    this.angularfireDatabase.list('/psg/' + firebase.auth().currentUser.uid + '/conversations/').remove(conversation);
  }

  // Add or update conversation for real-time sync based on our observer, sort by active date.
  addOrUpdateConversation(conversation) {
    if (!this.conversations) {
      this.conversations = [conversation];
    } else {
      var index = -1;
      for (var i = 0; i < this.conversations.length; i++) {
        if (this.conversations[i].$key == conversation.$key) {
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

  // Create userData on the database if it doesn't exist yet.
  createUserData() {
    firebase
      .database()
      .ref("psg/" + firebase.auth().currentUser.uid)
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
            name = "SocioEmpathy User";
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
          let description = "Hello! I am a new SocioEmpathy user.";
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
  message(userId) {
    console.log(userId);
    this.app.getRootNav().push(MessagePage, { userId: userId });
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

  notif(){
    this.navCtrl.push(NotifPage);
  }

  //this is the last
}
