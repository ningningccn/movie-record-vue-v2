<template>
    <!-- <pre>
        {{ data }}
    </pre> -->

    <section>
        <div
            class="z-1 relative flex h-[375px] items-end md:flex md:h-full md:min-h-[500px] md:items-center"
        >
            <img
                :src="data?.background_image"
                alt=""
                class="absolute inset-0 size-full object-cover"
                v-if="data?.background_image"
            />
            <img
                :src="data?.postImageUrl"
                alt=""
                class="absolute inset-0 size-full object-cover"
                v-else
            />
            <div class="bg-overlay absolute bottom-0 left-0 h-full w-[100%]"></div>
            <div class="container relative z-10">
                <p class="text-heading-m">
                    {{ data?.name }}
                </p>
                <p class="text-heading-s mt-1">
                    {{ data?.original_name }}
                </p>
            </div>
        </div>
    </section>
    <section class="mb-20 mt-10 md:mt-20">
        <div class="container">
            <div class="relative z-10 w-full items-center justify-between md:flex">
                <div class="mx-auto w-full md:ml-0 md:w-[35%]"> 
                    <img :src="data?.postImageUrl" alt="" class="rounded-[8px]" />
                </div>

                <div class="w-full md:w-[55%]">
                    <div
                        class="text-body-s-medium mt-6 w-fit rounded-[4px] bg-primary px-1 py-[2px] text-second md:mt-0"
                        v-if="data?.watched"
                    >
                        已觀看
                    </div>
                    <div class="text-body-l mt-3 grid gap-y-2">
                        <p>上映年份: {{ data?.year }}</p>
                        <p>記錄日期: {{ data?.record_date }}</p>
                        <p v-if="data?.watched">觀看日期: {{ data?.watched_date }}</p>
                        <p>種類: {{ type }}</p>
                        <p>
                            分類:
                            <span v-for="item in data?.categoryList" :key="item"
                                >{{ item.label }},</span
                            >
                        </p>
                        <p>產地: {{ data?.country }}</p>
                    </div>
                    <div class="mt-6 flex items-center">
                        <div v-for="(item, index) in 5" :key="index">
                            <i class="icon-star-fill text-[24px]" v-if="item <= data?.mark"></i>
                            <i class="icon-star text-[24px]" v-if="item > data?.mark"></i>
                        </div>
                    </div>
                    <div class="mt-6 flex space-x-6 text-[32px]">
                        <button
                            @click="updateFav()"
                            class="transition-transform duration-200 hover:scale-125"
                        >
                            <i class="icon-heart-fill" v-if="data?.favorite"></i>
                            <i class="icon-heart" v-else></i>
                        </button>
                        <button
                            class="transition-transform duration-200 hover:scale-125"
                            @click="editData()"
                        >
                            <i class="icon-pencil-simple"></i>
                        </button>
                        <button
                            class="transition-transform duration-200 hover:scale-125"
                            @click="deleteData()"
                        >
                            <i class="icon-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useModal } from 'vue-final-modal'
import { searchMovieDetail } from '@/function/api'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getMovieDetail, editMovieDetail, deleteMovieDetail } from '@/function/api'

import editMovie from '@/components/list/edit-movie-modal.vue'

const route = useRoute()
const data = ref()
const params = ref({
    language: 'zh-TW',
})

const type = computed(() => {
    if (data.value?.type === 'movie') return '電影'
    if (data.value?.type === 'tv') return '電視劇'
    if (data.value?.type === 'show') return '綜藝'
})

// Modal config
const editMovieModal = useModal({
    component: editMovie,
    attrs: {
        updatedMovie: async () => {
            console.log('test')
            data.value = await getMovieDetail(route.params.id)
        },
    },
})

const updateFav = async () => {
    await editMovieDetail(route.params.id, { favorite: !data.value?.favorite })
    data.value = await getMovieDetail(route.params.id)
}

const editData = async () => {
    console.log(data.value)
    const { name, original_name, year, country, type, mark, watched, favorite, categoryList } =
        data.value
    editMovieModal.open()
    editMovieModal.patchOptions({
        attrs: {
            name,
            original_name,
            year,
            country,
            type,
            mark,
            watched,
            favorite,
            categoryList,
        },
    })
}

const deleteData = async () => {
    await deleteMovieDetail(route.params.id)
}

onMounted(async () => {
    data.value = await getMovieDetail(route.params.id)
})
</script>

<style scoped>
.bg-overlay {
    /* background: linear-gradient(0deg, #303132 30.27%, rgba(48, 49, 50, 0) 99.48%); */

    /* background: linear-gradient(89.55deg, #303132 42.27%, rgba(48, 49, 50, 0) 99.48%); */
    background: linear-gradient(89.55deg, #303132 0%, rgba(48, 49, 50, 0) 99.48%);
}
.bg-img {
    /* background-position: left calc(40vw) center; */
    background-repeat: no-repeat;
    background-size: cover;
}

@media (max-width: 768px) {
    .bg-overlay {
        background: linear-gradient(0deg, #303132 1%, rgba(48, 49, 50, 0) 99.48%);
    }
    .bg-img {
        background-position: left center;
        background-repeat: no-repeat;
        background-size: cover;
    }
}
</style>
