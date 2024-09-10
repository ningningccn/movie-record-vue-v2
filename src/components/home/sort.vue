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
                    :key="item.key"
                    @click="setOrdering(item.key, item.slug, item.filterWord)"
                >
                    <p>
                        {{ item.title }}
                    </p>
                    <i class="icon-check text-[20px]" v-if="item.key == filterStore.currKey"></i>
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
    { title: '最新加入', key: 'latest_addition', slug: 'desc', filterWord: 'createAt' },
    { title: '最舊加入', key: 'oldest_addition', slug: 'asc', filterWord: 'createAt' },
    { title: '最新年份', key: 'latest_year', slug: 'desc', filterWord: 'year' },
    { title: '最舊年份', key: 'oldest_year', slug: 'asc', filterWord: 'year' },
]

const setOrdering = (key, slug, filterWord) => {
    filterStore.setOrder({ key, slug, filterWord })
}
</script>

<style lang="scss" scoped></style>
