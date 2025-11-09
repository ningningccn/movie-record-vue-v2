<template>
    <TypeTab @selected="setType" />
    <div class="container mb-20">
        <FilterMobile class="block md:hidden" />
        <main class="mt-6 flex md:mt-14 md:space-x-5">
            <div class="hidden min-w-[197px] max-w-[197px] md:block">
                <div class="space-y-4">
                    <Sort class="an-sidebar" />
                    <Filter class="an-sidebar" />
                </div>
            </div>
            <div class="w-full" ref="pageViewRef">
                <div
                    class="card-wrap grid grid-cols-4 gap-5 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-10"
                    id="card-wrap">
                    <Card :data="item" class="card col-span-2" v-for="(item, index) in movieList" :key="index" />
                </div>
                <div
                    class="text-heading-s flex size-full items-center justify-center"
                    v-if="movieList.length == 0 || isLoading">
                    <Loading v-show="isLoading" />
                    <div v-if="movieList.length == 0 && !isLoading">尚無資料</div>
                </div>
                <div ref="infiniteRef"></div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { useFilterStore } from "@/stores/filter.js"
import TypeTab from "@/components/home/type-tab.vue"
import Sort from "@/components/home/sort.vue"
import Filter from "@/components/home/filter/index.vue"
import Card from "@/components/home/card.vue"
import Loading from "@/components/shared/loading.vue"
import FilterMobile from "@/components/home/filter/mobile/filter-m.vue"

import { ref, watch, onMounted } from "vue"
import { useIntersectionObserver } from "@vueuse/core"
import { fetchMovieList } from "@/services/movieService.js"
import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

const filterStore = useFilterStore()
const isLoading = ref(false)
const currType = ref("")
const movieList = ref([])
const hasNextPage = ref(null)

const getMovieList = async (slugType, opt) => {
    isLoading.value = true
    const { dataDoc, latestDoc } = await fetchMovieList(slugType, opt, hasNextPage.value)
    hasNextPage.value = latestDoc
    dataDoc.forEach((doc) => {
        movieList.value.push({ id: doc.id, movie: doc.data() })
    })
    isLoading.value = false
}

// init
// gsap.registerPlugin(ScrollTrigger)
getMovieList(currType.value, filterStore.getFilterList)

const setType = (slug) => {
    movieList.value = []
    hasNextPage.value = null
    currType.value = slug
    getMovieList(currType.value, filterStore.getFilterList)
}

watch(
    () => filterStore.getFilterList,
    (newValue, oldValue) => {
        movieList.value = []
        hasNextPage.value = null
        getMovieList(currType.value, filterStore.getFilterList)
    },
    { deep: true },
)

const pageViewRef = ref(null)
const infiniteRef = ref(null)

const { isActive, pause, resume } = useIntersectionObserver(
    infiniteRef,
    ([{ isIntersecting }]) => {
        if (isIntersecting && hasNextPage.value) {
            getMovieList(currType.value, filterStore.getFilterList)
        }
    },
    { pageViewRef },
)

const t1 = gsap.timeline()
const initGsap = () => {
    t1.fromTo(
        ".an-sidebar",
        {
            display: "hidden",
            x: -100,
            opacity: 0,
        },
        {
            duration: 0.5,
            opacity: 1,
            stagger: 0.2,
            delay: 0.5,
            x: 0,
            display: "block",
        },
    )
}

onMounted(() => {
    gsap.registerPlugin(ScrollTrigger)
    initGsap()
})
</script>

<style scoped></style>
