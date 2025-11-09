<template>
    <button
        class="text-body-l-semibold w-full rounded-[8px] border border-primary py-2 text-center text-primary disabled:border-disable disabled:text-disable md:max-w-[329px]"
        :disabled="!disable"
    >
        <slot />
    </button>
</template>

<script setup>
defineProps({
    disable: {
        type: Boolean,
        default: false,
    },
})
</script>

<style lang="scss" scoped></style>
