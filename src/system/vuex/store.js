import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
    state:{
        action:'add',
        id:0,
        hbtnText:'新增用户',
        lbtnText:'立即创建',
        resetbtn:true
    },
    mutations:{
        setParam (state,obj){
            state.action=obj.action
            state.hbtnText=obj.hbtnText
            state.id=obj.id
            state.lbtnText=obj.lbtnText
            state.resetbtn=obj.resetbtn
        }
    }
})
export default store