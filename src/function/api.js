import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
} from 'firebase/auth'
import { getFirestore, collection, doc, addDoc, setDoc, getDocs } from 'firebase/firestore'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '@/services/firebase'
import { fetch } from './axios'

import { useGlobalStore } from '@/stores/global'

export const searchMovie = async (opt) => {
    return fetch({ path: `search/multi`, opts: opt })
}

export const searchMovieDetail = async (path, opt) => {
    return fetch({ path, opts: opt })
}

const db = getFirestore()
const auth = getAuth()
let userEmail
// const getUserEmail = async () => {
//     let a
//     onAuthStateChanged(auth, (user) => {
//         console.log(user)
//         if (user) {
//             a = user.email
//             console.log('123')
//             // return user.email
//             // userEmail = user.email
//         } else {
//             console.log('is logout')
//         }
//         console.log(a)
//     })
//     console.log(a)
// }
export const getUserState = async () => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // globalStore.user = user
        } else {
            console.log('logout')
        }
    })
}

export const addMovie = async (data) => {
    try {
        const user = await getUserEmail()
    } catch (error) {}
    if (user) {
        try {
            await addDoc(collection(db, `users/${user}`, 'post'), data)
        } catch (err) {
            console.log(err)
        }
    }
}

export const createAccount = () => {
    createUserWithEmailAndPassword(auth, 'test6@gmail.com', '12345678')
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user
            // 註冊成功 跳轉至其他頁面
            console.log(user.email)
            setDoc(doc(db, 'users', user.email), { uuid: user.uid, email: user.email })
        })
        .catch((error) => {
            // 錯誤訊息
        })
    // console.log(auth)
}

export const loginAccount = (email, password) => {
    console.log('login')
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user
            console.log(user)
            // 登入成功 跳轉至其他頁面
        })
        .catch((error) => {
            // 錯誤訊息
        })
}

export const getMovieList = async () => {
    // await getState()
    console.log(userEmail)
    // console.log(a)
    // const userEmail = await getUserEmail()

    const querySnapshot = await getDocs(collection(db, `users/${userEmail}/post`))
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data())
    })
    if (userEmail) {
        // const querySnapshot = await getDocs(collection(db, `user/test6@gmail.com`))
        // console.log(querySnapshot)
    }
}
// querySnapshot.forEach((doc) => {
//     console.log(doc.id, doc.data())
// })

export const saveImageStorage = async (data) => {
    const userEmail = await getUserEmail()
    return await uploadBytesResumable(
        storageRef(storage, `images/${userEmail}/${data.name}`),
        data,
    ).then(async (snapshot) => {
        return await getDownloadURL(snapshot.ref) //取得圖片url
    })
}
