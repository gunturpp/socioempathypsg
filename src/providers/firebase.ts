import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { LoadingProvider } from './loading';
import { AlertProvider } from './alert';
import { DataProvider } from './data';
import * as firebase from 'firebase';
import 'rxjs/add/operator/take';

@Injectable()
export class FirebaseProvider {
  // Firebase Provider
  // This is the provider class for most of the Firebase updates in the app.

  constructor(public angularfireDatabase: AngularFireDatabase, public loadingProvider: LoadingProvider, public alertProvider: AlertProvider, public dataProvider: DataProvider) {
    console.log("Initializing Firebase Provider");
  }

  // Accept friend request.

}
