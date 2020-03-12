const functions = require('firebase-functions');
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase)

exports.helloWorld = functions.https.onRequest((request, response) => {
 response.send("Hello Bill");
});

const createNotification = (notification => {
    return admin.firestore().collection("notifications")
        .add(notification)
        .then(doc =>{
            console.log("notification added", doc);
        })
})

exports.projectCreated = functions.firestore
    .document("projects/{projectId}")
    .onCreate(doc => {

        const project = doc.data();
        const notification = {
            content: "Added a new project",
            user: `${project.authorFirstName} ${project.authorLastName}`,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        }

        return createNotification(notification);
})

exports.userJoined = functions.auth.user()
    .onCreate(async user => {

        const doc = await admin.firestore().collection("users")
            .doc(user.uid).get();
        const newUser = doc.data();
        const notification = {
            content: "Joined the party",
            user: `${newUser.firstName} ${newUser.lastName}`,
            createdAt: admin.firestore.FieldValue.serverTimestamp(),
        };
        return createNotification(notification);
})