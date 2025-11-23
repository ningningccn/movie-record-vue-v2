<template>
    <VueFinalModal
        content-class="absolute bottom-0 w-full p-4 bg-card container rounded-t-[20px] pb-10"
        swipe-to-close="down"
        content-transition="vfm-slide-down"
        overlay-transition="vfm-fade"
    >
        <div class="container">
            <div class="text-heading-m flex items-center justify-center gap-x-2">
                <i class="icon-filter"></i>
                <p class="text-heading-s">篩選</p>
            </div>
            <div>
                <div class="text-body-xl-medium">狀態</div>
                <div class="mt-2 flex gap-3">
                    <button
                        type="button"
                        class="rounded-[8px] border border-enable px-2 py-1"
                        v-for="item in statusList"
                        :key="item.slug"
                        @click="setStatus(item)"
                        :class="{
                            'border-primary bg-primary': currStatusList.indexOf(item.slug) >= 0,
                            'cursor-default border-disable text-disable': checkStatus(item.slug),
                        }"
                    >
                        <p>{{ item.title }}</p>
                    </button>
                </div>
            </div>
            <div class="mt-6">
                <div class="text-body-xl-medium">年份</div>
                <div class="mt-2 flex flex-wrap gap-3">
                    <button
                        type="button"
                        class="rounded-[8px] border border-enable px-2 py-1"
                        v-for="item in filterStore.yearList"
                        :key="item"
                        @click="setYear(item)"
                        :class="{ 'border-primary bg-primary': currYearList.indexOf(item) >= 0 }"
                    >
                        <p>{{ item }}</p>
                    </button>
                </div>
            </div>
            <div class="mt-6">
                <div class="text-body-xl-medium">類別</div>
                <div class="mt-2 flex flex-wrap gap-3">
                    <button
                        type="button"
                        class="rounded-[8px] border border-enable px-2 py-1"
                        v-for="item in filterStore.categoryList"
                        :key="item.id"
                        @click="setCategory(item)"
                        :class="{
                            'border-primary bg-primary': checkExistCategory(item.id),
                        }"
                    >
                        <p>{{ item.label }}</p>
                    </button>
                </div>
            </div>
            <div class="mt-6">
                <div class="text-body-xl-medium">產地</div>
                <div class="mt-2 flex flex-wrap gap-3">
                    <button
                        type="button"
                        class="rounded-[8px] border border-enable px-2 py-1"
                        v-for="item in countryMapList"
                        :key="item.slug"
                        @click="setCountry(item)"
                        :class="{
                            'border-primary bg-primary': currCountryList.indexOf(item.slug) >= 0,
                        }"
                    >
                        <p>{{ item.title }}</p>
                    </button>
                </div>
            </div>
        </div>
    </VueFinalModal>
</template>

<script setup lang="ts">
import { useMovieFilterStore } from '@/stores/movieFilter.js'
import { VueFinalModal } from 'vue-final-modal'
import { ref, reactive, computed } from 'vue'

const statusList = [
    { title: '最愛', slug: 'favorite' },
    { title: '已觀看', slug: 'watched' },
    { title: '待觀看', slug: 'to_be_watching' },
]

const filterStore = useMovieFilterStore()
const currStatusList = reactive(filterStore.currStatusList)
const currYearList = reactive(filterStore.currYearList)
const currCategoryList = reactive(filterStore.currCategoryList)
const currCountryList = reactive(filterStore.currCountryList)

const countryMapList = computed(() => {
    return filterStore.countryList.map((item) => {
        return { title: item, slug: item }
    })
})

const checkExistCategory = (checkId) => {
    const index = currCategoryList.findIndex((item) => {
        return item.id === checkId
    })
    return index > -1
}

const checkStatus = (slug) => {
    if (currStatusList.includes('watched') && slug == 'to_be_watching') {
        return true
    }
    if (currStatusList.includes('to_be_watching') && slug == 'watched') {
        return true
    }
    return false
}

const setStatus = (data) => {
    if (data === 'clear') {
        currStatusList.length = 0
    } else {
        const index = currStatusList.indexOf(data.slug)

        if (index !== -1) {
            currStatusList.splice(index, 1)
        } else {
            currStatusList.push(data.slug)
        }

        filterStore.setCurrStatusList(currStatusList)
    }
}

const setYear = (data) => {
    if (data === 'clear') {
        currYearList.length = 0
    } else {
        const index = currYearList.indexOf(data)

        if (index !== -1) {
            currYearList.splice(index, 1)
        } else {
            currYearList.push(data)
        }
        filterStore.setCurrYearList(currYearList)
    }
}

const setCategory = (data) => {
    if (data === 'clear') {
        currCategoryList.length = 0
    } else {
        const index = currCategoryList.findIndex((item) => {
            return item.id === data.id
        })
        if (index !== -1) {
            currCategoryList.splice(index, 1)
        } else {
            currCategoryList.push(data)
        }
    }
}

const setCountry = (data) => {
    if (data === 'clear') {
        currCountryList.length = 0
    } else {
        const index = currCountryList.indexOf(data.slug)

        if (index !== -1) {
            currCountryList.splice(index, 1)
        } else {
            currCountryList.push(data.slug)
        }
        filterStore.setCurrCountryList(currCountryList)
    }
}
</script>
