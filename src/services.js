import firebase from "firebase"
import "firebase/firestore"

const login = async (email, password) => {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        return {
            isSuccess: true
        }
    } catch (error) {
        return {
            isSuccess: false,
            error: error.message
        }
    }
}

const signup = async (newUserObj) => {
    const { email, password, firstName, lastName } = newUserObj;
    try {
        const res = await firebase.auth().createUserWithEmailAndPassword(email, password);
        const db = firebase.firestore();
        await db.collection("users").doc(res.user.uid).set({
            firstName: firstName,
            lastName: lastName,
            initials: firstName[0] + lastName[0],
        })
        return {
            isSuccess: true,
        }
    } catch (error) {
        return {
            isSuccess: false,
            error: error.message,
        }
    }
}

const logout = async () => {
    await firebase.auth().signOut();
    console.log("log out finished")
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
    return {
        id: doc.id,
        ...doc.data(),
    };
}

const trackUser = (trackUserFunc) => {
    firebase.auth().onAuthStateChanged(async user => {
        if (user) {
            const userStore = await render("users", user.uid);
            const userObj = {
                uid: user.uid,
                ...userStore
            }
            trackUserFunc(userObj);
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

const create = async (collectionName, data) => {
    const db = firebase.firestore();
    await db.collection(collectionName).add(data);
}

export default {
    login,
    signup,
    logout,
    trackUser,
    syncWithFirebase,
    renderAll,
    render,
    create
}