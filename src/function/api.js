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

export const getUserState = async () => {
    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                console.log(user)
                resolve(user.email)
            } else {
                reject()
                console.log('logout')
            }
        })
    })
}

export const addMovie = async (data) => {
    const userEmail = await getUserState()
    console.log(data)
    if (userEmail) {
        try {
            await addDoc(collection(db, `users/${userEmail}`, 'post'), {
                ...data,
                createAt: new Date().getTime(),
            })
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
            console.log(auth, email, password)
            // Signed in
            const user = userCredential.user
            console.log(user)
            // 登入成功 跳轉至其他頁面
        })
        .catch((error) => {
            // 錯誤訊息
        })
}

export const getMovieListApi = async (slug) => {
    const userEmail = await getUserState()

    const querySnapshot = await getDocs(collection(db, `users/${userEmail}/post`))
    return querySnapshot.docs
}

export const saveImageStorage = async (data) => {
    const userEmail = await getUserState()
    return await uploadBytesResumable(
        storageRef(storage, `images/${userEmail}/${data.name}`),
        data,
    ).then(async (snapshot) => {
        return await getDownloadURL(snapshot.ref) //取得圖片url
    })
}
