<template>
    <VueFinalModal
        modal-id="add-record-id"
        class="absolute inset-0 bg-[#30313299]"
        :content-transition="'vfm-fade'"
        :overlay-transition="'vfm-fade'">
        <div class="absolute inset-0 h-full overflow-auto">
            <div
                class="main-gradient relative mx-auto my-[64px] w-[90%] rounded-[50px] border border-[#FFFFFF33] bg-black p-14 md:mt-[128px] md:w-[489px] md:p-20">
                <div>
                    <p class="text-heading-s">添加記錄</p>
                    <div class="mt-8 space-y-6">
                        <DatePicker @selected="setDate" v-model:date="movieData.record_date" />
                        <Select @selected="setType" />
                        <Input :placeholder="'名稱'" v-model:text="movieData.name" />
                        <Input :placeholder="'年份'" v-model:text="movieData.year" />
                        <Input :placeholder="'產地'" v-model:text="movieData.country" />
                        <Category v-model:category="movieData.categoryList" />
                    </div>
                    <UploadImage class="my-8" @imageData="setImageData" />
                    <div class="space-y-3">
                        <Checkbox :title="'最愛'" @selected="setFavorite" />
                        <Checkbox :title="'已觀看'" @selected="setWatch" />
                        <Star @selected="setStar" />
                    </div>
                    <Button class="mt-8" :disable="isSubmit" @click="handleAddMovie()">添加</Button>
                </div>
                <button type="button" class="absolute right-10 top-10" @click="vfm.close('add-record-id')">
                    <i class="icon-close text-[32px]"></i>
                </button>
            </div>
        </div>
    </VueFinalModal>
</template>

<script setup>
import "vue-multiselect/dist/vue-multiselect.css"
import { ref, watch } from "vue"
import { VueFinalModal, useVfm } from "vue-final-modal"
import { createMovie, uploadMovieImage } from "@/services/movieService.js"

import dayjs from "dayjs"


import Input from "@/components/ui/input.vue"
import Button from "@/components/ui/button.vue"
import UploadImage from "@/components/forms/upload-image.vue"
import Checkbox from "@/components/forms/checkbox.vue"
import Star from "@/components/forms/star.vue"
import Select from "@/components/forms/type-select.vue"
import DatePicker from "@/components/forms/date-picker.vue"
import Category from "@/components/forms/category-select.vue"


const vfm = useVfm()

const myValue = ref("")
const isSubmit = ref(false)

const movieData = ref({
    record_date: dayjs(new Date()).format("DD-MM-YYYY"),
    type: "",
    name: "",
    year: "",
    country: "",
    mark: 0,
    favorite: false,
    watched: false,
    postImageUrl: "",
})

const imageData = ref(null)

const setDate = (date) => (movieData.value.record_date = date)
const setType = (type) => (movieData.value.type = type)
const setFavorite = (favorite) => (movieData.value.favorite = favorite)
const setWatch = (watch) => (movieData.value.watched = watch)
const setStar = (star) => (movieData.value.mark = star)
const setImageData = async (data) => (imageData.value = data)

const handleAddMovie = async () => {
    movieData.value = {
        ...movieData.value,
        watched_date: movieData.value.watched ? dayjs(new Date()).format("DD-MM-YYYY") : "",
    }
    movieData.value.postImageUrl = await uploadMovieImage(imageData.value)
    await createMovie(movieData.value)
    vfm.close("add-record-id")
}

watch(
    movieData,
    (val) => {
        if (val.country && val.type && val.name && val.year) {
            isSubmit.value = true
        }
    },
    { deep: true },
)
</script>

<style scoped>
:deep(.vfm--overlay) {
    /* @apply bg-[#303132] opacity-80;
     */
}
</style>
