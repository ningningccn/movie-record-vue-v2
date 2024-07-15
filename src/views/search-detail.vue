<template>
    <div class="relative">
        <div class="z-5 relative flex h-[375px] items-end md:flex md:h-[500px] md:items-center">
            <img
                :src="`https://image.tmdb.org/t/p/w1280${data?.backdrop_path}`"
                alt=""
                class="absolute inset-0 size-full object-cover"
                v-if="data?.backdrop_path"
            />
            <img
                :src="`https://image.tmdb.org/t/p/w1280${data?.poster_path}`"
                alt=""
                class="absolute inset-0 size-full object-cover"
                v-else
            />
            <div class="bg-overlay absolute bottom-0 left-0 h-full w-[100%]"></div>
            <div class="container relative hidden md:block">
                <div class="w-[100%] md:w-[45%]">
                    <p class="text-heading-m">{{ data?.title ?? data?.name }}</p>
                    <p class="text-heading-s mt-1">
                        {{ data?.original_title ?? data?.original_name }}
                    </p>
                    <div class="text-body-l mt-3 text-enable">
                        <p>上映日期:{{ data?.release_date ?? data?.first_air_date }}</p>
                        <p v-if="data?.runtime">片長:{{ data?.runtime }}分鐘</p>
                        <p>產地:{{ country }}</p>
                        <p>
                            類型:<span v-for="(item, index) in genresList" :key="index">
                                {{ item.label }}
                            </span>
                        </p>
                    </div>
                    <button
                        class="text-body-l-semibold mt-[24px] w-full rounded-[8px] border border-primary py-2 text-center text-primary md:max-w-[329px]"
                        @click="openAddMovieModal()"
                    >
                        添加紀錄
                    </button>
                </div>
            </div>
        </div>
        <section
            class="md: container relative z-20 mt-[-150px] block translate-y-[110px] md:hidden md:translate-y-0"
        >
            <div class="w-[100%] md:w-[45%]">
                <p class="text-heading-m">{{ data?.title ?? data?.name }}</p>
                <p class="text-heading-s mt-1">{{ data?.original_title }}</p>
                <div class="text-body-l mt-3 text-enable">
                    <p>上映日期:{{ data?.release_date ?? data?.first_air_date }}</p>
                    <p v-if="data?.runtime">片長:{{ data?.runtime }}分鐘</p>
                    <p>產地:{{ country }}</p>
                </div>
                <button
                    class="text-body-l-semibold mt-[24px] w-full rounded-[8px] border border-primary py-2 text-center text-primary md:max-w-[329px]"
                >
                    添加
                </button>
            </div>
        </section>

        <section class="container mt-10 translate-y-[110px] md:mt-20 md:hidden md:translate-y-0">
            <div class="md:flex md:justify-between">
                <div class="mx-auto w-[50%] md:ml-0 md:w-[30%] lg:w-[24%]">
                    <img
                        :src="`https://image.tmdb.org/t/p/w780${data?.poster_path}`"
                        alt=""
                        class="rounded-[8px]"
                    />
                </div>
                <div class="mt-10 w-full md:mt-0 md:w-[66%]">
                    {{ data?.overview }}
                    <div></div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { countryTranslate } from '@/map-data/country'
import { categoryTranslation } from '@/translation/category.js'
import { useModal } from 'vue-final-modal'
import { searchMovieDetail } from '@/function/api'
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AddMovie from '@/components/search/add-movie-modal.vue'
import Category from '@/components/header/category.vue'
import { genresT } from '@/function/translation'

const route = useRoute()
const data = ref()
const params = ref({
    language: 'zh-TW',
})

const getData = async () => {
    const resData = await searchMovieDetail(route.path, {
        params: params.value,
    })
    data.value = resData.data

    // genres
    console.log(data.value)
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
            year: data.value?.release_date ?? data.value?.first_air_date,
            country: country.value,
            poster_img: data.value?.poster_path,
            background_image: data.value?.backdrop_path
                ? 'https://image.tmdb.org/t/p/w1280${data?.backdrop_path}'
                : null,
            genres: data.value?.genres,
            type: route.params.mediaType,
        },
    })
}

getData()
const genresList = computed(() => genresT(data.value?.genres))
console.log(genresList.value)

const country = computed(() => {
    const originCountry = data.value?.origin_country[0]
    if (countryTranslate.hasOwnProperty(originCountry)) return countryTranslate[originCountry]
    else return originCountry
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
