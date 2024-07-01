<template>
    <Category />
    <div class="container">
        <div class="text-body-l-semibold mt-[60px]">結果顯示: 第1-20個 (總共200個)</div>
        <main class="mt-10 flex md:space-x-5">
            <div class="hidden min-w-[197px] max-w-[197px] md:block">
                <div class="space-y-4">
                    <Sort />
                    <Filter />
                </div>
            </div>
            <div class="grid grid-cols-4 gap-5 md:grid-cols-6 lg:grid-cols-6 xl:grid-cols-10">
                <Card class="col-span-2" v-for="(item, index) in 12" :key="index" />
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
import { getMovieList } from '@/function/api'

const test = async () => {
    const a = await getMovieList()
    console.log(a)
}

// getMovieList()
test()
</script>

<style scoped></style>
