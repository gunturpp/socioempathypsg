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
import { LovestorePage } from "../lovestore/lovestore";

@Component({
  selector: "page-messages",
  templateUrl: "messages.html"
})
export class MessagesPage {
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
  ) {}

  ionViewDidEnter() {
    this.conversations = [];
    /// post new data
    this.createUserData();
  //console.log('uid gue ' , firebase.auth().currentUser.uid);
    if(localStorage.getItem('uid') == null){
      localStorage.setItem('uid',firebase.auth().currentUser.uid);
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
        conversations.forEach(conversation => {
          console.log('con ',conversation.key);

         // if (conversation.$exists()) {
            // Get conversation partner info.
            this.dataProvider.getUser(conversation.key).subscribe(user => {
              conversation.friend = user;
              console.log('con 2',conversation.key);
              console.log('idcon ', conversation.conversationId);
              // Get conversation info.
              this.dataProvider.getConversationbyCurrentUser(conversation.key).subscribe(user3 => {  
                console.log('user3 ',user3);
                user3.forEach(user2 => {
                  if(user2.conversationId != null) {
                    this.dataProvider
                      .getConversation(user2.conversationId)
                      .subscribe(obj => {
                        console.log('obj ', obj);
                        console.log('conId', user2.conversationId);
                        // Get last message of conversation.
                        let lastMessage = obj.messages[obj.messages.length - 1];
                        user2.date = lastMessage.date;
                        user2.sender = lastMessage.sender;
                        user2.idConv = user2.conversationId;
                        console.log('conv id', user2);  
                        // Set unreadMessagesCount
                        user2.unreadMessagesCount =
                          obj.messages.length - user2.messagesRead;
                        console.log('unread',conversation.unreadMessagesCount);
                        console.log('messages.length', obj.messages.length);
                        console.log('conversation.messageRead',user2.messagesRead);
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
                          // this.conversations.push(user2);
                          // this.conversations.sort((a: any, b: any) => {
                          //   let date1 = new Date(a.date);
                          //   let date2 = new Date(b.date);
                          //   if (date1 > date2) {
                          //     return -1;
                          //   } else if (date1 < date2) {
                          //     return 1;
                          //   } else {
                          //     return 0;
                          //   }
                          // });
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

  ionViewDidLeave(){
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
    this.app.getRootNav().push(MessagePage, { userId: userId, idConv:idConv });
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

  store(){
    this.navCtrl.push(LovestorePage);
  }
  //this is the last
}
