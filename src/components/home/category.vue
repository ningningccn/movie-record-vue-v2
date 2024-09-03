<template>
    <div class="border-b border-enable">
        <div class="container">
            <div class="flex items-center justify-center pt-6">
                <div class="relative">
                    <button
                        v-for="(item, index) in data"
                        :key="item.slug"
                        class="text-body-xl-medium relative px-6 py-4 text-enable hover:text-white md:px-[60px]"
                        :class="[{ 'text-white': currCategory == item.slug }, `btn-${index}`]"
                        @click="setCategory(item.slug, index, $event)"
                    >
                        <!-- <div
                            class="absolute bottom-0 left-0 h-[3px] w-full"
                            :class="{ 'bg-primary': currCategory == item.slug }"
                        ></div> -->
                        {{ item.title }}
                    </button>
                    <div
                        class="absolute bottom-0 h-[3px] bg-primary transition-all duration-300"
                        :style="{ width: `${currWidth}px`, left: `${currLeft}px` }"
                    ></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { nextTick, ref, onMounted } from 'vue'
import { useElementBounding } from '@vueuse/core'

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
        title: '綜藝',
        slug: 'show',
    },
])

onMounted(() => {
    const btn_1_el = document.querySelector(`.btn-0`)
    currWidth.value = btn_1_el.clientWidth
})
</script>

<style lang="scss" scoped></style>
