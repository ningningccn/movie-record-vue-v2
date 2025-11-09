import { fetch } from "../api/axios"

/**
 * Search movies from external API (The Movie DB)
 * @param {Object} opt - Search options
 * @param {Object} opt.params - Query parameters (e.g., { query: 'movie name', page: 1 })
 * @returns {Promise<Object>} Search results
 */
export const searchMovies = async (opt) => {
    return fetch({ path: `search/multi`, opts: opt })
}

/**
 * Fetch movie detail from external API (The Movie DB)
 * @param {string} path - API path (e.g., '/movie/123' or '/tv/456')
 * @param {Object} opt - Request options
 * @param {Object} opt.params - Query parameters (e.g., { language: 'zh-TW' })
 * @returns {Promise<Object>} Movie detail data
 */
export const fetchMovieDetailFromApi = async (path, opt) => {
    return fetch({ path, opts: opt })
}

