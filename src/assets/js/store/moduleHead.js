export default {
    state: {
        username: '',
        loginShow: true,
        appShow: false,
        controlButton: [], // 搜索框选择项 type: Array
        selectControlButton: {}
    },
    mutations: {
        changeUsername(state, option) {
            state.username = option.username
        },
        toggleLoginShow(state, option) {
            state.loginShow = option.loginShow
        },
        toggleAppShow(state, option) {
            state.appShow = option.appShow
        },
        changeControlButton(state, option) {
            state.controlButton = option.controlButton
        },
        changeSelectControlButton(state, option) {
            state.selectControlButton = option.selectControlButton
        }
    }
}
