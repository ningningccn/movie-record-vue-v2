<template>
    <Category @selected="setType" />
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
                <Card
                    :data="item"
                    class="col-span-2"
                    v-for="(item, index) in movieList"
                    :key="index"
                />
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
import { ref } from 'vue'
import { getMovieListApi } from '@/function/api'

const movieList = ref([])

const getMovieList = async (slugType) => {
    const dataDoc = await getMovieListApi(slugType)
    dataDoc.forEach((doc) => {
        movieList.value.push(doc.data())
    })
}

getMovieList()

// 根據選擇的過濾選項應用過濾邏輯，例如從Firestore獲取數據
// const db = this.$root.$options.provides.db
// const collectionRef = db.collection('your_collection')

// if (this.selectedOption === '全部') {
//     // 獲取所有數據
//     collectionRef.get().then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//             console.log(doc.data())
//         })
//     })
// } else {
//     // 根據選擇的過濾選項進行過濾
//     collectionRef
//         .where('category', '==', this.selectedOption)
//         .get()
//         .then((querySnapshot) => {
//             querySnapshot.forEach((doc) => {
//                 console.log(doc.data())
//             })
//         })
// }
const setType = (slug) => {
    movieList.value = []
    getMovieList(slug)
    console.log(slug)
}
</script>

<style scoped></style>
