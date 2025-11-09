<template>
    <div @click="setCurrent()" class="flex cursor-pointer items-center justify-between">
        <p>{{ title }}</p>
        <div class="relative size-[20px] rounded-[4px]" :class="{ border: !isCurrent }">
            <div class="absolute size-full rounded-[4px] bg-primary" v-if="isCurrent">
                <i class="icon-check text-[20px] text-second"></i>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
    title: {
        type: String,
    },
    current: {
        type: Boolean,
        default: () => false,
    },
})

const emit = defineEmits(['selected'])

const isCurrent = ref(props.current)
const setCurrent = () => {
    isCurrent.value = !isCurrent.value
    emit('selected', isCurrent.value)
}
</script>

<style lang="scss" scoped></style>
