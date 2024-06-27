import axios from 'axios'

const searchBaseURL = import.meta.env.VITE_APP_THE_MOVIE_DB_BASE_URL
const searchApiKey = import.meta.env.VITE_APP_THE_MOVIE_DB_API_KEY
console.log(searchBaseURL)
console.log(searchApiKey)

export async function searchMovieFetch(query) {
    let apiUrl = `${searchBaseURL}${searchApiKey}&language=zh-TW&query=${query}`
    const res = await axios.get(apiUrl)
    return res.data
}

// https://api.themoviedb.org/3/search/multi?api_key=a44def496d0c387f06b632df3f6cb20e&language=zh-TW&query=

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
    searchMovie: async (opt) => fetch({ path: `search/multi`, opts: opt }),
    searchMovieDetail: async (opt) => fetch({ path: ``, opts: opt }),
}
// axios({
//     method: 'get',
//     url: searchBaseURL,
//     params: {
//         include_adult: 'false',
//         'api-key': searchApiKey,
//         language: 'zh-TW',
//         query: query,
//         page: '1',
//     },
// })
