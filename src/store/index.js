import { createStore } from 'vuex'

const store = createStore({
    state() {
        return {
            count: 666
        }
    },
    // 数据更新的申请单
    mutations: {
        add(state) {
            state.count++
        }
    }
})

export default store