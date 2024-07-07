<template>
    <a :href="`/movie/${props.data.id}`" class="relative cursor-pointer">
        <div class="">
            <img
                :src="data?.movie?.postImageUrl"
                alt=""
                class="aspect-[3/4.3] rounded-[8px] object-cover"
            />
        </div>
        <div class="absolute left-0 top-0">
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
                <i class="icon-heart-fill pt-1 text-black" v-if="data?.movie?.favorite"></i>
                <i class="icon-heart pt-1" v-else></i>
            </div>
            <div class="text-body-s-medium mt-1 flex justify-between text-enable">
                <div class="flex space-x-2">
                    <div>動漫</div>
                    <div>動漫</div>
                    <div>動漫</div>
                </div>
                <div>{{ data?.movie?.year }}</div>
            </div>
        </div>
    </a>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
    data: {
        type: Object,
    },
})
</script>

<style lang="scss" scoped></style>
