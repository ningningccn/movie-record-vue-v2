<template>
    <div>
        <div class="max-h-[564px]">
            <img
                :src="`https://image.tmdb.org/t/p/w1280${data?.backdrop_path}`"
                alt=""
                class="size-full"
            />
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
console.log(route)
const getData = async () => {
    const resData = await searchMovieDetail(route.path)
    data.value = resData.data
    console.log(data.value)
}

getData()
</script>

<style lang="scss" scoped></style>
