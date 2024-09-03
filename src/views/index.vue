<template>
    <Category @selected="setType" />
    <div class="container">
        <div class="text-body-l-semibold mt-[60px]">結果顯示:{{ movieList.length }}</div>
        <main class="mt-10 flex md:space-x-5">
            <div class="hidden min-w-[197px] max-w-[197px] md:block">
                <div class="space-y-4">
                    <Sort @order="setOrder" />
                    <Filter
                        @currStatusLists="setCurrStatusLists"
                        @currYearLists="setCurrYearLists"
                        @currCountryLists="setCurrCountryLists"
                        @currCategoryLists="setCurrCategoryLists"
                    />
                </div>
            </div>
            <div>
                <div class="grid grid-cols-4 gap-5 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-10">
                    <Card
                        :data="item"
                        class="col-span-2"
                        v-for="(item, index) in movieList"
                        :key="index"
                    />
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import Category from '@/components/home/category.vue'
import Sort from '@/components/home/sort.vue'
import Filter from '@/components/home/filter.vue'
import Card from '@/components/card.vue'
// import Calendar from '@/components/header/calendar.vue'

import { ref, reactive, watch } from 'vue'
import { getMovieListApi } from '@/function/api'

// const date = ref(new Date())
const currType = ref('')
const movieList = ref([])
const filterList = reactive({
    selectedStatusLists: [],
    selectedYearLists: [],
    selectedCountryLists: [],
    selectedCategoryLists: [],
    order: 'desc',
})

const getMovieList = async (slugType, opt) => {
    const dataDoc = await getMovieListApi(slugType, opt)
    dataDoc.forEach((doc) => {
        movieList.value.push({ id: doc.id, movie: doc.data() })
    })
}

// init
getMovieList(currType.value, filterList)

const setType = (slug) => {
    movieList.value = []
    currType.value = slug
    getMovieList(currType.value, filterList)
}

// emit
const setOrder = (data) => (filterList.order = data)
const setCurrStatusLists = (data) => (filterList.selectedStatusLists = data)
const setCurrYearLists = (data) => (filterList.selectedYearLists = data)
const setCurrCountryLists = (data) => (filterList.selectedCountryLists = data)
const setCurrCategoryLists = (data) => (filterList.selectedCategoryLists = data)

watch(
    () => filterList,
    (newValue, oldValue) => {
        movieList.value = []
        getMovieList(currType.value, filterList)
    },
    { deep: true },
)
</script>

<style scoped></style>
