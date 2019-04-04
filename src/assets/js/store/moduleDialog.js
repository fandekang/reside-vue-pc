export default {
    state: {
        createTaskDialogVisible: false
    },
    mutations: {
        toggleCreateTaskDialog(state, option) {
            state.createTaskDialogVisible = option.createTaskDialogVisible
        }
    }
}
