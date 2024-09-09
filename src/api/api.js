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
    deleteDoc,
    query,
    where,
    orderBy,
} from 'firebase/firestore'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '@/services/firebase'
import { fetch } from '../api/axios'
import router from '@/router'
import { useGlobalStore } from '@/stores/global.js'
import { categoryTranslation } from '@/translation/category.js'

export const searchMovie = async (opt) => {
    return fetch({ path: `search/multi`, opts: opt })
}

export const searchMovieDetail = async (path, opt) => {
    return fetch({ path, opts: opt })
}
const db = getFirestore()
const auth = getAuth()

const getUserEmail = () => {
    const globalStore = useGlobalStore()
    return globalStore.user.email
}

export const getUserState = async () => {
    const globalStore = useGlobalStore()

    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                globalStore.setUserStatus(user)
                resolve(user.email)
            } else reject(user)
        })
    })
}

export const loginAccount = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
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
            return error.code
            // 錯誤訊息
        })
}

export const logout = () => {
    const globalStore = useGlobalStore()
    signOut(auth) // 登出方法，須上方引入
        .then(() => {
            router.push('/login') // 登出成功，跳回首頁
            globalStore.user = {}
            console.log('登出成功，跳回首頁')
        })
        .catch((error) => {
            console.log('登出失敗', error)
        })
}

export const createAccount = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user
            setDoc(doc(db, 'users', user.email), { uuid: user.uid, email: user.email })
            router.push('/')
        })
        .catch((error) => {
            console.log('error: ', error)
        })
}

export const getMovieListApi = async (slug, opt) => {
    const {
        selectedStatusLists,
        selectedYearLists,
        selectedCategoryLists,
        selectedCountryLists,
        order,
    } = opt
    const userEmail = getUserEmail()
    const whereSql = []
    if (slug) {
        whereSql.push(where('type', '==', slug))
    }
    if (selectedStatusLists.length > 0) {
        const indexFav = selectedStatusLists.indexOf('favorite')
        const indexWatched = selectedStatusLists.indexOf('watched')
        const indexWatching = selectedStatusLists.indexOf('to_be_watching')
        if (indexFav !== -1) {
            whereSql.push(where('favorite', '==', true))
        }
        if (indexWatched !== -1) {
            whereSql.push(where('watched', '==', true))
        }
        if (indexWatching !== -1) {
            whereSql.push(where('watched', '==', false))
        }
    }
    if (selectedYearLists.length > 0) {
        whereSql.push(where('year', 'in', selectedYearLists))
    }
    if (selectedCountryLists.length > 0) {
        whereSql.push(where('country', 'in', selectedCountryLists))
    }
    if (selectedCategoryLists.length > 0) {
        whereSql.push(where('categoryList', 'array-contains-any', selectedCategoryLists))
    }

    const q = query(
        collection(db, `users/${userEmail}/post`),
        ...whereSql,
        orderBy('createAt', order),
    )

    // asc
    const querySnapshot = await getDocs(q)
    console.log(querySnapshot)
    return querySnapshot.docs
}

export const getMovieDetail = async (id) => {
    try {
        // const userEmail = await getUserState()
        const userEmail = getUserEmail()
        if (userEmail) {
            const resDoc = await getDoc(doc(db, `users/${userEmail}/post`, `${id}`))
            if (resDoc.exists()) {
                return resDoc.data()
            } else {
                router.push('/')
                console.log('No such document!')
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export const getFilterLists = async () => {
    const userEmail = await getUserEmail()

    const q = query(collection(db, `users/${userEmail}/post`), orderBy('year', 'asc'))
    const querySnapshot = await getDocs(q)

    const yearFilterLists = new Set()
    const countryFilterLists = new Set()
    const categoryFilterLists = new Set()

    querySnapshot.docs.forEach((doc) => {
        yearFilterLists.add(doc.data().year)
        countryFilterLists.add(doc.data().country)
        // categoryFilterLists.add(...doc.data().categoryList)

        const resultCategoryLists = doc.data().categoryList
        resultCategoryLists.forEach((item) => {
            categoryFilterLists.add(item.id)
        })
    })

    const yearOptLists = Array.from(yearFilterLists)
    const countryOtpLists = Array.from(countryFilterLists)
    const categoryOtpList = Array.from(categoryFilterLists).map((item) => {
        return {
            label: categoryTranslation[item],
            id: item,
        }
    })

    return { yearOptLists, countryOtpLists, categoryOtpList }
}
// Create
export const addMovie = async (data) => {
    // const userEmail = await getUserState()
    const userEmail = getUserEmail()
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
export const saveImageStorage = async (data) => {
    // const userEmail = await getUserState()
    const userEmail = getUserEmail()
    return await uploadBytesResumable(
        storageRef(storage, `images/${userEmail}/${data.name}`),
        data,
    ).then(async (snapshot) => {
        return await getDownloadURL(snapshot.ref) //取得圖片url
    })
}

// EDIT
export const editMovieDetail = async (id, data) => {
    // const userEmail = await getUserState()
    const userEmail = getUserEmail()
    await setDoc(doc(db, `users/${userEmail}/post/${id}`), data, { merge: true })
}

// DELETE
export const deleteMovieDetail = async (id) => {
    // const userEmail = await getUserState()
    const userEmail = getUserEmail()
    await deleteDoc(doc(db, `users/${userEmail}/post/`, id))
    router.push('/')
}
