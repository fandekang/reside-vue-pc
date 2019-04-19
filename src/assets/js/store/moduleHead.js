export default {
    state: {
        username: '',
        controlButton: [], // 搜索框选择项 type: Array
        selectControlButton: {}, // 搜索框初始值
        selRowDataJSON: {}, // 创建案件，选择的数据，包括(buyer, seller, room)
        createTaskStepTitle: '居住证办理一申请人',
        menuItemName: '正在办理',
    },
    mutations: {
        changeUsername(state, option) {
            state.username = option.username
        },
        changeControlButton(state, option) {
            state.controlButton = option.controlButton
        },
        changeSelectControlButton(state, option) {
            state.selectControlButton = option.selectControlButton
        },
        changeSelRow(state, option) {
            state.selRowDataJSON = option.selRowDataJSON
        },
        changeTaskStepTitle(state, option) {
            state.createTaskStepTitle = option.createTaskStepTitle
        },
        changeMenuItemName(state, option) {
            state.menuItemName = option.menuItemName
        }
    }
}
