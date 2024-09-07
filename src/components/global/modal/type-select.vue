<template>
    <VueMultiselect
        v-model="value"
        :options="options"
        :show-labels="false"
        :searchable="false"
        placeholder="種類"
        track-by="title"
        label="title"
    >
        <!-- <template slot="singleLabel" slot-scope="{ option }"
            ><strong>{{ option.title }}</strong> is written in<strong>
                {{ option.language }}</strong
            ></template
        > -->
        <template slot="caret" slot-scope="{ option }"> 123 </template>

        <!-- <template slot="singleLabel" slot-scope="></template> -->
    </VueMultiselect>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import VueMultiselect from 'vue-multiselect'
import { typeOptions } from '@/translation/type.js'

const emit = defineEmits(['selected'])
const props = defineProps({
    attrSelected: {
        type: String,
    },
})

const value = ref('')
const options = computed(() => {
    return Object.entries(typeOptions).map(([key, value]) => {
        return {
            title: value,
            slug: key,
        }
    })
})

const movieObject = options.value.find((option) => option.slug === props.attrSelected)
value.value = movieObject

watch(value, (val) => {
    emit('selected', val.slug)
})
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
    @apply flex items-center bg-second;
}
:deep(.multiselect__option--selected) {
    @apply flex items-center bg-second text-white;
}
:deep(.multiselect__option--highlight) {
    @apply flex items-center bg-second;
}
:deep(.multiselect__placeholder) {
    @apply text-[16px] text-placeholder;
}
:deep(.multiselect__option) {
    @apply flex items-center px-6 py-2;
}
</style>
