<template>
    <!-- <div
        class="relative z-10 w-full bg-cover bg-top bg-no-repeat py-20"
        :style="{
            backgroundImage: `url(${data?.postImageUrl})`,
        }"
    > -->
    <section class="relative pt-10 md:py-20">
        <div
            class="absolute left-0 top-0 z-10 size-full bg-cover bg-top bg-no-repeat py-20 blur"
            :style="{
                backgroundImage: `url(${data?.postImageUrl})`,
            }"
        >
            <div class="absolute left-0 top-0 z-10 size-full bg-black opacity-45">123</div>
        </div>
        <div class="container">
            <div class="relative z-10 flex w-full items-center justify-between">
                <div class="w-[23%]">
                    <img :src="data?.postImageUrl" alt="" class="rounded-[8px]" />
                </div>
                <div class="w-[66%]">
                    <p class="text-heading-m">{{ data?.name }}</p>
                    <div class="text-body-l mt-3 text-enable">
                        <p>上映日期:{{ data?.release_date ?? data?.first_air_date }}</p>
                        <p>記錄日期:{{ data?.record_date }}</p>
                        <p>片長:{{ data?.runtime }}分鐘</p>
                        <p>產地:{{ data?.country }}</p>
                    </div>
                    <div
                        class="text-body-s-medium mt-6 w-fit rounded-[4px] bg-primary px-1 py-[2px] text-second"
                        v-if="data?.watched"
                    >
                        已觀看
                    </div>
                    <div class="mt-6 flex items-center">
                        <div v-for="(item, index) in 5" :key="index">
                            <i class="icon-star-fill text-[24px]" v-if="item <= data?.mark"></i>
                            <i class="icon-star text-[24px]" v-if="item > data?.mark"></i>
                        </div>
                    </div>
                    <div class="mt-6 flex space-x-6 text-[32px]">
                        <i class="icon-heart-fill"></i>
                        <i class="icon-pencil-simple"></i>
                        <i class="icon-trash"></i>
                    </div>
                </div>
            </div>
        </div>
    </section>
    <!-- </div> -->

    <!-- <div class="relative">
        {{ data }}
        <div
            class="bg-img relative z-10 h-[350px] w-full md:h-[564px]"
            :style="{
                backgroundImage: `url('https://image.tmdb.org/t/p/w1280${data?.backdrop_path}')`,
            }"
        >
            <div class="bg-overlay absolute left-0 top-0 size-full"></div>
            <div
                class="container absolute left-1/2 top-[150px] hidden size-full -translate-x-1/2 items-center pt-[50px] md:top-0 md:flex"
            >
                <div class="w-[100%] md:w-[45%]">
                    <p class="text-heading-m">{{ data?.name }}</p>
                    <p class="text-heading-s mt-1">{{ data?.original_title }}</p>
                    <div class="text-body-l mt-3 text-enable">
                        <p>上映年份:{{ data?.year }}</p>
                        <p>片長:{{ data?.runtime }}分鐘</p>
                        <p>產地:{{ data?.country }}</p>
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
                    <p>記錄日期:{{ data?.record_date }}</p>
                    <p>片長:{{ data?.runtime }}分鐘</p>
                    <p>產地:{{ data?.country }}</p>
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
    </div> -->
</template>

<script setup>
import { searchMovieDetail } from '@/function/api'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getMovieDetail } from '@/function/api'

const route = useRoute()
const data = ref()
const params = ref({
    language: 'zh-TW',
})

onMounted(async () => {
    data.value = await getMovieDetail(route.params.id)
})
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
