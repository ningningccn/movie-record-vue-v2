<template>
    <div class="cursor-pointer rounded-[8px] bg-card">
        <div class="flex items-center justify-between px-6 py-2" @click="isExpanded = !isExpanded">
            <div class="flex space-x-2">
                <i class="icon-sort text-[22px]"></i>
                <p>排序</p>
            </div>
            <i
                class="icon-caret-down text-[20px] transition-transform duration-500"
                :class="{ 'rotate-180': isExpanded }"
            ></i>
        </div>
        <Collapse :when="isExpanded">
            <div class="flex flex-col space-y-6 p-6 pb-4">
                <button
                    type="button"
                    class="text-body-m-medium flex items-center justify-between text-left"
                    v-for="item in data"
                    :key="item.slug"
                    @click="setOrdering(item.slug)"
                >
                    <p>
                        {{ item.title }}
                    </p>
                    <i class="icon-check text-[20px]" v-if="item.slug == filterStore.currOrder"></i>
                </button>
            </div>
        </Collapse>
    </div>
</template>

<script setup>
import { useFilterStore } from '@/stores/filter.js'

import { ref } from 'vue'
import { Collapse } from 'vue-collapsed'

const filterStore = useFilterStore()
const isExpanded = ref(false)

const data = [
    { title: '最新加入', slug: 'desc' },
    { title: '最舊加入', slug: 'asc' },
]

const setOrdering = (slug) => {
    filterStore.setOrder(slug)
}
</script>

<style lang="scss" scoped></style>
