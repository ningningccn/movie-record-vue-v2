<template>
    <div class="sticky top-0 z-10 bg-second" id="category-section">
        <div class="container relative">
            <div class="z-10 flex items-center justify-center pt-6">
                <div class="relative">
                    <button
                        v-for="(item, index) in data"
                        :key="item.slug"
                        class="text-body-xl-medium category-text relative px-6 py-4 text-enable hover:text-white md:px-[60px]"
                        :class="[{ 'text-white': currCategory == item.slug }, `btn-${index}`]"
                        @click="setCategory(item.slug, index, $event)"
                    >
                        {{ item.title }}
                    </button>
                    <div
                        class="absolute bottom-0 h-[3px] bg-primary transition-all duration-300"
                        :style="{ width: `${currWidth}px`, left: `${currLeft}px` }"
                    ></div>
                </div>
            </div>
        </div>
        <div class="border-b border-enable" id="category-bar"></div>
    </div>
</template>

<script setup>
import { nextTick, ref, onMounted } from 'vue'
import { useElementBounding } from '@vueuse/core'
import gsap from 'gsap'

const emit = defineEmits(['selected'])

const currWidth = ref(0)
const currLeft = ref(0)
const currCategory = ref('')

const setCategory = (slug, index) => {
    currCategory.value = slug
    const el = document.querySelector(`.btn-${index}`)
    currWidth.value = el.clientWidth
    currLeft.value = el.offsetLeft

    emit('selected', slug)
}

const data = ref([
    {
        title: '全部',
        slug: '',
    },
    {
        title: '電影',
        slug: 'movie',
    },
    {
        title: '電視劇',
        slug: 'tv',
    },
    {
        title: '動漫',
        slug: 'cartoon',
    },
])

let t1 = gsap.timeline()
const initGsap = () => {
    t1.fromTo(
        '#category-bar',
        { width: 0, opacity: 0 },
        {
            duration: 0.5,
            opacity: 1,
            width: '100%',
            onComplete: () => {
                const btn_1_el = document.querySelector(`.btn-0`)
                currWidth.value = btn_1_el.clientWidth
            },
        },
    )
    t1.fromTo(
        '.category-text',
        {
            opacity: 0,
            y: 10,
        },
        {
            duration: 0.5,
            opacity: 1,
            stagger: 0.1,
            y: 0,
        },
    )
}

onMounted(() => {
    initGsap()
})
</script>

<style lang="scss" scoped></style>
