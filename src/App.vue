<template>
    <!-- <HeaderA />
    <Category /> -->

    <!-- <Header /> -->
    <!-- <div class="fixed top-0 h-[120px]">header</div>
    <div class="main">
        <main>main</main>
        <div>footer</div>
    </div> -->
    <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Header from '@/components/the-header.vue'
import HeaderA from '@/components/the-header-2.vue'
import Category from '@/components/home/category.vue'
</script>

<style scoped>
/* .main {
    height: 100svh;
    display: flex;
    flex-direction: column;
    padding-top: 120px;
} */
/* main {
    display: flex;
    flex-grow: 1;
    justify-content: center;
    position: relative;
    z-index: 2;
} */
</style>
