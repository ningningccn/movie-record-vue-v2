<template>
    <TypeTab @selected="setType" />
    <div class="container mb-20">
        <!-- <div class="text-body-l-semibold card mt-[60px]" ref="test">
            結果顯示:{{ movieList.length }}
        </div> -->
        <main class="mt-20 flex md:space-x-5">
            <div class="hidden min-w-[197px] max-w-[197px] md:block">
                <div class="space-y-4">
                    <Sort :currSlug="filterList.order" @order="setOrder" class="an-sidebar" />
                    <Filter
                        class="an-sidebar"
                        @currStatusLists="setCurrStatusLists"
                        @currYearLists="setCurrYearLists"
                        @currCountryLists="setCurrCountryLists"
                        @currCategoryLists="setCurrCategoryLists"
                    />
                </div>
            </div>
            <div class="w-full">
                <div
                    class="card-wrap grid grid-cols-4 gap-5 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-10"
                    id="card-wrap"
                >
                    <Card
                        :data="item"
                        class="card col-span-2"
                        v-for="(item, index) in movieList"
                        :key="index"
                    />
                </div>
                <div
                    class="text-heading-s flex size-full items-center justify-center"
                    v-if="movieList.length == 0 || isLoading"
                >
                    <Loading v-show="isLoading" />
                    <div v-if="movieList.length == 0 && !isLoading">尚無資料</div>
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import TypeTab from '@/components/home/type-tab.vue'
import Sort from '@/components/home/sort.vue'
import Filter from '@/components/home/filter/index.vue'
import Card from '@/components/home/card.vue'
import Loading from '@/components/shared/loading.vue'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
// import Calendar from '@/components/header/calendar.vue'

import { ref, reactive, watch, onMounted, nextTick } from 'vue'
import { getMovieListApi } from '@/api/api.js'
import gsap from 'gsap'

// const date = ref(new Date())

const isLoading = ref(false)
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
    isLoading.value = true
    const dataDoc = await getMovieListApi(slugType, opt)
    dataDoc.forEach((doc) => {
        movieList.value.push({ id: doc.id, movie: doc.data() })
    })
    isLoading.value = false
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

const t1 = gsap.timeline()
const initGsap = () => {
    t1.fromTo(
        '.an-sidebar',
        {
            display: 'hidden',
            x: -100,
            opacity: 0,
        },
        {
            duration: 0.5,
            opacity: 1,
            stagger: 0.2,
            delay: 0.5,
            x: 0,
            display: 'block',
        },
    )

    // t1.fromTo(
    //     '#card-watched-wrap',
    //     {
    //         x: -200,
    //     },
    //     {
    //         x: 0,
    //     },
    // )
    // t1.fromTo(
    //     '#card-wrap',
    //     { opacity: 0, x: 100 },
    //     {
    //         duration: 0.7,
    //         opacity: 1,
    //         x: 0,
    //     },
    // )
}

gsap.registerPlugin(ScrollTrigger)

onMounted(async () => {
    await initGsap()
})
</script>

<style scoped></style>
