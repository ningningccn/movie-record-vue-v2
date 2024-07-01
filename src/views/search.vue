<template>
    <div class="container mt-[60px]">
        <Search v-model:search="search" @searchClick="handleSearchMovie" class="" />

        <div class="text-body-xxl-medium flex items-center justify-center text-center text-enable">
            暫未搜尋到任何結果
        </div>
        <!-- <div class="text-body-l mt-[60px] font-medium">結果顯示: 第1-2個 (總共2個)</div> -->
        <div class="mt-10 grid grid-cols-12 gap-5">
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
    </div>
</template>

<script setup>
import Search from '@/components/ui/search.vue'
import SearchCard from '@/components/shared/search-card.vue'
import { searchMovie } from '@/function/api'
import { ref, watch } from 'vue'
import { searchMovieFetch } from '@/function/useApi'

const search = ref('')
const resultData = ref()
// const movieData = ref()

// const searchMovie = async () => {
//     const { results } = await searchMovieFetch(search.value)
//     resultData.value = results
// }

const params = ref({
    include_adult: 'false',
    language: 'zh-TW',
    query: '海賊王',
    page: '1',
})
const handleSearchMovie = async () => {
    params.value.query = search.value

    const resData = await searchMovie({
        params: params.value,
    })
    const { results } = resData.data
    resultData.value = results
    console.log(results)
}
const goSearchDetailPage = () => {}
</script>

<style lang="scss" scoped></style>
