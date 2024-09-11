<template>
    <div class="relative overflow-hidden" @click="goSearchDetailPage()">
        <div class="skeleton-card relative aspect-[3/4.3] overflow-hidden rounded-[8px]">
            <img
                v-lazy="imgUrl"
                alt=""
                class="absolute aspect-[3/4.3] size-full cursor-pointer object-cover"
            />
        </div>
        <div class="absolute left-0 top-0" id="card-watched-wrap">
            <div
                class="text-body-s-medium rounded-[4px] bg-primary px-1 py-[2px] text-second"
                v-if="isAdded"
            >
                已加入
            </div>
        </div>
        <div>
            <div class="mt-2 flex justify-between">
                <div class="text-body-m-medium">{{ title }}</div>
                <i class="icon-heart pt-1"></i>
            </div>
            <div class="text-body-s-medium mt-1 flex justify-between text-enable">
                <div class="flex space-x-2">
                    {{ type }}
                </div>
                <div>{{ date }}</div>
            </div>
        </div>
        {{ isAdded }}
    </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'
import { useFilterStore } from '@/stores/filter.js'
import gsap from 'gsap'

const filterStore = useFilterStore()
const emit = defineEmits(['getDataId'])
const props = defineProps({
    id: {
        type: Number,
    },
    title: {
        type: String,
        default: '',
    },
    year: {
        type: String,
    },
    poster: {
        type: String,
    },
    date: {
        type: String,
    },
    mediaType: {
        type: String,
    },
})

const isAdded = computed(() => filterStore.nameLists.some((name) => name === props.title))

const imgUrl = computed(() => {
    return props.poster ? `https://image.tmdb.org/t/p/w500${props.poster}` : ''
})
const type = computed(() => (props.mediaType == 'tv' ? '電視劇' : '電影'))
const router = useRouter()

const goSearchDetailPage = () => {
    router.push({
        name: 'searched',
        params: {
            mediaType: props.mediaType,
            mediaID: props.id,
        },
    })
}

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
onMounted(async () => {
    await initGsap()
})
</script>

<style scoped></style>
