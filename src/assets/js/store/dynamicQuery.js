export default {
    state: {
        conditionQueryVisible: false
    },
    mutations: {
        toggleConditionQueryVisible(state, option) {
            state.conditionQueryVisible = option.conditionQueryVisible
        }
    }
}