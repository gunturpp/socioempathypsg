"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
exports.psgChatNotification = functions.database
    .ref("/conversations/{conversationId}/messages/{messageId}")
    .onWrite((change, context) => {
    const db = admin.database();
    const messageData = change.after.val();
    const psgId = messageData.sender; //sender id
    // Notification content
    const payload = {
        notification: {
            title: `${psgId} chat you!`,
            body: `${messageData.message}`,
            icon: `${messageData.avatar}`,
            sound: `default`
        }
    };
    const options = {
        priority: "high"
    };
    // // ref to the device collection for the user
    const tokens = [];
    // send a notification to each device token
    db.ref("/devices_token").orderByChild('userId').equalTo('VWKITrwfdLdEprMigOa8OnvGfwO2')
        .on('child_added', function (snap) {
        console.log(`snapshot4`, snap.key);
        tokens.push(snap.key);
    });
    console.log(`tokens2`, tokens);
    return admin.messaging().sendToDevice(tokens, payload, options)
        .then(function (response) {
        // See the MessagingDevicesResponse reference documentation for
        // the contents of response.
        console.log('Successfully sent message:', response);
    })
        .catch(function (error) {
        console.log('Error sending message:', error);
    });
});
//# sourceMappingURL=index.js.map