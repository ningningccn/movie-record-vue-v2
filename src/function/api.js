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

export const searchMovie = async (opt) => {
    return fetch({ path: `search/multi`, opts: opt })
}

export const searchMovieDetail = async (path, opt) => {
    return fetch({ path, opts: opt })
}

const db = getFirestore()
const auth = getAuth()

const getUserEmail = async () => {
    let email
    await onAuthStateChanged(auth, (user) => {
        console.log(user)
        if (user) {
            email = user.email
        } else {
            return ''
        }
    })
    return email
}

export const addMovie = async (data) => {
    const user = await getUserEmail()
    if (user) {
        try {
            return await addDoc(collection(db, `users/${user}`, 'post'), data)
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
    const user = await getUserEmail()
    // console.log(user)

    if (user) {
        // const querySnapshot = await getDocs(collection(db, `user/test6@gmail.com`))
        // console.log(querySnapshot)
    }
    const querySnapshot = await getDocs(collection(db, `users/test6@gmail.com/post`))
    querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data())
    })
}
// querySnapshot.forEach((doc) => {
//     console.log(doc.id, doc.data())
// })

export const saveImageStorage = async (data) => {
    const userEmail = await getUserEmail()
    console.log(data, userEmail)
    uploadBytes(
        storageRef(storage, `images/${userEmail}/${selectedFile.value.name}`),
        selectedFile.value,
    ).then((snapshot) => {
        console.log(snapshot)
        console.log('Uploaded a blob or file!') //上傳成功
    })
}
