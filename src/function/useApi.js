import axios from 'axios'

const searchBaseURL = import.meta.env.VITE_APP_THE_MOVIE_DB
const searchApiKey = import.meta.env.VITE_APP_THE_MOVIE_DB_API_KEY
console.log(searchBaseURL)
console.log(searchApiKey)

export async function searchMovieFetch(query) {
    let apiUrl = `${searchBaseURL}${searchApiKey}&language=zh-TW&query=${query}`
    const res = await axios.get(apiUrl)
    return res.data
    // res.then(
    //     return
    // )

    // return {
    //     results: res.data.results,
    //     total: res.data.total_results,
    // }
}
