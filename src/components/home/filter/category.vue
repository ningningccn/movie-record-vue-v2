<template>
    <div>
        <div class="flex items-center justify-between" @click="isExpanded = !isExpanded">
            <p>類別</p>
            <i
                class="icon-caret-down text-[20px] transition-transform duration-500"
                :class="{ 'rotate-180': isExpanded }"
            ></i>
        </div>
        <Collapse :when="isExpanded">
            <div class="flex flex-col space-y-3 pt-3">
                <div v-for="(item, index) in dataList" :key="index" class="">
                    <Checkbox :title="item.title" :slug="item.slug" @selected="setStatus" />
                </div>
            </div>
        </Collapse>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Collapse } from 'vue-collapsed'
import Checkbox from '@/components/ui/checkbox.vue'

const dataList = [
    { title: '動漫', slug: 'favorite' },
    { title: '犯罪', slug: 'watched' },
    { title: '劇情', slug: 'to_be_watching' },
]

const isExpanded = ref(false)

const setStatus = (data) => {}
</script>

<style lang="scss" scoped></style>
