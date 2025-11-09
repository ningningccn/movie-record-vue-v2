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
import { categoryTranslation } from '@/translation/category.js'

// Initialize Firestore
const db = getFirestore(setupFirebase)

/**
 * Fetch movie list with filters and pagination
 * @param {string} slug - Movie type slug
 * @param {Object} opt - Filter options
 * @param {Array} opt.selectedStatusLists - Selected status filters
 * @param {Array} opt.selectedYearLists - Selected year filters
 * @param {Array} opt.selectedCategoryLists - Selected category filters
 * @param {Array} opt.selectedCountryLists - Selected country filters
 * @param {string} opt.order - Sort order (asc/desc)
 * @param {string} opt.word - Sort field
 * @param {DocumentSnapshot} hasNextPage - Last document for pagination
 * @returns {Promise<{dataDoc: Array, latestDoc: DocumentSnapshot}>}
 */
export const fetchMovieList = async (slug, opt, hasNextPage) => {
    const {
        selectedStatusLists,
        selectedYearLists,
        selectedCategoryLists,
        selectedCountryLists,
        order,
        word,
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
 * @returns {Promise<{yearOptLists: Array, countryOtpLists: Array, categoryOtpList: Array, nameLists: Array}>}
 */
export const fetchFilterOptions = async () => {
    const userEmail = getUserEmail()

    const q = query(collection(db, `users/${userEmail}/post`), orderBy('year', 'asc'))
    const querySnapshot = await getDocs(q)

    const yearFilterLists = new Set()
    const countryFilterLists = new Set()
    const categoryFilterLists = new Set()
    const nameLists = []

    querySnapshot.docs.forEach((doc) => {
        yearFilterLists.add(doc.data().year)
        countryFilterLists.add(doc.data().country)

        const resultCategoryLists = doc.data().categoryList
        resultCategoryLists.forEach((item) => {
            categoryFilterLists.add(item.id)
        })
        nameLists.push(doc.data().name)
    })

    const yearOptLists = Array.from(yearFilterLists)
    const countryOtpLists = Array.from(countryFilterLists)
    const categoryOtpList = Array.from(categoryFilterLists).map((item) => {
        return {
            label: categoryTranslation[item],
            id: item,
        }
    })

    return { yearOptLists, countryOtpLists, categoryOtpList, nameLists }
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

