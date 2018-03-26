import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase';

@Injectable()
export class DataProvider {
  // Data Provider
  // This is the provider class for most of the Firebase observables in the app.

  constructor(public angularfireDatabase: AngularFireDatabase) {
    console.log("Initializing Data Provider");
  }

  // Get all users
  getUsers() {
    return this.angularfireDatabase.list('/accounts', {
      query: {
        orderByChild: 'name'
      }
    });
  }

  // Get user with username
  getUserWithUsername(username) {
    return this.angularfireDatabase.list('/accounts', {
      query: {
        orderByChild: 'username',
        equalTo: username
      }
    });
  }

  // Get logged in user data
  getCurrentUser() {
    return this.angularfireDatabase.object('/accounts/' + firebase.auth().currentUser.uid);
  }

  // Get user by their userId
  getUser(userId) {
    return this.angularfireDatabase.object('/accounts/' + userId);
  }

  // Get requests given the userId.
  getRequests(userId) {
    return this.angularfireDatabase.object('/requests/' + userId);
  }

  // Get friend requests given the userId.
  getFriendRequests(userId) {
    return this.angularfireDatabase.list('/requests', {
      query: {
        orderByChild: 'receiver',
        equalTo: userId
      }
    });
  }

  // Get conversation given the conversationId.
  getConversation(conversationId) {
    return this.angularfireDatabase.object('/conversations/' + conversationId);
  }

  //Get list of all conversation branch
  getAllConversation(){
    return this.angularfireDatabase.object('/conversations/');
  }

  // Get conversations of the current logged in user.
  getConversations() {
    return this.angularfireDatabase.list('/accounts/' + firebase.auth().currentUser.uid + '/conversations');
  }

  // Get messages of the conversation given the Id.
  getConversationMessages(conversationId) {
    return this.angularfireDatabase.object('/conversations/' + conversationId + '/messages');
  }

  // Get messages of the group given the Id.
  getGroupMessages(groupId) {
    return this.angularfireDatabase.object('/groups/' + groupId + '/messages');
  }

  // Get groups of the logged in user.
  getGroups() {
    return this.angularfireDatabase.list('/accounts/' + firebase.auth().currentUser.uid + '/groups');
  }

  // Get group info given the groupId.
  getGroup(groupId) {
    return this.angularfireDatabase.object('/groups/' + groupId);
  }

  //Get user timeline
  getUserTimeline(){
    return this.angularfireDatabase.object('/accounts/' + firebase.auth().currentUser.uid + '/timeLine');
  }

  //Get user timeline baseon id
  getUserTimeLineByID(ID){
    return this.angularfireDatabase.object('/accounts/' + ID + '/timeLine');
  }

  //get logged in user ID
  getMyID(){
    return firebase.auth().currentUser.uid;
  }

}
