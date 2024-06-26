<template>
    <div>test</div>
</template>

<script setup>
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'

const route = useRoute()
console.log(route)

</script>

<style lang="scss" scoped></style>
