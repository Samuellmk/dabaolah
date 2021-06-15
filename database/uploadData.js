// to upload data to firestore, might not work if you just run it in this project folder, i had to run it in a separate project using "node projectName"

const admin = require('./node_modules/firebase-admin');
const serviceAccount = require("./serviceAccountKey.json");
const storeData = require("./storeData.json");
const locationData = require("./locationData.json");
const cuisineData = require("./cuisineData.json");
const storeCollectionKey = "stores"; //name of the collection
const locationCollectionKey = "locations"; //name of the collection
const cuisineCollectionKey = "cuisines"; //name of the collection

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});
const firestore = admin.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);

if (storeData && (typeof storeData === "object")) {
    Object.keys(storeData).forEach(docKey => {
        firestore.collection(storeCollectionKey).doc(docKey).set(storeData[docKey]).then((res) => {
            console.log("Document " + docKey + " successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    });
}

if (locationData && (typeof locationData === "object")) {
    Object.keys(locationData).forEach(docKey => {
        firestore.collection(locationCollectionKey).doc(docKey).set(locationData[docKey]).then((res) => {
            console.log("Document " + docKey + " successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    });
}

if (cuisineData && (typeof cuisineData === "object")) {
    Object.keys(cuisineData).forEach(docKey => {
        firestore.collection(cuisineCollectionKey).doc(docKey).set(cuisineData[docKey]).then((res) => {
            console.log("Document " + docKey + " successfully written!");
        }).catch((error) => {
            console.error("Error writing document: ", error);
        });
    });
}