import axios from 'axios'

const searchBaseURL = import.meta.env.VITE_APP_THE_MOVIE_DB_BASE_URL
// const searchApiKey = import.meta.env.VITE_APP_THE_MOVIE_DB_API_KEY

// export async function searchMovieFetch(query) {
//     const apiUrl = `${searchBaseURL}${searchApiKey}&language=zh-TW&query=${query}`
//     try {
//         const res = await axios.get(apiUrl)
//         return res.data
//     } catch (error) {
//         console.error('Search movie fetch failed:', error)
//         throw error
//     }
// }

const searchHeaders = {
    accept: 'application/json',
    Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDRkZWY0OTZkMGMzODdmMDZiNjMyZGYzZjZjYjIwZSIsIm5iZiI6MTcxOTQ3MDM2Mi44OTUzNDksInN1YiI6IjYwNGYzM2NmODcxYjM0MDAzYzk0NDg5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GK8vrQP-AmlzaFayj4cNG2zwKd9XpRZdn4NnjxhNV5w',
}

const fetch = async ({ path, method = 'get', opts }) => {
    let url = `${searchBaseURL + path}`
    return await axios({
        method,
        url,
        ...opts,
        headers: searchHeaders,
    })
}

export const useApi = {
    searchMovie: async (opt) => fetch({ path: 'search/multi', opts: opt }),
    searchMovieDetail: async (path, opt) => fetch({ path, opts: opt }),
}
