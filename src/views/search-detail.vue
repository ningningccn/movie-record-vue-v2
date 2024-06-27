<template>
    <div class="relative">
        <div class="relative h-[564px] w-full">
            <img
                :src="`https://image.tmdb.org/t/p/w1280${data?.backdrop_path}`"
                alt=""
                class="absolute right-0 top-0 max-h-[564px]"
            />
            <div class="bg-overlay absolute left-0 top-0 size-full"></div>
            <div class="container absolute left-1/2 top-0 size-full -translate-x-1/2">
                <div class="w-[40%]">
                    <p class="text-heading-m">{{ data?.title }}</p>
                    <p class="text-heading-s">{{ data?.original_title }}</p>
                    <p>{{ data?.original_language }}</p>
                    <p>{{ data?.re }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { searchMovieDetail } from '@/function/api'
import { ref } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'

// backdrop_path

const route = useRoute()
const data = ref()
const params = ref({
    language: 'zh-TW',
})
console.log(route)
const getData = async () => {
    const resData = await searchMovieDetail(route.path, {
        params: params.value,
    })
    data.value = resData.data
    console.log(data.value)
}

getData()
</script>

<style scoped>
.bg-overlay {
    background: linear-gradient(89.55deg, #303132 35.27%, rgba(48, 49, 50, 0) 99.48%);
}
</style>
