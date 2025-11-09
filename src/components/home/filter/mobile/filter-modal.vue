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
                            'border-primary bg-primary': currStatusLists.indexOf(item.slug) >= 0,
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
                        v-for="item in filterStore.yearLists"
                        :key="item"
                        @click="setYear(item)"
                        :class="{ 'border-primary bg-primary': currYearLists.indexOf(item) >= 0 }"
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
                        v-for="item in filterStore.categoryLists"
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
                        v-for="item in countryMapLists"
                        :key="item.slug"
                        @click="setCountry(item)"
                        :class="{
                            'border-primary bg-primary': currCountryLists.indexOf(item.slug) >= 0,
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
import { useFilterStore } from '@/stores/filter.js'
import { VueFinalModal } from 'vue-final-modal'
import { ref, reactive, computed } from 'vue'

const statusList = [
    { title: '最愛', slug: 'favorite' },
    { title: '已觀看', slug: 'watched' },
    { title: '待觀看', slug: 'to_be_watching' },
]

const filterStore = useFilterStore()
const currStatusLists = reactive(filterStore.currStatusLists)
const currYearLists = reactive(filterStore.currYearLists)
const currCategoryLists = reactive(filterStore.currCategoryLists)
const currCountryLists = reactive(filterStore.currCountryLists)

const countryMapLists = computed(() => {
    return filterStore.countryLists.map((item) => {
        return { title: item, slug: item }
    })
})

const checkExistCategory = (checkId) => {
    const index = currCategoryLists.findIndex((item) => {
        return item.id === checkId
    })
    return index > -1
}

const checkStatus = (slug) => {
    if (currStatusLists.includes('watched') && slug == 'to_be_watching') {
        return true
    }
    if (currStatusLists.includes('to_be_watching') && slug == 'watched') {
        return true
    }
    return false
}

const setStatus = (data) => {
    if (data === 'clear') {
        currStatusLists.length = 0
    } else {
        const index = currStatusLists.indexOf(data.slug)

        if (index !== -1) {
            currStatusLists.splice(index, 1)
        } else {
            currStatusLists.push(data.slug)
        }

        filterStore.setCurrStatusList(currStatusLists)
    }
}

const setYear = (data) => {
    if (data === 'clear') {
        currYearLists.length = 0
    } else {
        const index = currYearLists.indexOf(data)

        if (index !== -1) {
            currYearLists.splice(index, 1)
        } else {
            currYearLists.push(data)
        }
        filterStore.setCurrYearLists(currYearLists)
    }
}

const setCategory = (data) => {
    if (data === 'clear') {
        currCategoryLists.length = 0
    } else {
        const index = currCategoryLists.findIndex((item) => {
            return item.id === data.id
        })
        if (index !== -1) {
            currCategoryLists.splice(index, 1)
        } else {
            currCategoryLists.push(data)
        }
    }
}

const setCountry = (data) => {
    if (data === 'clear') {
        currCountryLists.length = 0
    } else {
        const index = currCountryLists.indexOf(data.slug)

        if (index !== -1) {
            currCountryLists.splice(index, 1)
        } else {
            currCountryLists.push(data.slug)
        }
        filterStore.setCurrCountryLists(currCountryLists)
    }
}
</script>
