<template>
    {{ value }}

    <VueMultiselect
        v-model="value"
        tag-placeholder="Add this as new tag"
        placeholder="Search or add a tag"
        label="label"
        track-by="code"
        :options="option"
        :multiple="true"
        tag-position="bottom"
        :taggable="true"
        @tag="addTag"
    ></VueMultiselect>
    <VueMultiselect
        v-model="value"
        :options="option"
        :multiple="true"
        :close-on-select="false"
        :clear-on-select="false"
        :preserve-search="true"
        placeholder="Pick some"
        label="label"
        track-by="code"
        :preselect-first="true"
    >
        <template #selection="{ values, search, isOpen }">
            <span class="multiselect__single" v-if="values.length" v-show="!isOpen"
                >{{ values.length }} options selected</span
            >
        </template>
    </VueMultiselect>
</template>

<script setup>
import { ref } from 'vue'
import VueMultiselect from 'vue-multiselect'

const value = ref([{ label: 'Javascript', code: 'js' }])
const option = ref([
    { label: 'Vue.js', code: 'vu' },
    { label: 'Javascript', code: 'js' },
    { label: 'Open Source', code: 'os' },
])

const addTag = (newTag) => {
    const tag = {
        label: newTag,
        code: newTag,
    }
    option.value.push(tag)
    value.value.push(tag)
}
</script>

<style lang="scss" scoped></style>
