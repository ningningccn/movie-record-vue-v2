<template>
    <div>
        <div
            class="flex cursor-pointer items-center justify-between"
            @click="isExpanded = !isExpanded"
        >
            <p>
                類別
                <span v-if="currCategoryLists.length > 0">({{ currCategoryLists.length }})</span>
            </p>
            <i
                class="icon-caret-down text-[20px] transition-transform duration-500"
                :class="{ 'rotate-180': isExpanded }"
            ></i>
        </div>
        <Collapse :when="isExpanded">
            <div class="flex flex-col space-y-3 pt-3">
                <div v-for="(item, index) in filterStore.categoryLists" :key="index" class="">
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
import { useFilterStore } from '@/stores/filter.js'
import { ref, reactive, computed } from 'vue'
import { Collapse } from 'vue-collapsed'
import Checkbox from '@/components/home/filter/checkbox.vue'

const filterStore = useFilterStore()
const emit = defineEmits(['emitCurrCategory'])

const categoryRef = ref()
const isExpanded = ref(true)
const currCategoryLists = reactive(filterStore.currCategoryLists)

const checkExistCategory = (checkId) => {
    const index = currCategoryLists.findIndex((item) => {
        return item.id === checkId
    })
    return index > -1
}

const setStatus = (data) => {
    if (data == 'clear') {
        currCategoryLists.length = 0
    } else {
        const index = currCategoryLists.findIndex((item) => item.id == data.id)
        if (index !== -1) {
            currCategoryLists.splice(index, 1)
        } else {
            currCategoryLists.push(data)
        }
        filterStore.setCurrCategoryLists(currCategoryLists)
    }
}

const clearAllCheckbox = () => {
    categoryRef.value.forEach((item) => {
        item.clearCheckbox()
    })
}

defineExpose({ clearAllCheckbox })
</script>

<style lang="scss" scoped></style>
