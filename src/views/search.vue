<template>
    <div class="container mb-20 h-full pt-[60px]" ref="pageViewRef">
        <Search v-model:search="search" @searchClick="handleSearchMovie" id="search-bar" />
        <div class="flex-center h-full" v-if="resultData.length == 0 || isLoading">
            <Loading v-show="isLoading" />
            <p
                class="text-body-xxl-medium flex items-center justify-center text-center text-enable"
                id="no-result"
                v-if="resultData.length == 0 && !isLoading"
            >
                暫未搜尋到任何結果
            </p>
        </div>
        <div class="text-body-l mt-[60px] font-medium" v-else>
            結果顯示:1-{{ resultData.length }} (總共{{ totalResults }}個)
        </div>
        <div class="mt-10 grid grid-cols-12 gap-5" v-if="resultData.length > 0">
            <SearchCard
                v-for="(item, index) in resultData"
                :key="index"
                :id="item.id"
                :title="item?.name ?? item.title ?? item?.original_title"
                :poster="item.poster_path"
                :date="item?.first_air_date ?? item.release_date"
                :mediaType="item.media_type"
                @getDataId="goSearchDetailPage"
                class="search-card col-span-6 sm:col-span-4 md:col-span-4 lg:col-span-3 xl:col-span-2"
            />
        </div>
        <div ref="infiniteRef"></div>
    </div>
</template>

<script setup>
import Search from '@/components/search/search-input.vue'
import SearchCard from '@/components/search/search-card.vue'
import Loading from '@/components/shared/loading.vue'
import { searchMovie } from '@/api/api.js'
import { ref, watch, onMounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useIntersectionObserver } from '@vueuse/core'
import gsap from 'gsap'

const router = useRouter()
const route = useRoute()

const isLoading = ref(false)

const search = ref('')
const resultData = ref([])
const nowPage = ref(1)
const totalPages = ref(0)
const totalResults = ref(0)
const hasNextPage = ref(false)

const params = ref({
    include_adult: 'false',
    language: 'zh-TW',
    query: '',
    page: 1,
})
const handleSearchMovie = async () => {
    params.value.query = search.value
    params.value.page = 1
    router.push({
        query: {
            q: search.value,
        },
    })
    resultData.value = []
}

watch(
    () => params.value,
    async (newValue, oldValue) => {
        isLoading.value = true
        const resData = await searchMovie({
            params: params.value,
        })
        const { page, results, total_pages, total_results } = resData.data

        nowPage.value = page
        if (page > 1) {
            resultData.value = [...resultData.value, ...results]
        } else {
            resultData.value = results
        }
        totalPages.value = total_pages
        totalResults.value = total_results

        isLoading.value = false
        console.log(page, total_pages)

        if (page === total_pages) {
            hasNextPage.value = false
        } else {
            hasNextPage.value = true
        }
    },
    { deep: true },
)

const pageViewRef = ref(null)
const infiniteRef = ref(null)

const { isActive, pause, resume } = useIntersectionObserver(
    infiniteRef,
    ([{ isIntersecting }]) => {
        if (isIntersecting && hasNextPage.value) {
            params.value.page++
        }
        // if (isFirst.value == false && hasNextPage.value) {
        //     params.value.page++
        //     isVisible.value = isIntersecting
        // } else {
        //     isFirst.value = false
        // }
    },
    { pageViewRef },
)

const goSearchDetailPage = () => {}

let t1 = gsap.timeline()
const initGsap = async () => {
    t1.fromTo(
        '#search-bar, #no-result',
        {
            opacity: 0,
        },
        {
            duration: 1,
            delay: 0,
            opacity: 1,
            stagger: 0.2,
        },
    )
}

onMounted(async () => {
    params.value.query = route?.query?.q
    search.value = route?.query?.q
    await nextTick()
    await initGsap()
})
</script>

<style lang="scss" scoped></style>
