<template>
    <div class="rounded-[8px] bg-card">
        <div class="flex items-center justify-between px-6 py-2">
            <div class="flex space-x-2">
                <i class="icon-filter text-[22px]"></i>
                <p class="cursor-pointer" @click="isAllExpanded = !isAllExpanded">篩選</p>
            </div>
            <p
                class="text-body-s"
                :class="[isClear ? 'cursor-pointer text-primary hover:text-white' : 'text-disable']"
                @click="clearAllFilter()"
            >
                清除
            </p>
        </div>
        <div class="flex flex-col space-y-6 px-6 pb-4 pt-6">
            <Status
                :isAllExpanded="isAllExpanded"
                @currStatusLists="setStatusLists"
                ref="statusRef"
            />
            <Year :yearList="yearLists" @currYearLists="setCurrYearLists" ref="yearRef" />
            <Category
                :categoryList="categoryLists"
                @emitCurrCategory="setCategoryLists"
                ref="categoryRef"
            />
            <Country
                :countryList="countryLists"
                @selectedLists="setCurrCountryLists"
                ref="countryRef"
            />
        </div>
    </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { Collapse } from 'vue-collapsed'
import Status from '@/components/home/filter/status.vue'
import Year from '@/components/home/filter/year.vue'
import Category from '@/components/home/filter/category.vue'
import Country from '@/components/home/filter/country.vue'

import { getFilterLists } from '@/api/api.js'
import { categoryTranslation } from '@/translation/category.js'

const emit = defineEmits([
    'currStatusLists',
    'currCategoryLists',
    'currYearLists',
    'currCountryLists',
])

const isAllExpanded = ref(true)
// const isExpanded = ref(false)

// api data list
const yearLists = ref([])
const countryLists = ref([])
const categoryLists = ref([])

// current list
const currStatusLists = ref([])
const currYearLists = ref([])
const currCountyLists = ref([])
const currCategoryLists = ref([])

// ref
const statusRef = ref()
const yearRef = ref()
const categoryRef = ref()
const countryRef = ref()

const init = async () => {
    const { yearOptLists, countryOtpLists, categoryOtpList } = await getFilterLists()

    yearLists.value = yearOptLists
    countryLists.value = countryOtpLists
    categoryLists.value = categoryOtpList
}

init()

const setCurrList = () => {}
// emit
const setStatusLists = (data) => {
    currStatusLists.value = data
    emit('currStatusLists', data)
}
const setCategoryLists = (data) => {
    const categoryMap = data.map((item) => {
        return {
            id: item,
            label: categoryTranslation[item],
        }
    })
    currCategoryLists.value = categoryMap
    emit('currCategoryLists', categoryMap)
}
const setCurrYearLists = (data) => {
    currYearLists.value = data
    emit('currYearLists', data)
}
const setCurrCountryLists = (data) => {
    currCountyLists.value = data
    emit('currCountryLists', data)
}

const clearAllFilter = () => {
    statusRef.value.clearAllCheckbox()
    yearRef.value.clearAllCheckbox()
    categoryRef.value.clearAllCheckbox()
    countryRef.value.clearAllCheckbox()
}

const isClear = computed(() => {
    return (
        currStatusLists.value.length > 0 ||
        currYearLists.value.length > 0 ||
        currCountyLists.value.length > 0 ||
        currCategoryLists.value.length > 0
    )
})
</script>

<style scoped></style>
