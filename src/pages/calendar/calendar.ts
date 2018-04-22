import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ModalController } from 'ionic-angular';
import * as moment from 'moment';
import { EventModalPage } from '../event-modal/event-modal';
import { DataProvider } from "../../providers/data";
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-calendar',
  templateUrl: 'calendar.html',
})
export class CalendarPage {
  
  //make a calendar
  eventSource=[];
  viewTitle: string;
  selectedDay = new Date();
  schedules = [];
  sesuatu: any;
  eventz = { startTime: new Date(), endTime: new Date(), allDay: false };


  isToday:boolean;
  calendar = {
        mode: 'month',
        currentDate: new Date()
  };
  
  constructor(public navCtrl: NavController, public navParams: NavParams, private modalCtrl: ModalController, private alertCtrl: AlertController,
    public dataProvider: DataProvider,
) {
  }

  //add event in Calendar function
  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', {selectedDay: this.selectedDay });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
        
        console.log('data dari didimis',data.startTime);
        eventData.startTime = new Date(data.startTime);
        console.log('data setelah didmis ',data.startDay);
        eventData.endTime = new Date(data.endTime);
 
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
          console.log('EVa: ', this.eventSource);
        });
      }
    });
  }

  // create random events.
  loadEvents() {
      this.eventSource = this.createRandomEvents();
      console.log(this.eventSource);
  }
  onViewTitleChanged(title) {
      this.viewTitle = title;
  }
  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');
       

    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }
  changeMode(mode) {
      this.calendar.mode = mode;
  }
  today() {
      this.calendar.currentDate = new Date();
  }
  onTimeSelected(ev) {
      console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
          (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
      this.selectedDay = ev.selectedTime;
      console.log('ini waktu sekarang: ' + this.selectedDay);
  }
  // onCurrentDateChanged(event:Date) {
  //     var today = new Date();
  //     today.setHours(0, 0, 0, 0);
  //     event.setHours(0, 0, 0, 0);
  //     this.isToday = today.getTime() === event.getTime();
  // }
  createRandomEvents() {
      var events = [];
      for (var i = 0; i < 50; i += 1) {
          var date = new Date();
          var eventType = Math.floor(Math.random() * 2);
          var startDay = Math.floor(Math.random() * 90) - 45;
          var endDay = Math.floor(Math.random() * 2) + startDay;
          var startTime;
          var endTime;
          if (eventType === 0) {
              startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
              if (endDay === startDay) {
                  endDay += 1;
              }
              endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
              events.push({
                  title: 'All Day - ' + i,
                  startTime: startTime,
                  endTime: endTime,
                  allDay: true
              });
          } else {
              var startMinute = Math.floor(Math.random() * 24 * 60);
              var endMinute = Math.floor(Math.random() * 180) + startMinute;
              startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
              endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
              events.push({
                  title: 'Event - ' + i,
                  startTime: startTime,
                  endTime: endTime,
                  allDay: false
              });
          }
      }
      return events;
  }
  onRangeChanged(ev) {
      console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
  }
  markDisabled = (date:Date) => {
      var current = new Date();
      current.setHours(0, 0, 0);
      return date < current;
  };


  ionViewDidLoad() {
    this.createRandomEvents();
    console.log('ionViewDidLoad CalendarPage');
    this.dataProvider.getScheduleByUser().subscribe(schedules=>{
        var x = schedules;
        for (var i=0; i < schedules.length; i++){
            this.schedules[i] = schedules[i];

                let eventData = this.eventz;
                
                    this.eventSource.push({
                        title: 'test',
                        startTime: new Date(this.schedules[i].key),
                        endTime: new Date(this.schedules[i].key),
                        allDay: false
                    });
                    let events = this.eventSource;
                    console.log('EVAAAAAAAAAAAA: ', events);
                   // this.eventSource=[];
                    // setTimeout(() => {
                    //       // this.eventSource = events;
                    //        console.log('EV: ', this.eventSource);
                    //      });    
                    
                    // setTimeout(() => {
                    //     this.eventSource = events;
                    //     console.log('EV: ', this.eventSource);
                    // });    
                
              
        }
        let eventData = this.eventz;
        
       // console.log('data dari didimis',data.startTime);
        eventData.startTime = new Date();
      //  console.log('data setelah didmis ',data.startDay);
        eventData.endTime = new Date();
 
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
          console.log('EVa: ', this.eventSource);
        });
    });
    
}

}
