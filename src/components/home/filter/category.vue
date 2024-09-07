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
                <div v-for="(item, index) in dataList" :key="index" class="">
                    <Checkbox
                        :title="item.title"
                        :slug="item.slug"
                        @selected="setStatus"
                        ref="categoryRef"
                    />
                </div>
            </div>
        </Collapse>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Collapse } from 'vue-collapsed'
import Checkbox from '@/components/home/filter/checkbox.vue'

import { categoryTranslation } from '@/translation/category.js'

const emit = defineEmits(['emitCurrCategory'])
const props = defineProps({
    categoryList: {
        type: Object,
    },
})

const dataList = computed(() => {
    return props.categoryList.map((item) => {
        return {
            title: categoryTranslation[item],
            slug: Number(item),
        }
    })
})

const categoryRef = ref()
const isExpanded = ref(true)
const currCategoryLists = reactive([])

const setStatus = (data) => {
    if (data == 'clear') {
        currCategoryLists.length = 0
    } else {
        const index = currCategoryLists.indexOf(data.slug)

        if (index !== -1) {
            currCategoryLists.splice(index, 1)
        } else {
            currCategoryLists.push(data.slug)
        }
        emit('emitCurrCategory', currCategoryLists)
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
