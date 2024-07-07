<template>
    <div class="container h-full pt-[60px]">
        <Search v-model:search="search" @searchClick="handleSearchMovie" />
        <div class="flex-center h-full" v-show="resultData.length == 0">
            <p
                class="text-body-xxl-medium flex items-center justify-center text-center text-enable"
            >
                暫未搜尋到任何結果
            </p>
        </div>
        <!-- <div class="text-body-l mt-[60px] font-medium">結果顯示: 第1-2個 (總共2個)</div> -->
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
    </div>
</template>

<script setup>
import Search from '@/components/ui/search.vue'
import SearchCard from '@/components/shared/search-card.vue'
import { searchMovie } from '@/function/api'
import { ref, watch, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const search = ref('')
const resultData = ref([])

const params = ref({
    include_adult: 'false',
    language: 'zh-TW',
    query: '',
    page: '1',
})
const handleSearchMovie = async () => {
    params.value.query = search.value
    router.push({
        query: {
            q: search.value,
        },
    })
}

watch(
    () => params.value,
    async (newValue, oldValue) => {
        console.log(newValue)
        const resData = await searchMovie({
            params: params.value,
        })
        const { results } = resData.data
        resultData.value = results
    },
    { deep: true },
)

const goSearchDetailPage = () => {}

onMounted(async () => {
    params.value.query = route?.query?.q
    search.value = route?.query?.q
})
</script>

<style lang="scss" scoped></style>
