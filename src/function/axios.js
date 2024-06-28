import axios from 'axios'

const searchBaseURL = import.meta.env.VITE_APP_THE_MOVIE_DB_BASE_URL
// const searchApiKey = import.meta.env.VITE_APP_THE_MOVIE_DB_API_KEY
const searchHeaders = {
    accept: 'application/json',
    Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhNDRkZWY0OTZkMGMzODdmMDZiNjMyZGYzZjZjYjIwZSIsIm5iZiI6MTcxOTQ3MDM2Mi44OTUzNDksInN1YiI6IjYwNGYzM2NmODcxYjM0MDAzYzk0NDg5ZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GK8vrQP-AmlzaFayj4cNG2zwKd9XpRZdn4NnjxhNV5w',
}

export const fetch = async ({ path, method = 'get', opts }) => {
    let url = `${searchBaseURL + path}`
    console.log(opts)
    return await axios({
        method,
        url,
        ...opts,
        headers: searchHeaders,
    })
}
