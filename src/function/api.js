import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth'
import {
    getFirestore,
    collection,
    doc,
    addDoc,
    setDoc,
    getDoc,
    getDocs,
    query,
    where,
} from 'firebase/firestore'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '@/services/firebase'
import { fetch } from './axios'
import router from '@/router'

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
            // console.log('user: ', user)
            if (user) {
                resolve(user.email)
            } else {
                reject(user)
                // console.log('logout')
            }
        })
    })
}

export const loginAccount = (email, password) => {
    console.log('login')
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            console.log(auth, email, password)
            // Signed in
            const user = userCredential.user
            console.log(user)

            router.push({
                path: '/',
            })
            // 登入成功 跳轉至其他頁面
        })
        .catch((error) => {
            console.log(error.code)
            // 錯誤訊息
        })
}

export const logout = () => {
    signOut(auth) // 登出方法，須上方引入
        .then(() => {
            console.log('登出成功，跳回首頁')
            router.push('/login') // 登出成功，跳回首頁
        })
        .catch((error) => {
            console.log('登出失敗', error)
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

export const createAccount = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // Signed up
            const user = userCredential.user
            // 註冊成功 跳轉至其他頁面
            setDoc(doc(db, 'users', user.email), { uuid: user.uid, email: user.email })
        })
        .catch((error) => {
            console.log('error: ', error)
            // 錯誤訊息
        })
    // console.log(auth)
}

export const getMovieListApi = async (slug) => {
    const userEmail = await getUserState()

    if (slug == '') {
        const querySnapshot = await getDocs(collection(db, `users/${userEmail}/post`))
        return querySnapshot.docs
    } else {
        const q = query(collection(db, `users/${userEmail}/post`), where('type', '==', slug))
        const querySnapshot = await getDocs(q)
        return querySnapshot.docs
    }
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

export const getMovieDetail = async (id) => {
    try {
        const userEmail = await getUserState()
        if (userEmail) {
            const resDoc = await getDoc(doc(db, `users/${userEmail}/post`, `${id}`))
            if (resDoc.exists()) {
                return resDoc.data()
            } else {
                console.log('No such document!')
            }
        }
    } catch (error) {
        console.log(error)
    }
}
