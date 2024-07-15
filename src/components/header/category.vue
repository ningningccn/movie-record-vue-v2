<template>
    <div v-if="categoryList.length > 0">
        <VueMultiselect
            v-model="value"
            :options="categoryList"
            :multiple="true"
            :close-on-select="false"
            :clear-on-select="false"
            :preserve-search="true"
            placeholder="Pick some"
            label="label"
            track-by="slug"
        >
            <!-- :selectLabel="'test'"
            :selectedLabel="'已選擇'"
            :deselectLabel="'點擊取消'" -->
            <template #selection="{ values, search, isOpen }">
                <span class="multiselect__single" v-if="values.length" v-show="!isOpen"
                    >{{ values.length }} options selected</span
                >
            </template>
        </VueMultiselect>
        <!-- <pre class="language-json"><code>{{ value }}</code></pre> -->
    </div>

    <div class="flex flex-wrap items-center gap-3">
        <div
            class="text-body-l-semibold flex items-center space-x-3 rounded-[8px] border border-enable px-2 py-1 text-enable"
            v-for="item in value"
            :key="item.slug"
        >
            {{ item.label }}
            <button type="button" @click="delCategory(item?.slug)">
                <i class="icon-close text-[16px]"></i>
            </button>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import VueMultiselect from 'vue-multiselect'
import { categoryTranslation } from '@/translation/category'

const props = defineProps({
    data: {
        type: Object,
    },
})

const value = defineModel('category')

const categoryList = computed(() => {
    return props.data?.map((item) => {
        const label = categoryTranslation[item.id] ?? item.id
        return {
            label,
            slug: item.id,
        }
    })
})

const delCategory = (slug) => {
    const indexToRemove = value.value.findIndex((item) => item.slug === slug)
    if (indexToRemove !== -1) {
        value.value.splice(indexToRemove, 1)
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
</style>
