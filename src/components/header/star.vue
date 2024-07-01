<template>
    <div class="flex justify-between">
        <p>評分</p>
        <div class="flex">
            <div v-for="n in 5" :key="n" @mouseenter="enter(n)" @mouseleave="out" @click="ok(n)">
                <div class="flex">
                    <div v-if="mark < n">
                        <i class="icon-star text-[24px]"></i>
                    </div>
                    <div v-if="mark >= n">
                        <i class="icon-star-fill text-[24px]"></i>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['selected'])
const isClick = ref(false)
const mark = ref(0)

const ok = (n) => {
    isClick.value = !isClick.value
    mark.value = n

    if (isClick.value) {
        emit('selected', mark.value)
    } else {
        emit('selected', 0)
    }
}
const enter = (n) => {
    if (!isClick.value) mark.value = n
}
const out = () => {
    if (!isClick.value) mark.value = -1
}
</script>

<style lang="scss" scoped></style>
