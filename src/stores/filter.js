import { defineStore } from 'pinia'
import { getFilterLists } from '@/api/api.js'

export const useFilterStore = defineStore('filter', {
    //定義狀態初始值
    state: () => ({
        // api data list
        yearLists: [],
        countryLists: [],
        categoryLists: [],
        // current filter
        currKey: 'latest_addition',
        currFilterWord: 'createAt',
        currOrder: 'desc',
        currStatusLists: [],
        currYearLists: [],
        currCategoryLists: [],
        currCountyLists: [],
    }),
    //對狀態加工的 getters，如同 computed
    getters: {
        getFilterList: (state) => {
            return {
                selectedStatusLists: state.currStatusLists,
                selectedYearLists: state.currYearLists,
                selectedCategoryLists: state.currCategoryLists,
                selectedCountryLists: state.currCountyLists,
                order: state.currOrder,
                word: state.currFilterWord,
            }
        },
    },
    //定義使用到的函式，可以為同步和非同步，如同 method
    actions: {
        async setFilterLists() {
            const { yearOptLists, countryOtpLists, categoryOtpList } = await getFilterLists()

            this.yearLists = yearOptLists
            this.countryLists = countryOtpLists
            this.categoryLists = categoryOtpList
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
            this.currCountyLists = data
        },
    },
})
