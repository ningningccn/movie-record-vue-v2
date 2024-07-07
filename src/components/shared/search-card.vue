<template>
    <div class="relative rounded-[8px]" @click="goSearchDetailPage()">
        <div class="overflow-hidden rounded-[8px]">
            <img
                :src="imgUrl"
                alt=""
                class="aspect-[3/4.3] cursor-pointer object-cover transition-transform duration-500 hover:scale-110"
            />
        </div>
        <div class="absolute left-0 top-0">
            <!-- <div class="text-body-s-medium rounded-[4px] bg-primary px-1 py-[2px] text-second">
                已觀看
            </div> -->
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
import { computed } from 'vue'
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

const getSearchID = () => {
    // emit('getDataId', {
    //     id: props.id,
    //     media_type: props.mediaType,
    // })
}

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

<style lang="scss" scoped></style>
