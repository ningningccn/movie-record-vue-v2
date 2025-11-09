<template>
    <div class="relative mb-[60px]">
        <div
            class="z-5 relative flex h-[375px] items-end md:flex md:h-full md:min-h-[500px] md:items-center"
            id="backdrop-wrap"
        >
            <img
                v-lazy="`https://image.tmdb.org/t/p/w1280${data?.backdrop_path}`"
                alt=""
                class="absolute inset-0 size-full object-cover"
                v-if="data?.backdrop_path"
            />
            <img
                v-lazy="`https://image.tmdb.org/t/p/w1280${data?.poster_path}`"
                alt=""
                class="absolute inset-0 size-full object-cover"
                v-else
            />
            <div class="bg-overlay absolute bottom-0 left-0 h-full w-[100%]"></div>
            <div class="container relative hidden md:block md:py-10">
                <div class="w-[100%] md:w-[45%]">
                    <p class="text-heading-m">{{ data?.title ?? data?.name }}</p>
                    <p class="text-heading-s mt-1">
                        {{ data?.original_title ?? data?.original_name }}
                    </p>
                </div>
            </div>
        </div>
        <section class="container relative z-20 mt-[-40px] block md:hidden md:translate-y-0">
            <div class="w-[100%] md:w-[45%]">
                <p class="text-heading-m">{{ data?.title ?? data?.name }}</p>
                <p class="text-heading-s mt-1">
                    {{ data?.original_title ?? data?.original_name }}
                </p>
            </div>
        </section>

        <!-- <pre>
                        {{ data }}
                    </pre
        > -->

        <section class="container mt-10 md:mt-20">
            <div class="items-center md:flex md:justify-between">
                <div class="mx-auto w-full md:ml-0 md:w-[35%] lg:w-[30%]" id="poster">
                    <img
                        :src="`https://image.tmdb.org/t/p/w780${data?.poster_path}`"
                        alt=""
                        class="rounded-[8px]"
                    />
                </div>
                <div class="mx-auto mt-10 w-full md:ml-auto md:mt-0 md:w-[55%]">
                    <div
                        class="text-body-s-medium info-anim mt-6 w-fit rounded-[4px] bg-primary px-1 py-[2px] text-second md:mt-0"
                        id="added-anim"
                    >
                        已加入
                    </div>
                    <div class="info-anim mt-6">
                        {{ data?.overview }}
                    </div>
                    <div class="mt-10 flex items-center justify-between">
                        <div class="text-body-l mt-3 grid gap-y-2">
                            <p class="info-anim">
                                上映日期: {{ data?.release_date ?? data?.first_air_date }}
                            </p>
                            <p class="info-anim">片長:{{ data?.runtime }}分鐘</p>
                            <p class="info-anim">
                                類型:
                                <span v-for="(item, index) in genresList" :key="index">
                                    {{ item.label }}
                                    <span v-show="index !== genresList.length - 1">, </span>
                                </span>
                            </p>
                            <p class="info-anim">產地: {{ country }}</p>
                        </div>
                    </div>
                    <!-- <div>
                        <button
                            class="text-body-l-semibold mt-[24px] w-full rounded-[8px] border border-primary py-2 text-center text-primary md:max-w-[329px]"
                            @click="openAddMovieModal()"
                        >
                            添加
                        </button>
                    </div> -->
                    <div class="info-anim">
                        <button
                            class="text-body-l-semibold mt-[24px] w-full rounded-[8px] border border-primary py-2 text-center text-primary md:max-w-[329px]"
                            @click="openAddMovieModal()"
                        >
                            添加
                        </button>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { countryTranslate } from '@/translation/country'
import { categoryTranslation } from '@/translation/category.js'
import { useModal } from 'vue-final-modal'
import { fetchMovieDetailFromApi } from '@/services/searchService.js'
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { genresT } from '@/translation'

import AddMovie from '@/components/modals/search-add-movie-modal.vue'
import Category from '@/components/forms/category-select.vue'
import gsap from 'gsap'

const route = useRoute()
const data = ref()
const params = ref({
    language: 'zh-TW',
})

const getData = async () => {
    const resData = await fetchMovieDetailFromApi(route.path, {
        params: params.value,
    })
    data.value = resData.data
}

const addMovieModal = useModal({
    component: AddMovie,
    attrs: {
        // title: 'Hello World!',
        // onConfirm() {
        //     close()
        // },
    },
})

const openAddMovieModal = async () => {
    addMovieModal.open()
    addMovieModal.patchOptions({
        attrs: {
            name: data.value?.title ?? data.value?.name,
            original_name: data.value?.original_title ?? data.value?.original_name,
            year: data.value?.release_date ?? data.value?.first_air_date,
            country: country.value,
            poster_img: data.value?.poster_path,
            background_image: data.value?.backdrop_path
                ? `https://image.tmdb.org/t/p/w1280${data.value.backdrop_path}`
                : null,
            genres: data.value?.genres,
            type: route.params.mediaType,
        },
    })
}

getData()
const genresList = computed(() => genresT(data.value?.genres))

const country = computed(() => {
    const originCountry = data.value?.origin_country[0]
    if (countryTranslate.hasOwnProperty(originCountry)) return countryTranslate[originCountry]
    else return originCountry
})

let t1 = gsap.timeline()
const initGsap = async () => {
    t1.fromTo(
        '#backdrop-wrap',
        {
            opacity: 0,
        },
        {
            duration: 1,
            delay: 0,
            opacity: 1,
        },
    )
    t1.fromTo(
        '#backdrop-wrap p',
        {
            opacity: 0,
            x: 200,
        },
        {
            x: 0,
            duration: 0.5,
            opacity: 1,
            stagger: 0.2,
        },
        '-=0.5',
    )
    t1.fromTo(
        '#poster',
        {
            opacity: 0,
            // x: -100,
            scale: 0.5,
        },
        {
            x: 0,
            duration: 1,
            scale: 1,
            opacity: 1,
        },
    )
    t1.fromTo(
        '.info-anim',
        {
            opacity: 0,
            x: 100,
        },
        {
            x: 0,
            duration: 0.5,
            opacity: 1,
            stagger: 0.1,
        },
        '-=1',
    )
}

onMounted(async () => {
    await nextTick()
    await initGsap()
})
</script>

<style scoped>
.bg-overlay {
    /* background: linear-gradient(0deg, #303132 30.27%, rgba(48, 49, 50, 0) 99.48%); */

    /* background: linear-gradient(89.55deg, #303132 42.27%, rgba(48, 49, 50, 0) 99.48%); */
    background: linear-gradient(89.55deg, #303132 0%, rgba(48, 49, 50, 0) 99.48%);
}
.bg-img {
    /* background-position: left calc(40vw) center; */
    background-repeat: no-repeat;
    background-size: cover;
}

@media (max-width: 768px) {
    .bg-overlay {
        background: linear-gradient(0deg, #303132 1%, rgba(48, 49, 50, 0) 99.48%);
    }
    .bg-img {
        background-position: left center;
        background-repeat: no-repeat;
        background-size: cover;
    }
}
</style>
