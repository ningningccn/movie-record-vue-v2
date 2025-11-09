import axios from 'axios'
import { API_CONFIG, API_HEADERS } from '@/constants'

/**
 * Fetch data from The Movie DB API
 * @param {Object} options - Request options
 * @param {string} options.path - API path
 * @param {string} options.method - HTTP method (default: 'get')
 * @param {Object} options.opts - Additional axios options
 * @returns {Promise} Axios response
 */
export const fetch = async ({ path, method = 'get', opts }) => {
    const url = `${API_CONFIG.THE_MOVIE_DB_BASE_URL}${path}`
    try {
        return await axios({
            method,
            url,
            ...opts,
            headers: API_HEADERS,
        })
    } catch (error) {
        console.error('API request failed:', error)
        throw error
    }
}
