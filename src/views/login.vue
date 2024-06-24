<template>
    <div class="bg">
        <div class="container z-10">
            <div
                class="main-wrap mx-auto h-[708px] w-[34%] rounded-b-[50px] border-x border-b border-[#FFFFFF33] bg-[#0080ff99]"
            >
                <div class="mx-auto w-[55%] pt-[184px]">
                    <img src="/images/register-logo.png" alt="" />
                </div>
                <div class="px-20">
                    <div class="text-heading-s mt-[104px] text-center">用戶登入</div>
                    <div class="mt-8">
                        <input
                            type="text"
                            class="h-[38px] w-full border-b-[1px] bg-transparent text-white placeholder:text-[#737373] focus:outline-none"
                            placeholder="帳戶名稱/電郵"
                        />
                        <input
                            type="text"
                            class="mt-6 h-[38px] w-full border-b-[1px] bg-transparent text-white placeholder:text-[#737373] focus:outline-none"
                            placeholder="密碼"
                        />
                    </div>
                    <div></div>
                    <button
                        class="text-body-l-semibold mt-8 w-full rounded-[8px] border border-disable py-2"
                    >
                        登入
                    </button>

                    <div class="text-body-s mt-8 text-center">
                        還未有帳戶?立即<a href="" class="text-primary underline">註冊</a>
                    </div>
                </div>
            </div>
        </div>
        <!-- <img
            src="/public/images/register-bg.png"
            alt=""
            class="absolute left-0 top-0 z-0 size-full"
        /> -->
    </div>
</template>

<script setup></script>

<style scoped>
.bg {
    background-image: url('images/register-bg.png');
    @apply bg-cover;
    height: 100%;
}
.main-wrap {
    background: linear-gradient(0deg, rgba(48, 49, 50, 0.6), rgba(48, 49, 50, 0.6)),
        linear-gradient(308.46deg, rgba(0, 0, 0, 0.3) 0.66%, rgba(0, 0, 0, 0) 81.73%);
}
</style>
