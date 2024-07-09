<template>
    <div class="border-b border-enable">
        <div class="container">
            <div class="flex items-center justify-center pt-6">
                <button
                    v-for="item in data"
                    :key="item.slug"
                    class="text-body-xl-medium relative px-6 py-4 text-enable md:px-[60px]"
                    :class="{ 'text-white': currCategory == item.slug }"
                    @click="setCategory(item.slug)"
                >
                    <div
                        class="absolute bottom-0 left-0 h-[3px] w-full"
                        :class="{ 'bg-primary': currCategory == item.slug }"
                    ></div>
                    {{ item.title }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
const emit = defineEmits(['selected'])
const currCategory = ref('')
const setCategory = (slug) => {
    currCategory.value = slug
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
</script>

<style lang="scss" scoped></style>
