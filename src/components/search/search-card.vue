<template>
    <div class="relative overflow-hidden" @click="goSearchDetailPage()">
        <div class="skeleton-card relative aspect-[3/4.3] overflow-hidden rounded-[8px]">
            <img
                v-lazy="imgUrl"
                alt=""
                class="absolute aspect-[3/4.3] size-full cursor-pointer object-cover"
            />
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
    </div>
</template>

<script setup>
import { computed, ref } from 'vue'
import { RouterLink, RouterView, useRouter, useRoute } from 'vue-router'

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
</script>

<style scoped></style>
