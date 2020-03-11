import firebase from "firebase"
import "firebase/firestore"

const login = async (email, password) => {
    await firebase.auth().signInWithEmailAndPassword(email, password);
}

const logout = async () => {
    await firebase.auth().signOut();
    console.log("log out finished")
}

const trackUser = (trackUserFunc) => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            trackUserFunc(user);
        } else {
            trackUserFunc(null);
        }
    })
}

const syncWithFirebase = async (collectionName, synDataFunc) => {
    const db = firebase.firestore();
    db.collection(collectionName).onSnapshot(async snapshot => {
        let docs = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                ...doc.data()
            }
        })
        synDataFunc(docs);
    })
}

const renderAll = async (collectionName) => {
    const db = firebase.firestore();
    const snapshot = await db.collection(collectionName).get();
    const data = snapshot.docs.map(doc => {
        return {
            id: doc.id,
            ...doc.data()
        }
    })
    return data;
}

const render = async (collectionName, id) => {
    const db = firebase.firestore();
    const doc = await db.collection(collectionName).doc(id).get();
    console.log(doc);
}

const create = async (collectionName, data) => {
    const db = firebase.firestore();
    await db.collection(collectionName).add(data);
}

export default {
    login,
    logout,
    trackUser,
    syncWithFirebase,
    renderAll,
    render,
    create
}