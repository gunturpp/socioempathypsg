"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
exports.newBooking = functions.database
    .ref("/booking/{bookingId}")
    .onWrite((change, context) => {
    const db = admin.database();
    const booking = change.after.val();
    const clientId = booking.userId; //client id
    const psgId = booking.psgId; //psychology id
    const tokens = [];
    let clientName;
    // Notification content
    db.ref("/users")
        .orderByChild("userId")
        .equalTo(clientId)
        .on("child_added", function (snap) {
        clientName = snap.val().name;
        // console.log(`clientName5`, clientName);
    });
    const payload = {
        notification: {
            title: `New client`,
            body: `${clientName} want to consultation`,
            sound: `default`
        }
    };
    const options = {
        priority: "high"
    };
    // // ref to the device collection for the user
    // send a notification to each device token
    db.ref("/devices_token")
        .orderByChild("userId")
        .equalTo(psgId)
        .on("child_added", function (snapshot) {
        // console.log(`psgId5`, psgId);
        tokens.push(snapshot.key);
    });
    // console.log(`tokens5`, tokens);
    return admin
        .messaging()
        .sendToDevice(tokens, payload, options)
        .then(function (response) {
        // See the MessagingDevicesResponse reference documentation for
        // the contents of response.
        console.log("Successfully sent message:", response);
    })
        .catch(function (error) {
        console.log("Error sending message:", error);
    });
});
//# sourceMappingURL=newBooking.js.map