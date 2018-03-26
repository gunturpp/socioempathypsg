import { CommentPage } from './../comment/comment';
import { DocverPage } from './../docver/docver';
import { HomePage } from './../home/home';
import { Component, ChangeDetectorRef, ViewChild, NgZone } from '@angular/core';
import { NavController,  NavParams,  App,  AlertController,  ToastController,  ActionSheetController, ModalController} from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingProvider } from '../../providers/loading';
import { DataProvider } from '../../providers/data';
import { NewMessagePage } from '../new-message/new-message';
import { MessagePage } from '../message/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as firebase from 'firebase';
import { LoginPage } from '../login/login';
import { Message2Page } from '../message2/message2';
import { DuplicateMessagePage } from '../duplicate-message/duplicate-message';

@Component({
  selector: 'page-time-line',
  templateUrl: 'time-line.html',
})

export class TimeLinePage {  // the root nav is a child of the root app component

  private role: string;
  private friends: any;
  private moodLevel: string;
  private storyForm: FormGroup;
  private timeLine = [];
  private timeLineNotNull = false;
  private loggedInID: any;
  private user: any;
  private gender: any;
  private tmpTimeLine: any;
  private tmpTimeLineFriend: any;
  private commentToggle: boolean;
  private alert;
  private comment: any;

  constructor(public actionSheetCtrl : ActionSheetController, public toastCtrl: ToastController, 
    public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, 
    public formBuilder: FormBuilder, public angularfireDatabase: AngularFireDatabase, 
    public loadingProvider: LoadingProvider, public app: App, 
    public dataProvider: DataProvider, public cb: ChangeDetectorRef, 
    public data:DataProvider, public zone: NgZone, public modalCtrl: ModalController) {
    this.storyForm = formBuilder.group({
      story: ['', Validators.required]
    });

    this.commentToggle = false;
  }

  // ionViewWillEnter(){
  //   this.data.getCurrentUser().subscribe((params)=>{
  //     console.log(params.role);
  //     console.log(params.docStatus);
  //     if((params.role == "Psychologist")&&(params.docStatus == "false")){
  //       this.zone.run(() => {
  //         this.app.getRootNav().setRoot(DocverPage);
  //       })
  //     }
  //   });
  // }
    
  openMenu() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [
        {
          text: 'Edit',
          role: 'Edit',
          handler: () => {
            console.log('Destructive clicked');
          }
        }, {
          text: 'Delete',
          handler: () => {
            console.log('Delete clicked');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TimeLinePage');
    this.getRole();
    this.dataProvider.getUserTimeline().subscribe(timeLineData => {
      if (timeLineData.$exists()) {
        for (let singleItem of timeLineData.reverse()) {
          //console.log(singleItem);
          this.timeLine.push(singleItem)
        }
        console.log(this.timeLine);
        this.timeLineNotNull = true;
        this.cb.detectChanges();
        this.loggedInID = this.dataProvider.getMyID();
      } else {
        this.timeLine = [];
        this.timeLineNotNull = false;
        this.cb.detectChanges();
      }
    });
  }

  //mood level get update data
  getRole() {
    this.dataProvider.getCurrentUser().subscribe((params) => {
      if (params != null) {
        this.role = params.role;
        this.moodLevel = params.moodLevel;
        this.gender = params.gender;
        this.cb.detectChanges();
      }
    });
  }

  underConstruction() {
    let alert = this.alertCtrl.create({
      title: 'Ooops..',
      subTitle: 'Sorry, this feature under maintenance.',
      buttons: ['Ok']
    });
    alert.present();
  }

  moodTracker() {
    let alert = this.alertCtrl.create({
      title: 'Ooops..',
      subTitle: 'Sorry, this feature under maintenance',
      buttons: ['Ok']
    });
    alert.present();
  }


  //toast for change mood level
  presentToast() {
    let toast = this.toastCtrl.create({
      message: 'Thankyou for changed your mood.',
      duration: 2000,
      position: "middle",
    });
    toast.present();
  }
  // Refresher
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
  //change mood level based on user decision
  changeMoodLevel(newMoodLevel) {
    this.dataProvider.getCurrentUser().update({
      moodLevel: newMoodLevel
    }).then(params => {
      this.presentToast();
    })
  }
  //alert for change mood level
  showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Congratulation...',
      subTitle: 'Successfully updated!',
      buttons: ['OK']
    });
    alert.present();
  }
  // Update timeline friend.
  updateFriendTimeLine(friend, newStoryMessage, postID) {
    if (firebase.auth().currentUser.uid != null) {
      this.dataProvider.getUser(firebase.auth().currentUser.uid).take(1).subscribe(userData => {
        if (userData != null) {
          if (friend != null) {
            let timeLine: any;
            if (friend.timeLine == null) {
              timeLine = [];
            } else {
              timeLine = friend.timeLine;
            }
    
            timeLine.push({
              timeLineID: postID,
              senderId: firebase.auth().currentUser.uid,
              story: newStoryMessage,
              date: new Date().toString(),
              img: userData.img,
              name: userData.name,
              userName: userData.username,
              role: userData.role,
              gender: this.gender,
              likes: 0,
              comments:""
            });

            console.log("stage 1 ");
            console.log(timeLine);

            //post to user logged in friends timeline
            this.angularfireDatabase.object('/accounts/' + friend.$key).update({
              timeLine: timeLine
            });

/*             //master branch post
            this.angularfireDatabase.object('/accounts/' + firebase.auth().currentUser.uid + '/posts').update({
              ID_Post: this.postID,
              ID_User: firebase.auth().currentUser.uid
            });
 */
          }
        }
      });
    }


  }

  //friends timeLine
  updateTimeLine(newStoryMessage, postID) {
    let toggle = true;
    let haveFriends = false;
    this.dataProvider.getCurrentUser().subscribe((account) => {

      for (var p in account) {
        if (account.hasOwnProperty(p)) {
          if (p == "friends") {
            haveFriends = true
          }
        }
      }

      if (haveFriends) {
        let friendslength = account.friends.length;
        if (account.friends && toggle) {
          toggle = false;
          for (var i = 0; i < friendslength; i++) {
            this.dataProvider.getUser(account.friends[i]).take(1).subscribe((friend) => {
              this.updateFriendTimeLine(friend, newStoryMessage, postID);
            });
          }
        } else {
          this.friends = [];
        }
      }
      this.loadingProvider.hide();
    });
  }

  //my timeLine (logged in)
  updateMyTimeLine(newStoryMessage, postID) {
    if (firebase.auth().currentUser.uid != null) {
      this.dataProvider.getUser(firebase.auth().currentUser.uid).take(1).subscribe(userData => {
        console.log(userData);
        if (userData != null) {
          let timeLine = userData.timeLine;
          if (timeLine == null) {
            timeLine = [];
          }

          timeLine.push({
            timeLineID: postID,
            senderId: firebase.auth().currentUser.uid,
            story: newStoryMessage,
            date: new Date().toString(),
            img: userData.img,
            name: userData.name,
            userName: userData.username,
            role: userData.role,
            gender: this.gender,
            likes: 0,
            comments: ""
          });

          //post to user logged in friends timeline
          this.angularfireDatabase.object('/accounts/' + firebase.auth().currentUser.uid).update({
            timeLine: timeLine
          });

          this.angularfireDatabase.object('/posts/' + this.generateFilename() + firebase.auth().currentUser.uid).set({
            ID_Post: postID,
            ID_User: firebase.auth().currentUser.uid
          });

          this.ToastForUpdate();
        }
      });
    }
  }
  //toast when update
  ToastForUpdate(){
     let toast = this.toastCtrl.create({
      message: 'Thankyou for expressed your feeling.',
      duration: 1000,
      position: "middle",
    });
    toast.present();
  }

  // Generate a random filename of length for the image to be uploaded
  generateFilename() {
    var length = 8;
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < length; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  }

  //post new story from surrent user logged in
  postNewStory() {
    this.loadingProvider.show();
    // realtime load data
    this.navCtrl.setRoot(this.navCtrl.getActive().component);
    let newStoryMessage = this.storyForm.value["story"];
    console.log(newStoryMessage);
    //generate post ID for mytimelinepost and friendstimelinepost
    let postID = firebase.auth().currentUser.uid + this.generateFilename();
    // Get user data on database and get list of friends.
    this.updateTimeLine(newStoryMessage, postID);
    this.updateMyTimeLine(newStoryMessage, postID);
    this.storyForm.get('story').setValue("");
    
  }

  //Send message
  sendMessage(userTargetID) {
    console.log(userTargetID);
    this.app.getRootNav().push(MessagePage, { userId: userTargetID });
    // this.app.getRootNav().push(DuplicateMessagePage, {userId: userTargetID});
  }

  commentFunction(timeLineID) {
    const commentModal = this.modalCtrl.create(CommentPage, { timeLineID: timeLineID });
    commentModal.present();
  }
  
/*   hugFunction() {
    this.alert = this.alertCtrl.create({
      title: 'Change Comment',
      message: "Please enter a new comment.",
      inputs: [
        {
          name: 'comment',
          placeholder: 'Your comment',
          value: this.comment
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => { }
        },
        {
          text: 'Save',
          handler: data => {
            let comment = data["comment"];
            console.log(comment)
      
          }
        }
      ]
    }).present();
  } */

  likes(postID: any){
    let post: any;
    let matchPost: any;
    let friends: any;
    let matchPostBranch: any;
    let postMatch: any;
    let friend: any;
    let tmpTime: any;
    
    console.log("flag 1");
    //get MY timeline data
    this.angularfireDatabase.object('/accounts/' + firebase.auth().currentUser.uid + '/timeLine').take(1).subscribe(params=>{
      this.tmpTimeLine = params

      console.log("tmpTimeLine");
      console.log(this.tmpTimeLine);
      console.log("flag 2");
      console.log(postID);
      //search post that match with postID

      for(let i = this.tmpTimeLine.length-1; i>=0; i--){
        //console.log(tmpTimeLine[i].timeLineID);

        if(this.tmpTimeLine[i].timeLineID == postID){
          this.tmpTimeLine[i].likes = this.tmpTimeLine[i].likes + 1;
        }
      }

      this.angularfireDatabase.object('/accounts/' + firebase.auth().currentUser.uid).update({
        timeLine : this.tmpTimeLine
      });

      //update timeline view
      this.data.getUserTimeline().subscribe(params=>{
        this.timeLine = [];
        this.timeLine = params;
      });

    })
    
    //get friend list
    this.angularfireDatabase.list('/accounts/' + firebase.auth().currentUser.uid + '/friends').take(1).subscribe(params=>{
      friends = params
      console.log(friends);

      for(let j = friends.length-1; j>=0; j--){
        this.angularfireDatabase.object('/accounts/' + friends[j].$value + '/timeLine').take(1).subscribe(params=>{
          this.tmpTimeLineFriend = params
          console.log("tmpTimeLineFriend");
          console.log(this.tmpTimeLineFriend);
          //search post that match with postID
    
          for(let i = this.tmpTimeLineFriend.length-1; i>=0; i--){
            //console.log(tmpTimeLine[i].timeLineID);
            console.log("PostID : " + postID);
            console.log("timeLineID : " + this.tmpTimeLineFriend[i].timeLineID);
            if(this.tmpTimeLineFriend[i].timeLineID == postID){
              console.log("tembus");
              this.tmpTimeLineFriend[i].likes = this.tmpTimeLineFriend[i].likes + 1;
            }
          }
    
          this.angularfireDatabase.object('/accounts/' + friends[j].$value).update({
            timeLine : this.tmpTimeLineFriend
          });
    
        })
      }

    });
    

  }

}
