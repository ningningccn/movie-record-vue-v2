<template>
    <VueFinalModal
        modal-id="add-movie-id"
        content-class="absolute inset-0  bg-[#30313299]"
        :content-transition="'vfm-fade'"
        :overlay-transition="'vfm-fade'"
    >
        <!-- !test -->
        <!-- <pre>
            <code>{{ movieData }}</code>
        </pre> -->
        <div class="absolute inset-0 h-full overflow-auto">
            <div
                class="main-gradient relative mx-auto my-[64px] md:my-[128px] w-[90%] md:w-[489px] rounded-[50px] border border-[#FFFFFF33] bg-black p-14 md:p-20"
            >
                <div>
                    <p class="text-heading-s">添加記錄</p>
                    <div class="mt-8 space-y-6">
                        <Calendar @selected="setDate" v-model:date="movieData.record_date" />
                        <Select :attrSelected="type" @selected="setType" />
                        <Input :placeholder="'名稱'" v-model:text="movieData.name" />
                        <Input
                            :placeholder="'原始名稱(選項)'"
                            v-model:text="movieData.original_name"
                        />
                        <Input :placeholder="'年份'" v-model:text="movieData.year" />
                        <Input :placeholder="'產地'" v-model:text="movieData.country" />
                        <Category :data="genres" v-model:category="movieData.categoryList" />
                    </div>
                    <UploadImage
                        class="my-8"
                        :imgUrl="`https://image.tmdb.org/t/p/w780${poster_img}`"
                        :movieName="name"
                        @imageData="setImageData"
                    />
                    <div class="space-y-3">
                        <Checkbox :title="'最愛'" @selected="setFavorite" />
                        <Checkbox :title="'已觀看'" @selected="setWatch" />
                        <Star @selected="setStar" />
                    </div>
                    <Button
                        :text="'添加'"
                        class="mt-8"
                        :disable="isSubmit"
                        @click="handleAddMovie()"
                    />
                </div>
                <button
                    type="button"
                    class="absolute right-10 top-10"
                    @click="vfm.close('add-movie-id')"
                >
                    <i class="icon-close text-[32px]"></i>
                </button>
            </div>
        </div>
    </VueFinalModal>
</template>

<script setup>
import 'vue-multiselect/dist/vue-multiselect.css'
import { ref, watch, computed } from 'vue'
import { VueFinalModal, useVfm } from 'vue-final-modal'
import Input from '@/components/ui/input.vue'
import Button from '@/components/ui/button.vue'
import UploadImage from '@/components/global/modal/upload-image.vue'
import Checkbox from '@/components/global/modal/checkbox.vue'
import Star from '@/components/global/modal/star.vue'
import Select from '@/components/global/modal/type-select.vue'
import Calendar from '@/components/global/modal/pick-calendar.vue'
import Category from '@/components/global/modal/category-select.vue'

import { addMovie, saveImageStorage } from '@/api/api.js'

import dayjs from 'dayjs'

const props = defineProps({
    name: {
        type: String,
    },
    original_name: {
        type: String,
    },
    year: {
        type: String,
    },
    country: {
        type: String,
    },
    poster_img: {
        type: String,
    },
    background_image: {
        type: String,
    },
    type: {
        type: String,
    },
    genres: {
        type: Object,
    },
})

console.log(props)

const vfm = useVfm()

const tempImage = ref(null)

const movieData = ref({
    record_date: dayjs(new Date()).format('DD-MM-YYYY'),
    type: '',
    name: '',
    original_name: '',
    year: '',
    country: '',
    mark: 0,
    favorite: false,
    categoryList: [],
    watched: false,
    postImageUrl: '',
    background_image: null,
})

movieData.value.type = props?.type ?? ''
movieData.value.name = props?.name ?? ''
movieData.value.original_name = props?.original_name ?? ''
movieData.value.year = dayjs(props?.year).format('YYYY') ?? ''
movieData.value.country = props?.country ?? ''
movieData.value.background_image = props?.background_image ?? null

const setDate = (date) => (movieData.value.record_date = date)
const setType = (type) => (movieData.value.type = type)
const setFavorite = (favorite) => (movieData.value.favorite = favorite)
const setWatch = (watch) => (movieData.value.watched = watch)
const setStar = (star) => (movieData.value.mark = star)
const setImageData = async (data) => (tempImage.value = data)

const handleAddMovie = async () => {
    movieData.value = {
        ...movieData.value,
        watched_date: movieData.value.watched ? dayjs(new Date()).format('DD-MM-YYYY') : '',
    }
    if (props.poster_img)
        movieData.value.postImageUrl = `https://image.tmdb.org/t/p/w780${props.poster_img}`
    else movieData.value.postImageUrl = await saveImageStorage(tempImage.value)

    await addMovie(movieData.value)
    console.log('added movie')
    vfm.close('add-movie-id')
}
const isSubmit = computed(() => {
    if (
        movieData.value.country &&
        movieData.value.type &&
        movieData.value.name &&
        movieData.value.year
    ) {
        return true
    } else {
        return false
    }
})

// watch(
//     movieData,
//     (val) => {
//         if (val.country && val.type && val.name && val.year) {
//             isSubmit.value = true
//         }
//     },
//     { deep: true },
// )
</script>

<style scoped>
:deep(.vfm--overlay) {
    /* @apply bg-[#303132] opacity-80;
     */
}
</style>
