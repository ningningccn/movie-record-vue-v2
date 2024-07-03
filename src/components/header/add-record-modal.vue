<template>
    <VueFinalModal modal-id="add-movie-id" class="relative mx-auto h-full bg-[#30313299]">
        <!-- content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2" -->
        <div
            class="main-gradient relative mx-auto mt-[128px] w-[489px] rounded-[50px] border border-[#FFFFFF33] bg-black p-20"
        >
            <div>
                <p class="text-heading-s">添加記錄</p>
                <div class="mt-8 space-y-6">
                    <Calendar @selected="setDate" v-model:date="movieData.record_date" />
                    <Select @selected="setType" />
                    <Input :placeholder="'名稱'" v-model:text="movieData.name" />
                    <Input :placeholder="'年份'" v-model:text="movieData.year" />
                    <Input :placeholder="'產地'" v-model:text="movieData.country" />
                </div>
                <UploadImage class="my-8" @imageData="setImageData" />
                <div class="space-y-3">
                    <Checkbox :title="'最愛'" @selected="setFavorite" />
                    <Checkbox :title="'已觀看'" @selected="setWatch" />
                    <Star @selected="setStar" />
                </div>
                <Button :text="'添加'" class="mt-8" :disable="isSubmit" @click="handleAddMovie()" />
            </div>
            <button
                type="button"
                class="absolute right-10 top-10"
                @click="vfm.close('add-movie-id')"
            >
                <i class="icon-close text-[32px]"></i>
            </button>

            <!-- <button type="button" @click="test()">123</button> -->
        </div>
    </VueFinalModal>
</template>

<script setup>
import 'vue-multiselect/dist/vue-multiselect.css'
import { ref, watch } from 'vue'
import { VueFinalModal, useVfm } from 'vue-final-modal'
import Input from '@/components/ui/input.vue'
import Button from '@/components/ui/button.vue'
import UploadImage from '@/components/header/upload-image.vue'
import Checkbox from '@/components/header/checkbox.vue'
import Star from '@/components/header/star.vue'
import Select from '@/components/header/select.vue'
import Calendar from '@/components/header/calendar.vue'

import { addMovie, saveImageStorage } from '@/function/api'
import dayjs from 'dayjs'

const vfm = useVfm()

const myValue = ref('')
const isSubmit = ref(false)

const movieData = ref({
    record_date: dayjs(new Date()).format('DD/MM/YYYY'),
    type: '',
    name: '',
    year: '',
    country: '',
    mark: 0,
    favorite: false,
    watched: false,
    postImageUrl: '',
})

const imageData = ref(null)

const setDate = (date) => (movieData.value.record_date = date)
const setType = (type) => (movieData.value.type = type)
const setFavorite = (favorite) => (movieData.value.favorite = favorite)
const setWatch = (watch) => (movieData.value.watched = watch)
const setStar = (star) => (movieData.value.mark = star)
const setImageData = async (data) => (imageData.value = data)

const handleAddMovie = async () => {
    movieData.value.postImageUrl = await saveImageStorage(imageData.value)
    await addMovie(movieData.value)
    console.log('added movie')
    vfm.close('add-movie-id')
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
