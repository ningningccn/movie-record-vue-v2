<template>
    <div>
        <div
            class="flex cursor-pointer items-center justify-between"
            @click="isExpanded = !isExpanded"
        >
            <p>
                產地
                <span v-if="currCountyLists.length > 0">({{ currCountyLists.length }})</span>
            </p>
            <i
                class="icon-caret-down text-[20px] transition-transform duration-500"
                :class="{ 'rotate-180': isExpanded }"
            ></i>
        </div>
        <Collapse :when="isExpanded">
            <div class="flex flex-col space-y-3 pt-3">
                <div v-for="(item, index) in countryLists" :key="item.slug" class="">
                    <Checkbox
                        :title="item.title"
                        :slug="item.slug"
                        :isChecked="checkExistCountry(item.slug)"
                        @selected="setSelected"
                        ref="countryRef"
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

const countryLists = computed(() => {
    return filterStore.countryLists.map((item) => {
        return { title: item, slug: item }
    })
})

const countryRef = ref()
const isExpanded = ref(true)
const currCountyLists = reactive(filterStore.currCountyLists)

const checkExistCountry = (checkId) => {
    const index = currCountyLists.findIndex((item) => {
        return item === checkId
    })
    return index > -1
}

const setSelected = (data) => {
    if (data == 'clear') {
        currCountyLists.length = 0
    } else {
        const index = currCountyLists.findIndex((item) => item == data.id)
        if (index !== -1) {
            currCountyLists.splice(index, 1)
        } else {
            currCountyLists.push(data.id)
        }
        filterStore.setCurrCountryLists(currCountyLists)
    }
}

const handleALlExpanded = (boolean) => (isExpanded.value = boolean)

const clearAllCheckbox = () => {
    countryRef.value.forEach((item) => {
        item.clearCheckbox()
    })
}

defineExpose({ handleALlExpanded, clearAllCheckbox })
</script>

<style lang="scss" scoped></style>
