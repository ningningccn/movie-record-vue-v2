<template>
    <div class="flex items-center justify-between">
        <div class="flex grow-0 items-center">
            <i class="icon-file-arrow-ip text-[24px]"></i>
            <div class="relative ml-2" @click="previewIn()">
                {{ fileName }}
                <div class="absolute left-0 top-0" v-show="isPreview">
                    <img :src="showImg" alt="" />
                </div>
            </div>
        </div>
        <label class="grow-1 cursor-pointer">
            <p v-if="!showImg" class="text-primary">選擇圖片</p>
            <p v-else class="text-primary">更換圖片</p>
            <input type="file" accept="image/*" class="hidden" @change="handleFile" />
        </label>
    </div>
</template>
<script setup>
import { ref } from 'vue'

const file = ref(null)
const fileName = ref('上傳海報')
const showImg = ref('')
const isPreview = ref(false)

const handleFile = (e) => {
    file.value = e.target.files[0]
    fileName.value = e.target.files[0].name

    const reader = new FileReader()
    reader.readAsDataURL(file.value)

    reader.onload = (e) => {
        showImg.value = e.target.result

        let image = new Image()
        image.src = e.target.result
        image.onload = () => {
            const width = image.width
            const height = image.height

            if (width > height) {
                alert('圖片比例不對')
                showImg.value = ''
                return
            }
            if (width < 420 && height < 500) {
                showImg.value = ''
                alert('圖片尺寸沒有420 * 500 ')
            }
        }
    }
}

const previewIn = () => {
    isPreview.value = true
}
</script>

<style lang="scss" scoped></style>
