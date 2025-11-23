<template>
    <div>
        <div
            class="flex cursor-pointer items-center justify-between"
            @click="isExpanded = !isExpanded"
        >
            <p>
                年份
                <span v-if="currYearList.length > 0">({{ currYearList.length }})</span>
            </p>
            <i
                class="icon-caret-down text-[20px] transition-transform duration-500"
                :class="{ 'rotate-180': isExpanded }"
            ></i>
        </div>
        <Collapse :when="isExpanded">
            <div class="flex flex-col space-y-3 pt-3">
                <div v-for="(item, index) in yearList" :key="index" class="">
                    <Checkbox
                        :title="item.title"
                        :slug="item.slug"
                        :isChecked="checkExistYear(item.slug)"
                        @selected="setStatus"
                        ref="yearRef"
                    />
                </div>
            </div>
        </Collapse>
    </div>
</template>

<script setup>
import { useMovieFilterStore } from '@/stores/movieFilter.js'
import { ref, computed, reactive } from 'vue'
import { Collapse } from 'vue-collapsed'
import Checkbox from '@/components/home/filter/checkbox.vue'

const filterStore = useMovieFilterStore()
const yearList = computed(() => {
    return filterStore.yearList.map((item) => {
        return { title: item, slug: item }
    })
})

const yearRef = ref()
const isExpanded = ref(true)
const currYearList = reactive(filterStore.currYearList)

const setStatus = (data) => {
    if (data === 'clear') {
        currYearList.length = 0
    } else {
        const index = currYearList.findIndex((item) => item === data.id)

        if (index !== -1) {
            currYearList.splice(index, 1)
        } else {
            currYearList.push(data.id)
        }
        filterStore.setCurrYearList(currYearList)
    }
}
const checkExistYear = (checkId) => {
    const index = currYearList.findIndex((item) => {
        return item === checkId
    })
    return index > -1
}

const handleALlExpanded = (boolean) => {
    isExpanded.value = boolean
}

const clearAllCheckbox = () => {
    yearRef.value.forEach((item) => {
        item.clearCheckbox()
    })
}

defineExpose({ handleALlExpanded, clearAllCheckbox })
</script>

<style lang="scss" scoped></style>
