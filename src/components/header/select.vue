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
import { ref, watch } from 'vue'
import VueMultiselect from 'vue-multiselect'

const emit = defineEmits(['selected'])

const value = ref('')
const options = [
    {
        title: '電影',
        slug: 'movie',
    },
    {
        title: '電視劇',
        slug: 'tv_drama',
    },
    {
        title: '綜藝',
        slug: 'tv_show',
    },
]

watch(value, (val) => {
    console.log(val)
    emit('selected', val.slug)
})
</script>

<style scoped>
.multiselect {
    @apply border-b text-white;
}
:deep(.multiselect__tags) {
    @apply flex items-center border-none bg-transparent px-1 py-0;
}
:deep(.multiselect__content-wrapper) {
    @apply translate-y-4 rounded-[8px] border-none bg-card;
}
:deep(.multiselect__single) {
    @apply bg-transparent;
}
:deep(.multiselect__option--selected.multiselect__option--highlight) {
    @apply bg-second;
}
:deep(.multiselect__option--selected) {
    @apply bg-second text-white;
}
:deep(.multiselect__option--highlight) {
    @apply bg-second;
}
:deep(.multiselect__placeholder) {
    @apply text-[16px] text-placeholder;
}
:deep(.multiselect__option) {
    @apply px-6 py-2;
}
</style>
