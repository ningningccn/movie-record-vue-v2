<template>
    <input
        type="text"
        class="w-full border-b bg-transparent px-1 py-2 text-white placeholder:text-placeholder focus:outline-none"
        :placeholder="placeholder"
        v-model="text"
    />
</template>

<script setup>
const props = defineProps({
    placeholder: {
        type: String,
    },
})
const text = defineModel('text')
</script>

<style lang="scss" scoped></style>
