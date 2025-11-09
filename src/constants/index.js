/**
 * Application constants
 * Centralized configuration for API and other constants
 */

export const API_CONFIG = {
    THE_MOVIE_DB_BASE_URL: import.meta.env.VITE_APP_THE_MOVIE_DB_BASE_URL,
    THE_MOVIE_DB_API_KEY: import.meta.env.VITE_APP_THE_MOVIE_DB_API_KEY,
    THE_MOVIE_DB_BEARER_TOKEN: import.meta.env.VITE_APP_THE_MOVIE_DB_BEARER_TOKEN,
}

export const API_HEADERS = {
    accept: 'application/json',
    Authorization: API_CONFIG.THE_MOVIE_DB_BEARER_TOKEN,
}

