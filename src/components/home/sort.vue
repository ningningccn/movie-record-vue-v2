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
                    class="text-body-m-medium text-left"
                    v-for="item in data"
                    :key="item.slug"
                >
                    {{ item.title }}
                </button>
                <!-- <button type="button" class="text-body-m-medium text-left">最新加入</button>
                <button type="button" class="text-body-m-medium text-left">最舊加入</button> -->
            </div>
        </Collapse>
        <div></div>
    </div>
    <!-- <button @click="isExpanded = !isExpanded">Trigger</button>

    <Collapse :when="isExpanded">
        <p>{{ 'Collapsed '.repeat(100) }}</p>
    </Collapse> -->
</template>

<script setup>
import { ref } from 'vue'
import { Collapse } from 'vue-collapsed'

const isExpanded = ref(false)

const data = [
    { title: '最新加入', slug: 'latest' },
    { title: '最舊加入', slug: 'old' },
]
</script>

<style lang="scss" scoped></style>
