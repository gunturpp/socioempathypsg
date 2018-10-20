import * as functions from "firebase-functions";

import * as admin from "firebase-admin";
admin.initializeApp();

exports.newSubscriberNotification = functions.database
  .ref("/devices_token/{token}")
  .onWrite(async event => {
    const data = event.after.data();

    const tokenId = data.token;
    const sender = data.userId;

    // Notification content
    const payload = {
      notification: {
        title: "New Message",
        body: `${sender} chat you!`,
        icon: "https://goo.gl/Fz9nrQ"
      }
    };

    // ref to the device collection for the user
    const db = admin.database();
    const devicesRef = db.ref("/devices_token/" + tokenId).orderByKey();

    const tokens = [];

    // get the user's tokens and send notifications
    const devices = await devicesRef

      devices.once("value")
      // kalo firestore pake yang ini
      // const devices = await devicesRef.get();

      // send a notification to each device token
      .then(snapshot => {
        snapshot.forEach(result => {            
          const token = result.key;

          tokens.push(token);
          return true;
        });
      });

    return admin.messaging().sendToDevice(tokens, payload);
  });