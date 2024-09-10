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
import { ref, watch } from 'vue'
const emit = defineEmits(['selected'])
const props = defineProps({
    title: String,
    slug: String | Number,
    disabled: {
        type: Boolean,
        default: false,
    },
    isChecked: Boolean,
})

const isCurrent = ref(props.isChecked)

const setCurrent = () => {
    if (!props.disabled) {
        isCurrent.value = !isCurrent.value
        emit('selected', { label: props.title, id: props.slug })
    }
}
const clearCheckbox = () => {
    isCurrent.value = false
    emit('selected', 'clear')
}

watch(
    () => props.isChecked,
    (newValue) => {
        isCurrent.value = newValue
    },
)

defineExpose({ clearCheckbox })
</script>

<style lang="scss" scoped></style>
