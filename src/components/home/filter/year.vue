<template>
    <div>
        <div
            class="flex cursor-pointer items-center justify-between"
            @click="isExpanded = !isExpanded"
        >
            <p>
                年份
                <span v-if="currYearLists.length > 0">({{ currYearLists.length }})</span>
            </p>
            <i
                class="icon-caret-down text-[20px] transition-transform duration-500"
                :class="{ 'rotate-180': isExpanded }"
            ></i>
        </div>
        <Collapse :when="isExpanded">
            <div class="flex flex-col space-y-3 pt-3">
                <div v-for="(item, index) in yearLists" :key="index" class="">
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
import { useFilterStore } from '@/stores/filter.js'
import { ref, computed, reactive } from 'vue'
import { Collapse } from 'vue-collapsed'
import Checkbox from '@/components/home/filter/checkbox.vue'

const filterStore = useFilterStore()
const yearLists = computed(() => {
    return filterStore.yearLists.map((item) => {
        return { title: item, slug: item }
    })
})

const yearRef = ref()
const isExpanded = ref(true)
const currYearLists = reactive(filterStore.currYearLists)

const setStatus = (data) => {
    if (data == 'clear') {
        currYearLists.length = 0
    } else {
        const index = currYearLists.findIndex((item) => item == data.id)

        if (index !== -1) {
            currYearLists.splice(index, 1)
        } else {
            currYearLists.push(data.id)
        }
        filterStore.setCurrYearLists(currYearLists)
    }
}
const checkExistYear = (checkId) => {
    const index = currYearLists.findIndex((item) => {
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
