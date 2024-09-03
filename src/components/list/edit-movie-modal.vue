<template>
    <VueFinalModal modal-id="edit-movie-id" content-class="absolute inset-0  bg-[#30313299]">
        <div class="absolute inset-0 h-full overflow-auto">
            <div
                class="main-gradient relative mx-auto my-[128px] w-[489px] rounded-[50px] border border-[#FFFFFF33] bg-black p-20"
            >
                <div>
                    <p class="text-heading-s">修改記錄</p>
                    <div class="mt-8 space-y-6">
                        <Select :attrSelected="editMovie?.type" @selected="setType" />
                        <Input :placeholder="'名稱'" v-model:text="editMovie.name" />
                        <Input
                            :placeholder="'原始名稱(選項)'"
                            v-model:text="editMovie.original_name"
                        />
                        <Input :placeholder="'年份'" v-model:text="editMovie.year" />
                        <Input :placeholder="'產地'" v-model:text="editMovie.country" />
                        <Category
                            :data="props.categoryList"
                            v-model:category="editMovie.categoryList"
                        />
                    </div>
                    <!-- <UploadImage
                        class="my-8"
                        :imgUrl="`https://image.tmdb.org/t/p/w780${poster_img}`"
                        :movieName="name"
                        @imageData="setImageData"
                    /> -->
                    <div class="mt-8 space-y-3">
                        <Checkbox
                            :title="'最愛'"
                            :current="editMovie.favorite"
                            @selected="setFavorite"
                        />
                        <Checkbox
                            :title="'已觀看'"
                            :current="editMovie.watched"
                            @selected="setWatch"
                        />
                        <Star :current="editMovie.mark" @selected="setStar" />
                    </div>
                    <Button
                        :text="'修改'"
                        class="mt-8"
                        :disable="true"
                        @click="handleEditMovie()"
                    />
                </div>
                <button
                    type="button"
                    class="absolute right-10 top-10"
                    @click="vfm.close('edit-movie-id')"
                >
                    <i class="icon-close text-[32px]"></i>
                </button>
            </div>
        </div>
    </VueFinalModal>
</template>

<script setup>
import 'vue-multiselect/dist/vue-multiselect.css'
import { ref, watch, computed, reactive } from 'vue'
import { VueFinalModal, useVfm } from 'vue-final-modal'
import { useRoute } from 'vue-router'

import Input from '@/components/ui/input.vue'
import Button from '@/components/ui/button.vue'
import UploadImage from '@/components/header/upload-image.vue'
import Checkbox from '@/components/header/checkbox.vue'
import Star from '@/components/header/star.vue'
import Select from '@/components/header/select.vue'
import Calendar from '@/components/header/calendar.vue'
import Category from '@/components/header/category.vue'

import { addMovie, saveImageStorage, editMovieDetail } from '@/function/api'

import dayjs from 'dayjs'

const props = defineProps({
    updatedMovie: {
        type: Function,
    },
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
    categoryList: {
        type: Object,
    },
    mark: {
        type: Number,
    },
    watched: {
        type: Boolean,
    },
    favorite: {
        type: Boolean,
    },
})

console.log(props.categoryList)
const vfm = useVfm()
const route = useRoute()

const { name, original_name, year, country, type, mark, watched, favorite } = props
const editMovie = reactive({
    name,
    original_name,
    year,
    country,
    type,
    mark,
    watched,
    favorite,
})

// const myValue = ref('')
// const tempImage = ref(null)

// const movieData = ref({
//     record_date: dayjs(new Date()).format('DD-MM-YYYY'),
//     type: '',
//     name: '',
//     original_name: '',
//     year: '',
//     country: '',
//     mark: 0,
//     favorite: false,
//     categoryList: [],
//     watched: false,
//     postImageUrl: '',
//     background_image: null,
// })

// movieData.value.type = props?.type ?? ''
// movieData.value.name = props?.name ?? ''
// movieData.value.original_name = props?.original_name ?? ''
// movieData.value.year = props?.year ?? ''
// movieData.value.country = props?.country ?? ''
// movieData.value.background_image = props?.background_image ?? null

// const setDate = (date) => (movieData.value.record_date = date)
const setType = (type) => (editMovie.type = type)
const setFavorite = (favorite) => (editMovie.favorite = favorite)
const setWatch = (watch) => (editMovie.watched = watch)
const setStar = (star) => (editMovie.mark = star)
// const setImageData = async (data) => (tempImage.value = data)

const handleEditMovie = async () => {
    editMovie.watched_date = editMovie.watched ? dayjs(new Date()).format('DD-MM-YYYY') : ''
    await editMovieDetail(route.params.id, editMovie)
    await props.updatedMovie()
    console.log('updated movie')
    vfm.close('edit-movie-id')
}

// const handleAddMovie = async () => {
//     movieData.value = {
//         ...movieData.value,
//         watched_date: movieData.value.watched ? dayjs(new Date()).format('DD-MM-YYYY') : '',
//     }
//     if (props.poster_img)
//         movieData.value.postImageUrl = `https://image.tmdb.org/t/p/w780${props.poster_img}`
//     else movieData.value.postImageUrl = await saveImageStorage(tempImage.value)

//     await addMovie(movieData.value)
//     console.log('added movie')
//     vfm.close('add-movie-id')
// }
// const isSubmit = computed(() => {
//     if (editMovie.country && editMovie.type && editMovie.name && editMovie.year) return true
//     else return false
// })

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
