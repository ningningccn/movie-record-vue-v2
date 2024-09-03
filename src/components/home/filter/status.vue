<template>
    <div>
        <div
            class="flex cursor-pointer items-center justify-between"
            @click="isExpanded = !isExpanded"
        >
            <p>狀態</p>
            <i
                class="icon-caret-down text-[20px] transition-transform duration-500"
                :class="{ 'rotate-180': isExpanded }"
            ></i>
        </div>
        <Collapse :when="isExpanded">
            <div class="flex flex-col space-y-3 pt-3">
                <div v-for="(item, index) in dataList" :key="index" class="">
                    <Checkbox
                        :title="item.title"
                        :slug="item.slug"
                        :disabled="checkStatus(item.slug)"
                        @selected="setStatus"
                        ref="statusRef"
                    />
                    <!-- :disabled="true" -->
                </div>
            </div>
        </Collapse>
    </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { Collapse } from 'vue-collapsed'
import Checkbox from '@/components/ui/checkbox.vue'

const emit = defineEmits(['currStatusLists'])
const props = defineProps({
    isAllExpanded: {
        type: Boolean,
    },
})

const dataList = [
    { title: '最愛', slug: 'favorite' },
    { title: '已觀看', slug: 'watched' },
    { title: '待觀看', slug: 'to_be_watching' },
]

const isExpanded = ref(true)
const currStatusLists = reactive([])

const statusRef = ref()

const checkStatus = (slug) => {
    if (currStatusLists.includes('watched') && slug == 'to_be_watching') {
        return true
    }
    if (currStatusLists.includes('to_be_watching') && slug == 'watched') {
        return true
    }
    return false
}

const setStatus = (data) => {
    if (data == 'clear') {
        currStatusLists.length = 0
    } else {
        const index = currStatusLists.indexOf(data.slug)

        if (index !== -1) {
            currStatusLists.splice(index, 1)
        } else {
            currStatusLists.push(data.slug)
        }
        emit('currStatusLists', currStatusLists)
    }
}

const clearAllCheckbox = () => {
    statusRef.value.forEach((item) => {
        item.clearCheckbox()
    })
}

defineExpose({ clearAllCheckbox })
</script>

<style lang="scss" scoped></style>
