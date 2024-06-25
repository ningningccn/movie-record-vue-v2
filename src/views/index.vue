<template>
    <Category />
    <div class="container">
        <div class="text-body-l-semibold mt-[60px]">結果顯示: 第1-20個 (總共200個)</div>
        <main class="mt-10 flex space-x-5">
            <div class="min-w-[197px] max-w-[197px]">
                <div class="space-y-4">
                    <Sort />
                    <Filter />
                </div>
            </div>
            <div class="grid grid-cols-10 gap-5">
                <Card class="col-span-2" v-for="(item, index) in 6" :key="index" />
            </div>
            <!-- <div class="relative flex w-[calc(100%-197px-80px)] flex-wrap space-x-5">
                <div class="w-[20%]" v-for="(item, index) in 6">
                    <Card :key="index" />
                </div>
            </div> -->
        </main>
    </div>
</template>

<script setup>
import Category from '@/components/home/category.vue'
import Sort from '@/components/home/sort.vue'
import Filter from '@/components/home/filter.vue'
import Card from '@/components/card.vue'
</script>

<style scoped></style>
