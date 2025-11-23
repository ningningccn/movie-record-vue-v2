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
    startAfter,
    limit,
} from 'firebase/firestore'
import { ref as storageRef, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage, setupFirebase } from '@/services/firebase'
import router from '@/router'
import { getUserEmail } from '@/services/authService.js'
import { categoryLabels } from '@/constants'

// Initialize Firestore
const db = getFirestore(setupFirebase)

/**
 * Fetch movie list with filters and pagination
 * @param {string} slug - Movie type slug
 * @param {Object} opt - Filter options
 * @param {Array} opt.selectedStatusList - Selected status filters
 * @param {Array} opt.selectedYearList - Selected year filters
 * @param {Array} opt.selectedCategoryList - Selected category filters
 * @param {Array} opt.selectedCountryList - Selected country filters
 * @param {string} opt.order - Sort order (asc/desc)
 * @param {string} opt.word - Sort field
 * @param {DocumentSnapshot} hasNextPage - Last document for pagination
 * @returns {Promise<{dataDoc: Array, latestDoc: DocumentSnapshot}>}
 */
export const fetchMovieList = async (slug, opt, hasNextPage) => {
    const {
        selectedStatusList,
        selectedYearList,
        selectedCategoryList,
        selectedCountryList,
        order,
        word,
    } = opt
    const userEmail = getUserEmail()
    const whereSql = []

    if (slug) {
        whereSql.push(where('type', '==', slug))
    }

    if (selectedStatusList.length > 0) {
        const indexFav = selectedStatusList.indexOf('favorite')
        const indexWatched = selectedStatusList.indexOf('watched')
        const indexWatching = selectedStatusList.indexOf('to_be_watching')

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

    if (selectedYearList.length > 0) {
        whereSql.push(where('year', 'in', selectedYearList))
    }

    if (selectedCountryList.length > 0) {
        whereSql.push(where('country', 'in', selectedCountryList))
    }

    if (selectedCategoryList.length > 0) {
        whereSql.push(where('categoryList', 'array-contains-any', selectedCategoryList))
    }

    const q = query(
        collection(db, `users/${userEmail}/post`),
        ...whereSql,
        orderBy(word, order),
        ...(hasNextPage ? [startAfter(hasNextPage)] : []),
        limit(20),
    )

    const querySnapshot = await getDocs(q)
    const latestDoc = querySnapshot.docs[querySnapshot.docs.length - 1]
    const dataDoc = querySnapshot.docs

    return { dataDoc, latestDoc }
}

/**
 * Fetch movie detail by ID
 * @param {string} id - Movie document ID
 * @returns {Promise<Object|undefined>} Movie data or undefined if not found
 */
export const fetchMovieById = async (id) => {
    try {
        const userEmail = getUserEmail()
        if (userEmail) {
            const resDoc = await getDoc(doc(db, `users/${userEmail}/post`, `${id}`))
            if (resDoc.exists()) {
                return resDoc.data()
            } else {
                router.push('/')
                console.warn('No such document!')
            }
        }
    } catch (error) {
        console.error('Error fetching movie:', error)
    }
}

/**
 * Fetch filter options (years, countries, categories, names)
 * @returns {Promise<{yearOptList: Array, countryOptList: Array, categoryOptList: Array, nameList: Array}>}
 */
export const fetchFilterOptions = async () => {
    const userEmail = getUserEmail()

    const q = query(collection(db, `users/${userEmail}/post`), orderBy('year', 'asc'))
    const querySnapshot = await getDocs(q)

    const yearFilterList = new Set()
    const countryFilterList = new Set()
    const categoryFilterList = new Set()
    const nameList = []

    querySnapshot.docs.forEach((doc) => {
        yearFilterList.add(doc.data().year)
        countryFilterList.add(doc.data().country)

        const resultCategoryList = doc.data().categoryList
        resultCategoryList.forEach((item) => {
            categoryFilterList.add(item.id)
        })
        nameList.push(doc.data().name)
    })

    const yearOptList = Array.from(yearFilterList)
    const countryOptList = Array.from(countryFilterList)
    const categoryOptList = Array.from(categoryFilterList).map((item) => {
        return {
            label: categoryLabels[item],
            id: item,
        }
    })

    return { yearOptList, countryOptList, categoryOptList, nameList }
}

/**
 * Create a new movie record
 * @param {Object} data - Movie data object
 * @returns {Promise<void>}
 */
export const createMovie = async (data) => {
    try {
    const userEmail = getUserEmail()
        await addDoc(collection(db, `users/${userEmail}/post`), {
                ...data,
                createAt: new Date().getTime(),
            })
        } catch (err) {
        console.error('Error creating movie:', err)
        throw err
    }
}

/**
 * Upload movie image to Firebase Storage
 * @param {File} data - Image file
 * @returns {Promise<string>} Download URL of the uploaded image
 */
export const uploadMovieImage = async (data) => {
    const userEmail = getUserEmail()
    return await uploadBytesResumable(
        storageRef(storage, `images/${userEmail}/${data.name}`),
        data,
    ).then(async (snapshot) => {
        return await getDownloadURL(snapshot.ref) // Get image URL
    })
}

/**
 * Update movie record
 * @param {string} id - Movie document ID
 * @param {Object} data - Updated movie data
 * @returns {Promise<void>}
 */
export const updateMovie = async (id, data) => {
    const userEmail = getUserEmail()
    await setDoc(doc(db, `users/${userEmail}/post/${id}`), data, { merge: true })
}

/**
 * Delete movie record
 * @param {string} id - Movie document ID
 * @returns {Promise<void>}
 */
export const deleteMovie = async (id) => {
    const userEmail = getUserEmail()
    await deleteDoc(doc(db, `users/${userEmail}/post/`, id))
    router.push('/')
}

