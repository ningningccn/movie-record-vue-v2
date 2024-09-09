<template>
    <input
        :type="type"
        class="w-full rounded-none border-b bg-transparent px-1 py-2 text-white placeholder:text-placeholder focus:outline-none"
        :placeholder="placeholder"
        v-model="text"
    />
</template>

<script setup>
const props = defineProps({
    placeholder: {
        type: String,
    },
    type: {
        type: String,
        default: 'text',
    },
})
const text = defineModel('text')
</script>

<style lang="scss" scoped></style>
