<template>
    <div class="text-body-s flex-center container min-h-[80px]" id="footer-text">
        Copyright © 2024 Ning. All rights reserved.
    </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'

import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

const initGsap = () => {
    gsap.fromTo(
        '#footer-text',
        {
            opacity: 0,
            y: 100,
        },
        {
            duration: 0.5,
            opacity: 1,
            delay: 0.2,
            y: 0,
            scrollTrigger: '#footer-text',
        },
    )
}

onMounted(async () => {
    initGsap()

    // const observer = new IntersectionObserver((entries) => {
    //     console.log(entries)
    //     entries.forEach((entry) => {
    //         console.log(entry)
    //         if (entry.isIntersecting) {
    //             animate(entry.target)
    //             observer.unobserve(entry.target) // 動畫後停止監控
    //         }
    //     })
    // })
    // console.log(test.value)
    // observer.observe(test.value)

    // animatedElements.value.forEach((element) => {
    //     observer.observe(element)
    // })
})
</script>

<style lang="scss" scoped></style>
