<template>
    <div class="relative">
        <img :src="data?.postImageUrl" alt="" class="rounded-[8px]" />
        <div class="absolute left-0 top-0">
            <div
                class="text-body-s-medium rounded-[4px] bg-primary px-1 py-[2px] text-second"
                v-if="data?.watched"
            >
                已觀看
            </div>
        </div>
        <div>
            <div class="mt-2 flex justify-between">
                <div class="text-body-m-medium">{{ data?.name }}</div>
                <i class="icon-heart-fill pt-1" v-if="data?.favorite"></i>
                <i class="icon-heart pt-1" v-else></i>
            </div>
            <div class="text-body-s-medium mt-1 flex justify-between text-enable">
                <div class="flex space-x-2">
                    <div>動漫</div>
                    <div>動漫</div>
                    <div>動漫</div>
                </div>
                <div>{{ data?.year }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    data: {
        type: Object,
    },
})
</script>

<style lang="scss" scoped></style>
