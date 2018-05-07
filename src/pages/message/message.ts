import { FirebaseProvider } from './../../providers/firebase';
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, AlertController, ModalController } from 'ionic-angular';
import { DataProvider } from '../../providers/data';
import { LoadingProvider } from '../../providers/loading';
import { ImageProvider } from '../../providers/image';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';
import { UserInfoPage } from '../user-info/user-info';
import { ImageModalPage } from '../image-modal/image-modal';
import { Camera } from '@ionic-native/camera';
import { Keyboard } from '@ionic-native/keyboard';

@Component({
  selector: 'page-message',
  templateUrl: 'message.html'
})
export class MessagePage {
  idConv: any;
  @ViewChild(Content) content: Content;
  private userId: any;
  private title: any;
  private message: any;
  private conversationId: any;
  private messages: any;
  private alert: any;
  private updateDateTime: any;
  private messagesToShow: any;
  private startIndex: any = -1;
  private scrollDirection: any = 'bottom';
  // Set number of messages to show.
  private numberOfMessages = 10;

  // MessagePage
  // This is the page where the user can chat with a friend.
  constructor(public navCtrl: NavController, public navParams: NavParams, public dataProvider: DataProvider, public angularfireDatabase: AngularFireDatabase,
    public loadingProvider: LoadingProvider, public firebaseProvider: FirebaseProvider, public imageProvider: ImageProvider ,public alertCtrl: AlertController, public modalCtrl: ModalController, public camera: Camera, public keyboard: Keyboard) { }

  ionViewDidLoad() {
    this.userId = this.navParams.get('userId');
    this.idConv = this.navParams.get('idConv');
    console.log('userId', this.userId);
    // Get friend details.
    this.dataProvider.getUserss(this.userId).subscribe((user) => {
      this.title = user.name;
    });

    // Get conversationInfo with friend.
    //this.dataProvider.getConversationbyCurrentUserId(this.userId,this.keyChat).subscribe((conversation) => {
    //  if (conversation.$exists()) {
        // User already have conversation with this friend, get conversation
        this.conversationId = this.idConv;

        // Get conversation
        this.dataProvider.getConversationMessages(this.conversationId).subscribe((messages) => {
          
          if (this.messages) {
            //console.log("messages.length :"+messages.length);
            //console.log("this.messages.length :"+this.messages.length);
            // Just append newly added messages to the bottom of the view.
            if (messages.length > this.messages.length) {
              let message = messages[messages.length - 1];

              if(localStorage.getItem('uid') == message.sender){
                this.dataProvider.getUser(message.sender).subscribe((user) => {
                  message.avatar = user.img;
                });
              } else {
                this.dataProvider.getUserss(message.sender).subscribe((user) => {
                  message.avatar = user.img;
                });
              }

              this.messages.push(message);
              // Also append to messagesToShow.
              this.messagesToShow.push(message);
              // Reset scrollDirection to bottom.
              this.scrollDirection = 'bottom';
            }
          } else {
            // Get all messages, this will be used as reference object for messagesToShow.
            this.messages = [];
            messages.forEach((message) => {
              if(localStorage.getItem('uid') == message.sender){
                this.dataProvider.getUser(message.sender).subscribe((user) => {
                  message.avatar = user.img;
                });
              } else {
                this.dataProvider.getUserss(message.sender).subscribe((user) => {
                  message.avatar = user.img;
                });
              }
              this.messages.push(message);
            });
            // Load messages in relation to numOfMessages.
            if (this.startIndex == -1) {
              // Get initial index for numberOfMessages to show.
              if ((this.messages.length - this.numberOfMessages) > 0) {
                this.startIndex = this.messages.length - this.numberOfMessages;
              } else {
                this.startIndex = 0;
              }
            }
            if (!this.messagesToShow) {
              this.messagesToShow = [];
            }
            // Set messagesToShow
            for (var i = this.startIndex; i < this.messages.length; i++) {
              this.messagesToShow.push(this.messages[i]);
            }
            this.loadingProvider.hide();
          }
          console.log('this.message', this.messages.length);
          console.log('this.conversationId ', this.conversationId);
          //this.setMessagesRead(this.messages.length);
        });
  //    }
  //  });

    // Update messages' date time elapsed every minute based on Moment.js.
    var that = this;
    if (!that.updateDateTime) {
      that.updateDateTime = setInterval(function() {
        if (that.messages) {
          that.messages.forEach((message) => {
            let date = message.date;
            message.date = new Date(date);
          });
        }
      }, 60000);
    }
  }
  //end of ionViewDidLoad

  ionViewDidEnter(){
   // this.setMessagesRead(this.messages);  
   
  }

  // Load previous messages in relation to numberOfMessages.
  loadPreviousMessages() {
    var that = this;
    // Show loading.
    this.loadingProvider.show();
    setTimeout(function() {
      // Set startIndex to load more messages.
      console.log("that.startIndex : "+that.startIndex);
      console.log("that.numberOfMessages : "+that.numberOfMessages);
      if ((that.startIndex - that.numberOfMessages) > -1) {
        that.startIndex -= that.numberOfMessages;
      } else {
        that.startIndex = 0;
      }
      // Refresh our messages list.
      that.messages = null;
      that.messagesToShow = null;
      // Set scroll direction to top.
      that.scrollDirection = 'top';
      // Populate list again.
      that.ionViewDidLoad();
    }, 1000);
  }

  // Update messagesRead when user lefts this page.
  ionViewWillLeave() {
    if (this.messages)
      this.setMessagesRead(this.messages.length);
  }

  // Check if currentPage is active, then update user's messagesRead.
  setMessagesRead(message) {
    //if (this.navCtrl.getActive().instance instanceof MessagePage) {
      // Update user's messagesRead on database.
      var totalMessagesCount;
     // this.dataProvider.getListConversationMessages(this.conversationId).subscribe((messages) => {
        totalMessagesCount = message;
     // });
      this.angularfireDatabase.object('/psg/' + localStorage.getItem('uid') + '/conversations/' + this.userId).update({
        messagesRead: totalMessagesCount
      });
   // }
  }

  // Check if 'return' button is pressed and send the message.
  onType(keyCode) {
    if (keyCode == 13) {
      this.keyboard.close();
      this.send();
    }
  }

  // Scroll to bottom of page after a short delay.
  scrollBottom() {
    var that = this;
    setTimeout(function() {
      that.content.scrollToBottom();
    }, 300);
  }

  // Scroll to top of the page after a short delay.
  scrollTop() {
    var that = this;
    setTimeout(function() {
      that.content.scrollToTop();
    }, 300);
  }

  // Scroll depending on the direction.
  doScroll() {
    if (this.scrollDirection == 'bottom') {
      this.scrollBottom();
    } else if (this.scrollDirection == 'top') {
      this.scrollTop();
    }
  }

  // Check if the user is the sender of the message.
  isSender(message) {
    if (message.sender == localStorage.getItem('uid')) {
      return true;
    } else {
      return false;
    }
  }

  // Back
  back() {
    this.navCtrl.pop();
  }

  // Send message, if there's no conversation yet, create a new conversation.
  send() {
    if (this.message) {
      // User entered a text on messagebox
      if (this.conversationId) {
        // Add Message to the existing conversation
        // Clone an instance of messages object so it will not directly be updated.
        // The messages object should be updated by our observer declared on ionViewDidLoad.
        let messages = JSON.parse(JSON.stringify(this.messages));
        messages.push({
          date: new Date().toString(),
          sender: localStorage.getItem('uid'),
          type: 'text',
          message: this.message
        });
        // Update conversation on database.
        console.log(messages);
        this.angularfireDatabase.object('/conversations/' + this.conversationId).update({
          messages: messages
        });
        // Clear messagebox.
        this.message = '';
      } else {
        // New Conversation with friend.
        var messages = [];
        messages.push({
          date: new Date().toString(),
          sender: localStorage.getItem('uid'),
          type: 'text',
          message: this.message
        });
        var users = [];
        users.push(localStorage.getItem('uid'));
        users.push(this.userId);
        // Add conversation.
        this.angularfireDatabase.list('conversations').push({
          dateCreated: new Date().toString(),
          messages: messages,
          users: users
        }).then((success) => {
          let conversationId = success.key;
          this.message = '';
          // Add conversation reference to the users.
          this.angularfireDatabase.object('/psg/' + localStorage.getItem('uid') + '/conversations/' + this.userId).update({
            conversationId: conversationId,
            messagesRead: 1
          });
          this.angularfireDatabase.object('/users/' + this.userId + '/conversations/' + firebase.auth().currentUser.uid).update({
            conversationId: conversationId,
            messagesRead: 0
          });
        });
      }
    }
  }

  // View user info
  viewUser(userId) {
    this.navCtrl.push(UserInfoPage, { userId: userId });
  }

  // Send photoMessage.
  sendPhoto() {
    this.alert = this.alertCtrl.create({
      title: 'Send Photo Message',
      message: 'Do you want to take a photo or choose from your photo gallery?',
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Choose from Gallery',
          handler: () => {
            // Upload image then return the url.
            this.imageProvider.uploadPhotoMessage(this.conversationId, this.camera.PictureSourceType.PHOTOLIBRARY).then((url) => {
              // Process image message.
              this.sendPhotoMessage(url);
            });
          }
        },
        {
          text: 'Take Photo',
          handler: () => {
            // Upload image then return the url.
            this.imageProvider.uploadPhotoMessage(this.conversationId, this.camera.PictureSourceType.CAMERA).then((url) => {
              // Process image message.
              this.sendPhotoMessage(url);
            });
          }
        }
      ]
    }).present();
  }

  // Process photoMessage on database.
  sendPhotoMessage(url) {
    if (this.conversationId) {
      // Add image message to existing conversation.
      let messages = JSON.parse(JSON.stringify(this.messages));
      messages.push({
        date: new Date().toString(),
        sender: localStorage.getItem('uid'),
        type: 'image',
        url: url
      });
      // Update conversation on database.
      this.angularfireDatabase.object('/conversations/' + this.conversationId).update({
        messages: messages
      });
    } else {
      // Create new conversation.
      var messages = [];
      messages.push({
        date: new Date().toString(),
        sender: localStorage.getItem('uid'),
        type: 'image',
        url: url
      });
      var users = [];
      users.push(firebase.auth().currentUser.uid);
      users.push(this.userId);
      // Add conversation.
      this.angularfireDatabase.list('conversations').push({
        dateCreated: new Date().toString(),
        messages: messages,
        users: users
      }).then((success) => {
        let conversationId = success.key;
        // Add conversation references to users.
        this.angularfireDatabase.object('/psg/' + localStorage.getItem('uid') + '/conversations/' + this.userId).update({
          conversationId: conversationId,
          messagesRead: 1
        });
        this.angularfireDatabase.object('/users/' + this.userId + '/conversations/' + localStorage.getItem('uid')).update({
          conversationId: conversationId,
          messagesRead: 0
        });
      });
    }
  }

  // Enlarge image messages.
  enlargeImage(img) {
    let imageModal = this.modalCtrl.create(ImageModalPage, { img: img });
    imageModal.present();
  }
}
