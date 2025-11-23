<template>
    <div>
        <VueMultiselect
            v-model="selectList"
            :options="categoryOptions"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="分類"
            label="label"
            track-by="id"
            selectedLabel="已選擇"
            selectLabel="點擊選擇"
            deselectLabel="點擊刪除"
        >
            <template #selection="{ values, search, isOpen }">
                <span class="multiselect__single" v-if="values.length" v-show="!isOpen"
                    >已選擇{{ values.length }}項</span
                >
            </template>
            <template #selectLabel="props"> 123 </template>
        </VueMultiselect>
    </div>

    <div class="flex flex-wrap items-center gap-3">
        <div
            class="text-body-l-semibold flex items-center space-x-3 rounded-[8px] border border-enable px-2 py-1 text-enable"
            v-for="item in selectList"
            :key="item.slug"
        >
            {{ item.label }}
            <button type="button" class="flex" @click="delCategory(item?.slug)">
                <i class="icon-tag-close  ml-[10px]"></i>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import VueMultiselect from 'vue-multiselect'
import { categoryLabels, categoryOptions } from '@/constants'

const props = defineProps({
    data: {
        type: Object,
    },
})

const selectList = defineModel('category')

if (props.data) {
    const categoryList = props.data?.map((item) => {
        const label = categoryLabels[item.id] ?? item.id
        return {
            id: item.id,
            label,
        }
    })
    selectList.value = categoryList
}

const delCategory = (slug) => {
    const indexToRemove = selectList.value.findIndex((item) => item.slug === slug)
    if (indexToRemove !== -1) {
        selectList.value.splice(indexToRemove, 1)
    }
}
</script>

<style scoped>
.multiselect {
    @apply border-b text-white;
}
:deep(.multiselect__tags) {
    @apply flex items-center border-none bg-transparent px-0 py-0;
}
:deep(.multiselect__content-wrapper) {
    @apply translate-y-4 rounded-[8px] border-none bg-card;
}
:deep(.multiselect__single) {
    @apply bg-transparent;
}
:deep(.multiselect__option--selected.multiselect__option--highlight) {
    @apply flex items-center;
}
:deep(.multiselect__option--selected) {
    @apply bg-second text-white;
}
:deep(.multiselect__option--highlight) {
    @apply bg-second;
}
:deep(.multiselect__placeholder) {
    @apply pl-1 text-[16px] text-placeholder;
}
:deep(.multiselect__option) {
    @apply px-6 py-2;
}

:deep(.multiselect__input, .multiselect__single) {
    @apply bg-transparent text-white;
}

:deep(.multiselect__option) {
    @apply flex items-center;
}
:deep(.multiselect__input) {
    @apply text-white;
}
</style>
