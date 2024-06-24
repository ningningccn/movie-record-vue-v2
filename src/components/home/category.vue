<template>
    <div class="border-enable border-b">
        <div class="container">
            <div class="flex items-center justify-center pt-6">
                <button
                    v-for="item in data"
                    :key="item.slug"
                    class="text-body-xl-medium text-enable relative px-[60px] py-4"
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
const currCategory = ref('')
const setCategory = (slug) => {
    currCategory.value = slug
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
        slug: 'tv_drama',
    },
    {
        title: '綜藝',
        slug: 'tv_show',
    },
])
</script>

<style lang="scss" scoped></style>
