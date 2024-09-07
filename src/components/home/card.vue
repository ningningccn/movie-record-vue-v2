<template>
    <RouterLink :to="`/list/${props.data.id}`" class="relative cursor-pointer overflow-hidden">
        <div class="skeleton-card relative aspect-[3/4.3] overflow-hidden rounded-[8px]">
            <img
                v-lazy="data?.movie?.postImageUrl"
                alt=""
                class="absolute aspect-[3/4.3] size-full cursor-pointer object-cover"
            />
        </div>
        <div class="absolute left-0 top-0" id="card-watched-wrap">
            <div
                class="text-body-s-medium rounded-[4px] bg-primary px-1 py-[2px] text-second"
                v-if="data?.movie?.watched"
            >
                已觀看
            </div>
        </div>
        <div>
            <div class="mt-2 flex justify-between">
                <div class="text-body-m-medium">{{ data?.movie?.name }}</div>
                <i class="icon-heart-fill pt-1" v-if="data?.movie?.favorite"></i>
                <i class="icon-heart pt-1" v-else></i>
            </div>
            <div class="text-body-s-medium mt-1 flex justify-between text-enable">
                <div class="flex flex-wrap gap-x-2">
                    <div v-for="(item, index) in data?.movie?.categoryList" :key="item.slug">
                        <div class="flex items-center" v-if="index < 3">
                            {{ item.label }}
                            <span v-if="data?.movie?.categoryList.length > 3 && index == 2"
                                >...</span
                            >
                        </div>
                    </div>
                </div>
                <div>{{ year }}</div>
            </div>
        </div>
    </RouterLink>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import gsap from 'gsap'

const props = defineProps({
    data: {
        type: Object,
    },
})

const router = useRouter()
const isLoaded = ref(false)

const t1 = gsap.timeline()
const initGsap = () => {
    t1.fromTo(
        '#card-watched-wrap',
        {
            x: -200,
        },
        {
            x: 0,
            delay: 0.5,
        },
    )
}

const year = computed(() => props?.data?.movie?.year.slice(0, 4))

onMounted(async () => {
    await initGsap()
})
</script>

<style scoped></style>
