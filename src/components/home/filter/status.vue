<template>
    <div>
        <div
            class="flex cursor-pointer items-center justify-between"
            @click="isExpanded = !isExpanded"
        >
            <p>狀態</p>
            <i
                class="icon-caret-down text-[20px] transition-transform duration-500"
                :class="{ 'rotate-180': isExpanded }"
            ></i>
        </div>
        <Collapse :when="isExpanded">
            <div class="flex flex-col space-y-3 pt-3">
                <div v-for="(item, index) in dataList" :key="index" class="">
                    <Checkbox
                        :title="item.title"
                        :slug="item.slug"
                        :disabled="checkStatus(item.slug)"
                        :isChecked="checkExistStatus(item.slug)"
                        @selected="setStatus"
                        ref="statusRef"
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

const dataList = [
    { title: '最愛', slug: 'favorite' },
    { title: '已觀看', slug: 'watched' },
    { title: '待觀看', slug: 'to_be_watching' },
]

const statusRef = ref()
const isExpanded = ref(true)
const currStatusLists = reactive(filterStore.currStatusLists)

const checkStatus = (slug) => {
    if (currStatusLists.includes('watched') && slug == 'to_be_watching') {
        return true
    }
    if (currStatusLists.includes('to_be_watching') && slug == 'watched') {
        return true
    }
    return false
}

const checkExistStatus = (checkId) => {
    const index = currStatusLists.findIndex((item) => {
        return item === checkId
    })
    return index > -1
}

const setStatus = (data) => {
    if (data == 'clear') {
        currStatusLists.length = 0
    } else {
        const index = currStatusLists.indexOf(data.id)

        if (index !== -1) {
            currStatusLists.splice(index, 1)
        } else {
            currStatusLists.push(data.id)
        }

        filterStore.setCurrStatusList(currStatusLists)
    }
}

const handleALlExpanded = (boolean) => {
    isExpanded.value = boolean
}

const clearAllCheckbox = () => {
    statusRef.value.forEach((item) => {
        item.clearCheckbox()
    })
}

defineExpose({ handleALlExpanded, clearAllCheckbox })
</script>

<style lang="scss" scoped></style>
