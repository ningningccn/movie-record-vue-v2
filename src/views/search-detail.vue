<template>
    <div class="relative">
        <div
            class="bg-img relative z-10 h-[350px] w-full md:h-[564px]"
            :style="{
                backgroundImage: `url('https://image.tmdb.org/t/p/w1280${data?.backdrop_path}')`,
            }"
        >
            <!-- <img
                :src="`https://image.tmdb.org/t/p/w1280${data?.backdrop_path}`"
                alt=""
                class="absolute right-0 top-0 max-h-[564px]"
            /> -->
            <!-- <div class="desktop-bg-overlay absolute left-0 top-0 size-full"></div> -->
            <div class="bg-overlay absolute left-0 top-0 size-full"></div>
            <div
                class="container absolute left-1/2 top-[150px] hidden size-full -translate-x-1/2 items-center pt-[50px] md:top-0 md:flex"
            >
                <div class="w-[100%] md:w-[45%]">
                    <p class="text-heading-m">{{ data?.title ?? data?.name }}</p>
                    <p class="text-heading-s mt-1">{{ data?.original_title }}</p>
                    <div class="text-body-l mt-3 text-enable">
                        <p>上映日期:{{ data?.release_date ?? data?.first_air_date }}</p>
                        <p>片長:{{ data?.runtime }}分鐘</p>
                        <p>產地:{{ data?.original_language }}</p>
                    </div>
                    <button
                        class="text-body-l-semibold mt-[24px] w-full rounded-[8px] border border-primary py-2 text-center text-primary md:max-w-[329px]"
                    >
                        添加
                    </button>
                </div>
            </div>
        </div>
        <section class="container relative z-20 mt-[-150px] block md:hidden">
            <div class="w-[100%] md:w-[45%]">
                <p class="text-heading-m">{{ data?.title ?? data?.name }}</p>
                <p class="text-heading-s mt-1">{{ data?.original_title }}</p>
                <div class="text-body-l mt-3 text-enable">
                    <p>上映日期:{{ data?.release_date ?? data?.first_air_date }}</p>
                    <p>片長:{{ data?.runtime }}分鐘</p>
                    <p>產地:{{ data?.original_language }}</p>
                </div>
                <button
                    class="text-body-l-semibold mt-[24px] w-full rounded-[8px] border border-primary py-2 text-center text-primary md:max-w-[329px]"
                >
                    添加
                </button>
            </div>
        </section>

        <section class="container mt-10 md:mt-20">
            <div class="md:flex md:justify-between">
                <div class="mx-auto w-[50%] md:w-[30%] lg:w-[24%]">
                    <img
                        :src="`https://image.tmdb.org/t/p/w780${data?.poster_path}`"
                        alt=""
                        class="rounded-[8px]"
                    />
                </div>
                <div class="mt-10 w-full md:mt-0 md:w-[66%]">
                    {{ data?.overview }}
                </div>
            </div>
        </section>
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
    background: linear-gradient(89.55deg, #303132 42.27%, rgba(48, 49, 50, 0) 99.48%);
}
.bg-img {
    background-position: left calc(40vw) center;
    background-repeat: no-repeat;
    background-size: cover;
}

@media (max-width: 768px) {
    .bg-overlay {
        background: linear-gradient(0deg, #303132 30.27%, rgba(48, 49, 50, 0) 99.48%);
    }
    .bg-img {
        background-position: left center;
        background-repeat: no-repeat;
        background-size: cover;
    }
}
</style>
