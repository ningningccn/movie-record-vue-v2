<template>
    <div @click="setCurrent()" class="flex items-center space-x-2 cursor-pointer">
        <div class="relative size-[20px] rounded-[4px]" :class="{ border: !isCurrent }">
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
    slug: String,
})
const emit = defineEmits(['selected'])

const isCurrent = ref(false)
const setCurrent = () => {
    isCurrent.value = !isCurrent.value
    emit('selected', { slug: props.slug, status: isCurrent.value })
}
</script>

<style lang="scss" scoped></style>
