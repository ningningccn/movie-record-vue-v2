<template>
    <div class="container h-full pt-[60px]" ref="pageViewRef">
        <Search v-model:search="search" @searchClick="handleSearchMovie" />
        <div class="flex-center h-full" v-if="resultData.length == 0">
            <p
                class="text-body-xxl-medium flex items-center justify-center text-center text-enable"
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
                :title="item?.name ?? item.title"
                :poster="item.poster_path"
                :date="item?.first_air_date ?? item.release_date"
                :mediaType="item.media_type"
                @getDataId="goSearchDetailPage"
                class="col-span-6 sm:col-span-4 md:col-span-4 lg:col-span-3 xl:col-span-2"
            />
        </div>
        <div ref="infiniteRef"></div>
    </div>
</template>

<script setup>
import Search from '@/components/ui/search.vue'
import SearchCard from '@/components/shared/search-card.vue'
import { searchMovie } from '@/function/api'
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useIntersectionObserver } from '@vueuse/core'

const router = useRouter()
const route = useRoute()

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
const isVisible = ref(false)

const { isActive, pause, resume } = useIntersectionObserver(
    infiniteRef,
    ([{ isIntersecting }]) => {
        if (isIntersecting) {
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

onMounted(async () => {
    params.value.query = route?.query?.q
    search.value = route?.query?.q
})
</script>

<style lang="scss" scoped></style>
