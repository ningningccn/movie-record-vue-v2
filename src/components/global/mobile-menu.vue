<template>
    <VueFinalModal
        modal-id="mobile-menu"
        content-class="absolute bottom-0 w-[70%] h-dvh right-0 p-4 bg-second "
        content-transition="vfm-slide-right"
        overlay-transition="vfm-fade"
    >
        <div class="text-heading-m flex h-full flex-col justify-between">
            <div class="flex flex-col gap-y-4">
                <div class="flex justify-end">
                    <button type="button" class="">
                        <i class="icon-close text-[24px]" @click="vfm.close('mobile-menu')"></i>
                    </button>
                </div>
                <button type="button" class="flex items-center gap-x-2" @click="clickAddRecord()">
                    <i class="icon-plus-square"></i>
                    添加
                </button>

                <routerLink
                    to="/search"
                    class="flex items-center gap-x-2"
                    @click="vfm.close('mobile-menu')"
                >
                    <i class="icon-search"></i>
                    搜尋
                </routerLink>
            </div>
            <button
                type="button"
                class="flex w-full items-center justify-center gap-x-2 rounded-lg border border-primary text-primary"
                @click="clickLogout()"
            >
                <i class="icon-sign-in"></i>
                登出
            </button>
        </div>
    </VueFinalModal>
</template>
<script setup lang="ts">
import { VueFinalModal, useVfm } from 'vue-final-modal'
const vfm = useVfm()
const props = defineProps({
    clickAddRecord: {
        type: Function,
    },
    clickLogout: {
        type: Function,
    },
})
</script>
