import { AchievementPage } from "./../achievement/achievement";
import { TimeLinePage } from "./../time-line/time-line";
import { Component } from "@angular/core";
import { NavController, NavParams } from "ionic-angular";
import { HomePage } from "../home/home";
import { MessagesPage } from "../messages/messages";
import { FriendsPage } from "../friends/friends";
import { DataProvider } from "../../providers/data";
import { CalendarPage } from "../calendar/calendar";
import * as firebase from "firebase";

@Component({
  selector: "page-tabs",
  templateUrl: "tabs.html"
})
export class TabsPage {
  messages: any = MessagesPage;
  // friends: any = FriendsPage;
  profile: any = HomePage;
  calendar: any = CalendarPage;
  // timeLine: any = TimeLinePage;
  // achievement: any = AchievementPage;
  public unreadMessagesCount: any;
  // private friendRequestCount: any;
  private conversationList: any;
  public conversationsInfo: any;

  // TabsPage
  // This is the page where we set our tabs.
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public dataProvider: DataProvider
  ) {}

  ionViewDidLoad() {
    console.log("tabs folder");
    this.conversationsInfo = 0;
    this.getUnreadMessagesCount();
    // Get friend requests count.
    // this.dataProvider.getRequests(firebase.auth().currentUser.uid).subscribe((requests) => {
    //   if (requests.friendRequests) {
    //     this.friendRequestCount = requests.friendRequests.length;
    //   } else {
    //     this.friendRequestCount = null;
    //   }
    // });

    // Get conversations and add/update if the conversation exists, otherwise delete from list.
    //this.dataProvider.getListConversations().subscribe((conversationsInfo) => {
    this.dataProvider.getConversations().subscribe(conversationsInfo => {
      console.log("conversationsInfo : ", conversationsInfo);
      this.unreadMessagesCount = null;
      this.conversationsInfo = null;
      this.conversationList = null;
      if (conversationsInfo.length > 0) {
        console.log("infoconvv", conversationsInfo);
        conversationsInfo.forEach(conversationInfo => {
          // this.dataProvider.getConversation(conversationInfo.conversationId).subscribe((conversation) => {
          this.dataProvider
            .getConversationbyCurrentUser(conversationInfo.key)
            .subscribe(user3 => {
              console.log("user3 ", user3);
              user3.forEach(conversation => {
                this.conversationsInfo += conversation.messagesRead;
                console.log("info", this.conversationsInfo);
                this.dataProvider
                  .getConversation(conversation.conversationId)
                  .subscribe(obj => {
                    console.log("objconv", obj);
                    if (obj) {
                      this.addOrUpdateConversation(obj);
                    }
                  });
              });
            });
        });
      }
    });
  }

  // Add or update conversaion for real-time sync of unreadMessagesCount.
  addOrUpdateConversation(conversation) {
    //console.log(conversation);
    //console.log("$key : "+conversation.$key);
    //console.log("conversationList Flag 1 : "+JSON.stringify(this.conversationList));
    if (!this.conversationList) {
      this.conversationList = [conversation];
      //console.log("conversationList Flag 2 : "+JSON.stringify(this.conversationList));
    } else {
      var index = -1;
      for (var i = 0; i < this.conversationList.length; i++) {
        if (this.conversationList[i].idConv == conversation.idConv) {
          index = i;
        }
      }
      if (index > -1) {
        this.conversationList[index] = conversation;
      } else {
        this.conversationList.push(conversation);
      }
    }
    console.log("conversationList ", this.conversationList);
    this.computeUnreadMessagesCount();
    console.log("total ga dibaca ", this.unreadMessagesCount);
  }

  // Compute all conversation's unreadMessages.
  computeUnreadMessagesCount() {
    this.unreadMessagesCount = 0;
    if (this.conversationList) {
      for (var i = 0; i < this.conversationList.length; i++) {
        this.unreadMessagesCount += this.conversationList[i].messages.length;
        console.log("unread tabs ", this.unreadMessagesCount);
      }
      this.unreadMessagesCount -= this.conversationsInfo;
      if (this.unreadMessagesCount == 0) {
        this.unreadMessagesCount = null;
      }
    }
  }

  getUnreadMessagesCount() {
    if (this.unreadMessagesCount) {
      if (this.unreadMessagesCount > 0) {
        return this.unreadMessagesCount;
        console.log("get unread", this.unreadMessagesCount);
      }
    }
    return null;
  }
}
