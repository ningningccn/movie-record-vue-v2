import { fetchFilterOptions } from "@/services/movieService.js"
import { defineStore } from "pinia"

export const useMovieFilterStore = defineStore("movieFilter", {
    // Define initial state
    state: () => ({
        // api data list
        yearList: [],
        countryList: [],
        categoryList: [],
        nameList: [],
        // current filter
        currKey: "latest_addition",
        currFilterWord: "createAt",
        currOrder: "desc",
        currStatusList: [],
        currYearList: [],
        currCategoryList: [],
        currCountryList: [],
    }),
    // Getters for computed state, similar to computed properties
    getters: {
        getFilterList: (state) => {
            return {
                selectedStatusList: state.currStatusList,
                selectedYearList: state.currYearList,
                selectedCategoryList: state.currCategoryList,
                selectedCountryList: state.currCountryList,
                order: state.currOrder,
                word: state.currFilterWord,
            }
        },
    },
    // Define actions (methods), can be synchronous or asynchronous
    actions: {
        async setFilterLists() {
            const { yearOptList, countryOptList, categoryOptList, nameList } = await fetchFilterOptions()

            this.yearList = yearOptList
            this.countryList = countryOptList
            this.categoryList = categoryOptList
            this.nameList = nameList
        },

        setOrder(data) {
            this.currKey = data.key
            this.currOrder = data.slug
            this.currFilterWord = data.filterWord
        },
        setCurrStatusList(data) {
            this.currStatusList = data
        },
        setCurrYearList(data) {
            this.currYearList = data
        },
        setCurrCategoryList(data) {
            this.currCategoryList = data
        },
        setCurrCountryList(data) {
            this.currCountryList = data
        },
    },
})

