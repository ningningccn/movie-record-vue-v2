f
<template>
    <section class="mt-6 flex items-center gap-x-2">
        <button
            type="button"
            class="flex flex-1 items-center justify-center gap-x-2 rounded-[8px] bg-card py-3"
            @click="openSort()"
        >
            <i class="icon-sort text-[24px]"></i>
            <p class="text-body-xl-medium">排序</p>
        </button>
        <button
            type="button"
            class="flex flex-1 items-center justify-center gap-x-2 rounded-[8px] bg-card py-3"
            @click="openFilter()"
        >
            <i class="icon-filter text-[24px]"></i>
            <p class="text-body-xl-medium">篩選</p>
        </button>
    </section>
</template>

<script setup>
import { useModal } from 'vue-final-modal'
import SortModal from '@/components/home/filter/mobile/sort-modal.vue'
import FilterModal from '@/components/home/filter/mobile/filter-modal.vue'

const sortModal = useModal({
    component: SortModal,
    attrs: {},
})
const filterModal = useModal({
    component: FilterModal,
    attrs: {},
})

const openSort = () => {
    sortModal.open()
}
const openFilter = () => {
    filterModal.open()
}
</script>

<style scoped></style>
