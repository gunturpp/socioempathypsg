  import { Component, ChangeDetectorRef } from '@angular/core';
  import { IonicPage, Platform, NavController, NavParams } from 'ionic-angular';
  import { SpeechRecognition } from '@ionic-native/speech-recognition';
  /**
   * Generated class for the AchievDetailPage page.
   *
   * See http://ionicframework.com/docs/components/#navigation for more info
   * on Ionic pages and navigation.
   */

  @IonicPage()
  @Component({
    selector: 'page-achiev-detail',
    templateUrl: 'achiev-detail.html',
  })
  export class AchievDetailPage {
    // options(arg0: any): any {
    //   throw new Error("Method not implemented.");
    // }
    private ID: any;
    private info: string;
    private task: string;
    
    // speech recog variable
    matches: string[];
    isRecording = false;

    constructor(public navCtrl: NavController, public navParams: NavParams, private speechRecognition: SpeechRecognition, private platform: Platform, private changeDetectorRef: ChangeDetectorRef) {
      this.ID = navParams.get("ID");
     
      switch(this.ID) { 
        case "1": {
            this.task = "Task 1";
          this.info = 
          `
          Pertama, 
          `;
          break; 
        } 
        case "2": { 
            this.task = "Task 2";
          this.info =
          `Istirahat 
          `;
          break; 
        } 
        case "3": {
            this.task = "Task 3";
          this.info =
          `Lihatlah
          `; 
          break;    
        } 
        case "4": { 
            this.task = "Task 4";
          this.info =
          `Jika
          `;
          break; 
        }  
        default: { 
          this.info =
          `Teruslah
          `;
          break;              
        } 
    }
    }


    // Voice Recognition
    getPermissions(){
      this.speechRecognition.hasPermission()
      .then((hasPermission: boolean) => {
        if(!hasPermission){
          this.speechRecognition.requestPermission();
        }
      });
    }

    startListening(){
      let options = {
        language: 'id-ID'
      }
      this.speechRecognition.startListening().subscribe(matches =>{
        this.matches = matches;
        this.changeDetectorRef.detectChanges();
      });
      this.isRecording = true;  
    }

    stopListening(){
      this.speechRecognition.stopListening().then(() =>{
        this.isRecording = false;
      });
    }
    isIos(){
      return this.platform.is('ios');
    }
    
    //     ionViewDidLoad() {
    //   console.log('ionViewDidLoad AchievDetailPage');
    // }
  }
