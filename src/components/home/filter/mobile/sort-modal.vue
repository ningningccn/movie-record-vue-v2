<template>
    <VueFinalModal
        content-class="absolute bottom-0 w-full p-4 bg-card container rounded-t-[20px] pb-10"
        swipe-to-close="down"
        content-transition="vfm-slide-down"
        overlay-transition="vfm-fade"
    >
        <div class="container">
            <div class="text-heading-m flex items-center justify-center gap-x-2">
                <i class="icon-sort"></i>
                <p class="text-heading-s">排序</p>
            </div>
            <div>
                <button
                    type="button"
                    class="text-body-xl-medium flex items-center justify-between py-2 w-full"
                    v-for="item in data"
                    :key="item.slug"
                    @click="setOrder(item.slug)"
                >
                    <p>{{ item.title }}</p>
                    <i class="icon-check" v-if="item.slug == filterStore.currOrder"></i>
                </button>
            </div>
        </div>
    </VueFinalModal>
</template>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal'
import { useFilterStore } from '@/stores/filter.js'

const filterStore = useFilterStore()

const data = [
    { title: '最新加入', slug: 'desc' },
    { title: '最舊加入', slug: 'asc' },
]

const setOrder = (slug) => filterStore.setOrder(slug)

defineProps<{
    title?: string
}>()
</script>
