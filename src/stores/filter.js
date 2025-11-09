import { fetchFilterOptions } from "@/services/movieService.js"
import { defineStore } from "pinia"

export const useFilterStore = defineStore("filter", {
    // Define initial state
    state: () => ({
        // api data list
        yearLists: [],
        countryLists: [],
        categoryLists: [],
        nameLists: [],
        // current filter
        currKey: "latest_addition",
        currFilterWord: "createAt",
        currOrder: "desc",
        currStatusLists: [],
        currYearLists: [],
        currCategoryLists: [],
        currCountryLists: [],
    }),
    // Getters for computed state, similar to computed properties
    getters: {
        getFilterList: (state) => {
            return {
                selectedStatusLists: state.currStatusLists,
                selectedYearLists: state.currYearLists,
                selectedCategoryLists: state.currCategoryLists,
                selectedCountryLists: state.currCountryLists,
                order: state.currOrder,
                word: state.currFilterWord,
            }
        },
    },
    // Define actions (methods), can be synchronous or asynchronous
    actions: {
        async setFilterLists() {
            const { yearOptLists, countryOtpLists, categoryOtpList, nameLists } = await fetchFilterOptions()

            this.yearLists = yearOptLists
            this.countryLists = countryOtpLists
            this.categoryLists = categoryOtpList
            this.nameLists = nameLists
        },

        setOrder(data) {
            this.currKey = data.key
            this.currOrder = data.slug
            this.currFilterWord = data.filterWord
        },
        setCurrStatusList(data) {
            this.currStatusLists = data
        },
        setCurrYearLists(data) {
            this.currYearLists = data
        },
        setCurrCategoryLists(data) {
            this.currCategoryLists = data
        },
        setCurrCountryLists(data) {
            this.currCountryLists = data
        },
    },
})
