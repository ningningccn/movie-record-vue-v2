<template>
    <div>
        <div
            class="flex cursor-pointer items-center justify-between"
            @click="isExpanded = !isExpanded"
        >
            <p>
                產地
                <span v-if="currCountryLists.length > 0">({{ currCountryLists.length }})</span>
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
const currCountryLists = reactive(filterStore.currCountryLists)

const checkExistCountry = (checkId) => {
    const index = currCountryLists.findIndex((item) => {
        return item === checkId
    })
    return index > -1
}

const setSelected = (data) => {
    if (data === 'clear') {
        currCountryLists.length = 0
    } else {
        const index = currCountryLists.findIndex((item) => item === data.id)
        if (index !== -1) {
            currCountryLists.splice(index, 1)
        } else {
            currCountryLists.push(data.id)
        }
        filterStore.setCurrCountryLists(currCountryLists)
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
