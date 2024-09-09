import { defineStore } from 'pinia'
import { getAuth, onAuthStateChanged } from 'firebase/auth'

export const useGlobalStore = defineStore('global', {
    //定義狀態初始值
    state: () => ({
        user: {},
    }),
    //對狀態加工的 getters，如同 computed
    getters: {},
    //定義使用到的函式，可以為同步和非同步，如同 method
    actions: {
        setUserStatus(data) {
            this.user = data
        },
    },
})
