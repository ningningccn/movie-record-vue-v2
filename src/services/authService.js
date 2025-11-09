import router from "@/router"
import { setupFirebase } from "@/services/firebase.js"
import { useGlobalStore } from "@/stores/global.js"
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth"
import { doc, getFirestore, setDoc } from "firebase/firestore"

// Initialize Firebase Auth and Firestore
const auth = getAuth(setupFirebase)
const db = getFirestore(setupFirebase)

/**
 * Get current user email
 * @returns {string} user email
 * @throws {Error} if user email is not available
 */
export const getUserEmail = () => {
    const globalStore = useGlobalStore()
    if (!globalStore.user?.email) {
        throw new Error("User email is not available")
    }
    return globalStore.user.email
}

/**
 * get user authentication status
 * @returns {Promise<string>} user email, if not logged in, reject
 */
export const getUserState = async () => {
    const globalStore = useGlobalStore()

    return new Promise((resolve, reject) => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                globalStore.setUserStatus(user)
                resolve(user.email)
            } else {
                reject(user)
            }
        })
    })
}

/**
 * user login
 * @param {string} email - user email
 * @param {string} password - user password
 * @returns {Promise<string|undefined>} if login failed, return error code, if success, return undefined
 */
export const loginAccount = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // login success
            const user = userCredential.user

            router.push({
                path: "/",
            })
            // login success, redirect to home page
        })
        .catch((error) => {
            console.error("Login error:", error.code)
            return error.code
            // return error code
        })
}

/**
 * user logout
 */
export const logout = () => {
    const globalStore = useGlobalStore()
    signOut(auth)
        .then(() => {
            router.push("/login") // logout success, redirect to login page
            globalStore.user = {}
        })
        .catch((error) => {
            console.error("Logout failed:", error)
        })
}

/**
 * Create new user account
 * @param {string} email - user email
 * @param {string} password - user password
 * @returns {Promise<void>} Resolves on success, rejects on error
 */
export const createAccount = async (email, password) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password)
        const user = userCredential.user
        // Create user document in Firestore
        await setDoc(doc(db, "users", user.email), { uuid: user.uid, email: user.email })
        router.push("/")
    } catch (error) {
        console.error("Account creation error:", error)
        throw error
    }
}
