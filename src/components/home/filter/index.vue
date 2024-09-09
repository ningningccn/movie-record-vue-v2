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
            <Status :isAllExpanded="isAllExpanded" ref="statusRef" />
            <Year ref="yearRef" />
            <Category ref="categoryRef" />
            <Country ref="countryRef" />
        </div>
    </div>
</template>

<script setup>
import { useFilterStore } from '@/stores/filter.js'
import { ref, watch, computed } from 'vue'
import { Collapse } from 'vue-collapsed'
import Status from '@/components/home/filter/status.vue'
import Year from '@/components/home/filter/year.vue'
import Category from '@/components/home/filter/category.vue'
import Country from '@/components/home/filter/country.vue'

const filterStore = useFilterStore()
const isAllExpanded = ref(true)

const statusRef = ref()
const yearRef = ref()
const categoryRef = ref()
const countryRef = ref()

const clearAllFilter = () => {
    statusRef.value.clearAllCheckbox()
    yearRef.value.clearAllCheckbox()
    categoryRef.value.clearAllCheckbox()
    countryRef.value.clearAllCheckbox()
}

const isClear = computed(() => {
    const { selectedStatusLists, selectedYearLists, selectedCategoryLists, selectedCountryLists } =
        filterStore.getFilterList
    return (
        selectedStatusLists.length > 0 ||
        selectedYearLists.length > 0 ||
        selectedCategoryLists.length > 0 ||
        selectedCountryLists.length > 0
    )
})
</script>

<style scoped></style>
