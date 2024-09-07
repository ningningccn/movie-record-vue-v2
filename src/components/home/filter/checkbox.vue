<template>
    <div
        @click="setCurrent()"
        class="flex items-center space-x-2"
        :class="[{ 'text-disable': disabled }, { 'cursor-pointer': !disabled }]"
    >
        <div
            class="relative size-[20px] rounded-[4px]"
            :class="[{ border: !isCurrent }, { 'border-disable': disabled }]"
        >
            <div class="absolute size-full rounded-[4px] bg-primary" v-if="isCurrent">
                <i class="icon-check text-[20px] text-second"></i>
            </div>
        </div>
        <p>{{ title }}</p>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
    title: String,
    slug: String | Number,
    disabled: {
        type: Boolean,
        default: false,
    },
})
const emit = defineEmits(['selected'])

const isCurrent = ref(false)
const setCurrent = () => {
    if (!props.disabled) {
        isCurrent.value = !isCurrent.value
        emit('selected', { slug: props.slug, status: isCurrent.value })
    }
}
const clearCheckbox = () => {
    isCurrent.value = false
    emit('selected', 'clear')
}

defineExpose({ clearCheckbox })
</script>

<style lang="scss" scoped></style>
