<template>
    <div>
        <div
            class="flex cursor-pointer items-center justify-between"
            @click="isExpanded = !isExpanded"
        >
            <p>
                產地
                <span v-if="selectedLists.length > 0">({{ selectedLists.length }})</span>
            </p>
            <i
                class="icon-caret-down text-[20px] transition-transform duration-500"
                :class="{ 'rotate-180': isExpanded }"
            ></i>
        </div>
        <Collapse :when="isExpanded">
            <div class="flex flex-col space-y-3 pt-3">
                <div v-for="(item, index) in countryLists" :key="index" class="">
                    <Checkbox
                        :title="item.title"
                        :slug="item.slug"
                        @selected="setSelected"
                        ref="countryRef"
                    />
                </div>
            </div>
        </Collapse>
    </div>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import { Collapse } from 'vue-collapsed'
import Checkbox from '@/components/home/filter/checkbox.vue'

const emit = defineEmits(['selectedLists'])
const props = defineProps({
    countryList: {
        type: Object,
    },
})

const countryLists = computed(() => {
    return props.countryList.map((item) => {
        return { title: item, slug: item }
    })
})

const countryRef = ref()
const isExpanded = ref(true)
const selectedLists = reactive([])

const setSelected = (data) => {
    if (data == 'clear') {
        selectedLists.length = 0
    } else {
        const index = selectedLists.indexOf(data.slug)

        if (index !== -1) {
            selectedLists.splice(index, 1)
        } else {
            selectedLists.push(data.slug)
        }
        emit('selectedLists', selectedLists)
    }
}

const clearAllCheckbox = () => {
    countryRef.value.forEach((item) => {
        item.clearCheckbox()
    })
}

defineExpose({ clearAllCheckbox })
</script>

<style lang="scss" scoped></style>
