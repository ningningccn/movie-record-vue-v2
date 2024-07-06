<template>
    <div class="relative">
        <div
            class="flex justify-between border-b px-1 py-2 text-white"
            ref="test"
            @click="isShow = !isShow"
        >
            <p>
                {{ dayjs(date).format('DD/MM/YYYY') }}
            </p>
            <i class="icon-calendar cursor-pointer text-[24px]"></i>
        </div>
        <div class="absolute left-0 top-14 z-10 w-full" v-show="isShow" ref="calendar">
            <DatePicker v-model="date" />
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Calendar, DatePicker } from 'v-calendar'
import { useElementSize } from '@vueuse/core'
import { onClickOutside } from '@vueuse/core'
import 'v-calendar/style.css'
import dayjs from 'dayjs'

const emit = defineEmits(['selected'])

const isShow = ref(false)
const date = ref(new Date())
// ref
const calendar = ref(null)

watch(date, (val) => {
    emit('selected', dayjs(val).format('DD/MM/YYYY'))
})

onClickOutside(calendar, (event) => (isShow.value = false))
</script>

<style scoped>
:deep(.vc-container) {
    @apply w-full border-none bg-card px-4 py-4 text-white;
}
:deep(.vc-title) {
    @apply text-white;
}
:deep(.vc-base-icon) {
    @apply text-white;
}
:deep(.vc-weekday) {
    @apply text-white;
}
:deep(.vc-highlight-bg-solid) {
    @apply rounded-[4px] border border-white bg-card;
}
:deep(.vc-focus:focus-within) {
    @apply shadow-none;
}
:deep(.vc-day-content:hover) {
    @apply rounded-[4px] bg-enable;
}
:deep(.vc-highlight-bg-solid.vc-day-content:hover) {
    @apply rounded-none bg-transparent;
}
</style>
