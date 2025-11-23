import { ref, computed } from "vue"
import { loginAccount, createAccount, logout, getUserState } from "@/services/authService.js"
import { useAuthStore } from "@/stores/auth.js"

/**
 * Authentication composable
 * Provides reactive authentication state and methods
 * @returns {Object} Authentication state and methods
 */
export function useAuth() {
    const authStore = useAuthStore()
    const isLoading = ref(false)
    const error = ref(null)
    const user = ref(null)

    /**
     * Check if user is authenticated
     */
    const isAuthenticated = computed(() => {
        return !!user.value || !!authStore.user?.email
    })

    /**
     * Get current user email
     */
    const userEmail = computed(() => {
        return user.value || authStore.user?.email || null
    })

    /**
     * Initialize user state
     */
    const initUser = async () => {
        try {
            isLoading.value = true
            error.value = null
            const email = await getUserState()
            user.value = email
            return email
        } catch (err) {
            user.value = null
            error.value = err
            throw err
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Login user
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise<boolean>} True if login successful, false otherwise
     */
    const login = async (email, password) => {
        try {
            isLoading.value = true
            error.value = null

            const errorCode = await loginAccount(email, password)

            if (errorCode) {
                error.value = errorCode
                return false
            }

            // Update user state after successful login
            await initUser()
            return true
        } catch (err) {
            error.value = err
            return false
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Register new user
     * @param {string} email - User email
     * @param {string} password - User password
     * @returns {Promise<boolean>} True if registration successful, false otherwise
     */
    const register = async (email, password) => {
        try {
            isLoading.value = true
            error.value = null

            await createAccount(email, password)

            // Update user state after successful registration
            await initUser()
            return true
        } catch (err) {
            error.value = err
            console.error("Registration error:", err)
            return false
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Logout user
     */
    const handleLogout = async () => {
        try {
            isLoading.value = true
            error.value = null
            await logout()
            user.value = null
        } catch (err) {
            error.value = err
        } finally {
            isLoading.value = false
        }
    }

    /**
     * Clear error state
     */
    const clearError = () => {
        error.value = null
    }

    return {
        // State
        isLoading,
        error,
        user,
        isAuthenticated,
        userEmail,

        // Methods
        login,
        register,
        handleLogout,
        initUser,
        clearError,
    }
}

