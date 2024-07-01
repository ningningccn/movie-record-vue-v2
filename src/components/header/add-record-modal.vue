<template>
    <VueFinalModal modal-id="add-movie-id" class="relative mx-auto h-full bg-[#30313299]">
        <!-- content-class="flex flex-col max-w-xl mx-4 p-4 bg-white dark:bg-gray-900 border dark:border-gray-700 rounded-lg space-y-2" -->
        <div
            class="main-gradient relative mx-auto mt-[128px] w-[489px] rounded-[50px] border border-[#FFFFFF33] bg-black p-20"
        >
            <div>
                <p class="text-heading-s">添加記錄</p>
                <div class="mt-8 space-y-6">
                    <Calendar v-model:date="movieData.record_date" />
                    <Select @selected="setType" />
                    <Input :placeholder="'名稱'" v-model:text="movieData.name" />
                    <Input :placeholder="'年份'" v-model:text="movieData.year" />
                    <Input :placeholder="'產地'" v-model:text="movieData.country" />
                </div>
                <UploadImage class="my-8" />
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

import { addMovie } from '@/function/api'

const vfm = useVfm()

const myValue = ref('')
const isSubmit = ref(false)

const movieData = ref({
    record_date: new Date(),
    type: '',
    name: '',
    year: '',
    country: '',
    mark: 0,
    favorite: false,
    watched: false,
})

const setType = (state) => (movieData.value.type = state)
const setFavorite = (state) => (movieData.value.favorite = state)
const setWatch = (state) => (movieData.value.watched = state)
const setStar = (state) => (movieData.value.mark = state)

watch(
    movieData,
    (val) => {
        if (val.country && val.type && val.name && val.year) {
            isSubmit.value = true
        }
    },
    { deep: true },
)

const handleAddMovie = async () => {
    const state = await addMovie(movieData.value)
    vfm.close('add-movie-id')
}
</script>

<style scoped>
:deep(.vfm--overlay) {
    /* @apply bg-[#303132] opacity-80;
     */
}
</style>
