const app = {
    state: {
        switchValue: '3d'
    },
    mutations: {
        SET_SWITCH: (state, value)=>{
            state.switchValue = value
        }
    },
    actions: {
        ChangeValue( { commit }, value){
            return new Promise( (resolve, reject)=>{
                //'''''
            })
        }
    }
}

export default app