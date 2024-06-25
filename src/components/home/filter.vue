<template>
    <div class="bg-card rounded-[8px]">
        <div class="flex items-center justify-between px-6 py-2" @click="isExpanded = !isExpanded">
            <div class="flex space-x-2">
                <i class="icon-filter text-[22px]"></i>
                <p>篩選</p>
            </div>
            <p>清除</p>
        </div>
        <Collapse :when="isExpanded">
            <div class="flex flex-col space-y-6 px-6 pb-4 pt-6">
                <Status />
                <Year />
                <Category />
                <Location />
            </div>
        </Collapse>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { Collapse } from 'vue-collapsed'
import Status from '@/components/home/filter/status.vue'
import Year from '@/components/home/filter/year.vue'
import Category from '@/components/home/filter/category.vue'
import Location from '@/components/home/filter/location.vue'

const isExpanded = ref(false)
</script>

<style scoped></style>
