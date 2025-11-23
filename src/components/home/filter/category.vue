<template>
    <div>
        <div
            class="flex cursor-pointer items-center justify-between"
            @click="isExpanded = !isExpanded"
        >
            <p>
                類別
                <span v-if="currCategoryList.length > 0">({{ currCategoryList.length }})</span>
            </p>
            <i
                class="icon-caret-down text-[20px] transition-transform duration-500"
                :class="{ 'rotate-180': isExpanded }"
            ></i>
        </div>
        <Collapse :when="isExpanded">
            <div class="flex flex-col space-y-3 pt-3">
                <div v-for="(item, index) in filterStore.categoryList" :key="index" class="">
                    <Checkbox
                        :title="item.label"
                        :slug="item.id"
                        :isChecked="checkExistCategory(item.id)"
                        @selected="setStatus"
                        ref="categoryRef"
                    />
                </div>
            </div>
        </Collapse>
    </div>
</template>

<script setup>
import { useMovieFilterStore } from '@/stores/movieFilter.js'
import { ref, reactive, computed } from 'vue'
import { Collapse } from 'vue-collapsed'
import Checkbox from '@/components/home/filter/checkbox.vue'

const filterStore = useMovieFilterStore()
const emit = defineEmits(['emitCurrCategory'])

const categoryRef = ref()
const isExpanded = ref(true)
const currCategoryList = reactive(filterStore.currCategoryList)

const checkExistCategory = (checkId) => {
    const index = currCategoryList.findIndex((item) => {
        return item.id === checkId
    })
    return index > -1
}

const setStatus = (data) => {
    if (data === 'clear') {
        currCategoryList.length = 0
    } else {
        const index = currCategoryList.findIndex((item) => item.id === data.id)
        if (index !== -1) {
            currCategoryList.splice(index, 1)
        } else {
            currCategoryList.push(data)
        }
        filterStore.setCurrCategoryList(currCategoryList)
    }
}

const handleALlExpanded = (boolean) => (isExpanded.value = boolean)

const clearAllCheckbox = () => {
    categoryRef.value.forEach((item) => {
        item.clearCheckbox()
    })
}

defineExpose({ handleALlExpanded, clearAllCheckbox })
</script>

<style lang="scss" scoped></style>
