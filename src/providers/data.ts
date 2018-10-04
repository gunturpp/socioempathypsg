import { Injectable } from '@angular/core';
import { AngularFireAction, AngularFireDatabase, AngularFireList, AngularFireObject } from 'angularfire2/database';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
@Injectable()
export class DataProvider {
  // Data Provider
  // This is the provider class for most of the Firebase observables in the app.
  public getusers: AngularFireList<any>;
  public listbyquery: Observable<AngularFireAction<firebase.database.DataSnapshot>[]>;
  public Objects: AngularFireObject<any>;
  public items: Observable<any>;

  constructor(public angularfireDatabase: AngularFireDatabase) {
    console.log("Initializing Data Provider");
  }

  //get transaction in waiting
  getTransactionsPsg(){
    this.items = this.angularfireDatabase.list( 'psg/' + localStorage.getItem('uid') + '/transactions',
    ref => ref.orderByChild('status').equalTo('waiting')).valueChanges();
    return this.items;
  }

  getTransactionAll(){
    this.items = this.angularfireDatabase.list('psg/' + localStorage.getItem('uid') + '/transactions').valueChanges();
    return this.items;
  }

  getTransactions(trId){
    this.items = this.angularfireDatabase.object('transactionPSG/' + trId).valueChanges();
    return this.items;
  }

  // Get all psg
  getUsers() {
    return this.angularfireDatabase.list('/psg/', 
      ref => ref.orderByChild('name')).valueChanges();
  }

  // Get user with username
  getUserWithUsername(username) {
      return this.angularfireDatabase.list('/psg/', 
      ref => ref.orderByChild('username').equalTo(username)).valueChanges();
  }
  // Get logged in user data
  getCurrentUser() {
    this.items = this.angularfireDatabase.object('/psg/' + localStorage.getItem('uid')).valueChanges();
    return this.items;
  }

  getCurrentUser2() {
    this.items = this.angularfireDatabase.object('/psg/' + firebase.auth().currentUser.uid).valueChanges();
    return this.items;
  }

  updateCurrentUser() {
    return this.angularfireDatabase.object('/psg/' + firebase.auth().currentUser.uid);
  }

  // Get user by their userId
  getUser(userId) {
    this.items = this.angularfireDatabase.object('/psg/' + userId).valueChanges();
    return this.items;
  }

  //get profile user_client
  getClient(Id){
    this.items = this.angularfireDatabase.object('/users/' + Id).valueChanges();
    return this.items;
  }

  // Set user by their userId
  setUser(userId) {
    return this.angularfireDatabase.object('/psg/' + userId);
  }
  
  UpdateUser(userId) {
    return this.angularfireDatabase.object('/psg/' + userId);
  }
  // Get requests given the userId.
  getRequestsbyCurrentUser() {
    this.items = this.angularfireDatabase.object('/requests/' + firebase.auth().currentUser.uid).valueChanges();
    return this.items;
  }
  // Get requests given the userId.
  getRequests(userId) {
    this.items = this.angularfireDatabase.list('/requests/' + userId).valueChanges();
    return this.items;
  }

  // Get friend requests given the userId.
  getFriendRequests(userId) {
    return this.angularfireDatabase.list('/psg/', 
      ref => ref.orderByChild('receiver').equalTo(userId)).valueChanges();
  }
  relationFriendTimeline(userId) {
    this.items = this.angularfireDatabase.object('/psg/' + userId + '/friends').valueChanges();
    return this.items;
  }
  getCurrentFriendTimeline() {
    this.items = this.angularfireDatabase.list('/psg/' + firebase.auth().currentUser.uid + '/friends').snapshotChanges();
    return this.items;
  }

  // Get conversation given the conversationId.
  getConversation(conversationId) {
    this.items = this.angularfireDatabase.object('/conversations/' + conversationId).valueChanges();
    return this.items;
  }
  // Update conversation given the conversationId.
  updateConversation(conversationId) {
    return this.angularfireDatabase.object('/conversations/' + conversationId);
  }

  //Get list of all conversation branch
  getAllConversation(){
    this.items = this.angularfireDatabase.object('/conversations/').valueChanges();
    return this.items;
  }
  getConversationbyCurrentUser(userId){
    this.items = this.angularfireDatabase.list('/psg/' + localStorage.getItem('uid') + '/conversations/' + userId).valueChanges();
    return this.items;
  }

  // Get conversations of the current logged in user.
  getConversations() {
    this.items = this.angularfireDatabase.list('/psg/' + localStorage.getItem('uid') + '/conversations/').snapshotChanges();
    // this.items = this.angularfireDatabase.list('/psg/' + localStorage.getItem('uid') + '/conversations/').valueChanges();
    return this.items;
  }

  deleteConversations() {
    return this.angularfireDatabase.list('/psg/' + localStorage.getItem('uid') + '/conversations/');
  }

  // Get messages of the conversation given the Id.
  getConversationMessages(conversationId) {
    this.items = this.angularfireDatabase.object('/conversations/' + conversationId + '/messages').valueChanges();
    return this.items;
  }

  //getList Conversation
  getListConversationMessages(conversationId) {
    this.items = this.angularfireDatabase.list('/conversations/' + conversationId + '/messages').valueChanges();
    return this.items;
  }

  // Get messages of the group given the Id.
  getGroupMessages(groupId) {
    this.items = this.angularfireDatabase.object('/groups/' + groupId + '/messages').valueChanges();
    return this.items;
  }

  // Get groups of the logged in user.
  getGroups() {
    this.items = this.angularfireDatabase.list('/psg/' + firebase.auth().currentUser.uid + '/groups').snapshotChanges();
    return this.items;
  }

  // Get group info given the groupId.
  getGroup(groupId) {
    this.items = this.angularfireDatabase.object('/groups/' + groupId).valueChanges();
    return this.items;
  }
 //Get comment timeline
  getCommentTimeline(){
    this.items = this.angularfireDatabase.list('/psg/' + firebase.auth().currentUser.uid + '/timeLine').snapshotChanges();
    return this.items;
  }
 //Get object on comment timeline
 getObjectCommentTimeline(){
  this.items = this.angularfireDatabase.object('/psg/' + firebase.auth().currentUser.uid + '/timeLine').valueChanges();
  return this.items;
}

  //post comment timeline
  postCommentTimeline(){
    this.items = this.angularfireDatabase.list('/posts/').valueChanges();
    return this.items;
  }
  //Get user timeline
  getUserTimeline(){
    this.items = this.angularfireDatabase.object('/psg/' + firebase.auth().currentUser.uid + '/timeLine').valueChanges();
    return this.items;
  }

  //Get user timeline baseon id
  getUserTimeLineByID(ID){
    this.items = this.angularfireDatabase.object('/psg/' + ID + '/timeLine').valueChanges();
    return this.items;
  }
  //Get user timeline baseon id for delete  
  deleteUserTimelineByID() {
    return this.angularfireDatabase.list('/psg/' + firebase.auth().currentUser.uid +  '/timeLine');
  }

  //get logged in user ID
  getMyID(){
    return firebase.auth().currentUser.uid;
  }

  //setSchedule
  setScheduling(psychologstId){
    return this.angularfireDatabase.object('/scheduling/' + psychologstId);
  }

  // Get date.
  getScheduleByUser() {
    this.items = this.angularfireDatabase.list('/psg/' + localStorage.getItem('uid') + '/scheduling/').snapshotChanges();
    return this.items;
  }

  //get list of schedule per session in speific date
  getListSchedule(date){
    this.items = this.angularfireDatabase.list('psg/' + localStorage.getItem('uid') + '/scheduling/'+date ).snapshotChanges();
    return this.items;
  }

  //get all booking that book psg with idBooking
  getListBooking(){
   // this.items = this.angularfireDatabase.object('/psg/' + localStorage.getItem('uid') + '/booking/' ).valueChanges();
   this.items = this.angularfireDatabase.list('/psg/' + localStorage.getItem('uid') + '/booking/' ).snapshotChanges();
   return this.items;
  }

  //get detail booking for list
  getDetailBooking(bookId){
    this.items = this.angularfireDatabase.object('/booking/' + bookId).valueChanges();
    return this.items;
  }

  //update booking to be accepted by psg
   accBooking(idBooking){
    return this.angularfireDatabase.object('/booking/' + idBooking).update({
      confirmation: 'accepted'
    });
  }

  rejectBooking(idBooking){
    return this.angularfireDatabase.object('/booking/' + idBooking).update({
      confirmation: 'rejected'
    });
  }

  //get scheduling
  getScheduling(){
    this.items = this.angularfireDatabase.object('/scheduling/').snapshotChanges();
    return this.items;
  }

}