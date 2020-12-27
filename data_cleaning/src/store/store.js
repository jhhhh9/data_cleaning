import Vue from 'vue'
// 导入Vuex
import Vuex from 'vuex'
Vue.use(Vuex)

// 需要引出
export const store = new Vuex.Store({
  // 严格模式，不可直接操作
  strict: true,
  // state相当于组件中的data，专门用于保存共享数据 this.$store访问
  state: {
    // 记录token
    token: window.sessionStorage.getItem("token") || "",
    // 用户信息
    mail: window.sessionStorage.getItem("mail")||"",
    password: window.sessionStorage.getItem("pwd")||"",
    count: 100,
    prolist: window.sessionStorage.getItem("prolist")||"",
    datalist: window.sessionStorage.getItem("datalist")||"",
    datacol: window.sessionStorage.getItem("datacol")||"",
    page: window.sessionStorage.getItem("page")||"",
    pagesize: window.sessionStorage.getItem("pagesize")||""
  },
  // 保存用于修改数据的方法，且可追踪
  mutations: {
    // 自动传了一个state
    userInfoFix(state, payload) {
      sessionStorage.setItem("mail", payload.mail)
      state.mail = payload.mail
      sessionStorage.setItem("pwd", payload.password)
      this.password = payload.password
    },
    //  赋值token
    tokenFix (state, token) {
      sessionStorage.setItem("token", token)
      state.token = token
    },
    prolistFix(state, prolist) {
      sessionStorage.setItem("prolist", prolist)
      state.prolist = prolist
    },
    datalistFix(state, datalist){
      // let datas = JSON.parse(JSON.stringify(datalist.tableData))
      let datas = JSON.stringify(datalist.tableData)
      // datas.forEach((item, idx) => {
      //   datas[idx] = JSON.parse(JSON.stringify(item))
      // });
      sessionStorage.setItem("datalist", datas)
      state.datalist = datas
      for (var key in datalist.tableColumns){
        datalist.tableColumns[key].flag = false
        console.log(datalist.tableColumns[key])
      }
      sessionStorage.setItem("datacol", JSON.stringify(datalist.tableColumns))
      state.datacol = JSON.stringify(datalist.tableColumns)
    },
    pageFix(state, value){
      sessionStorage.setItem("page", value)
      state.page = value
    },
    pagesizeFix(state, value){
      sessionStorage.setItem("pagesize", value)
      state.pagesize = value
    },
    colstaFix(state, value){
      let origin = JSON.parse(sessionStorage.getItem("datacol"))
      for (var key in origin) {
        if (origin[key].cloumnName === value) {
          origin[key].flag = !origin[key].flag
          break
        }
      }
      console.log(origin)
      sessionStorage.setItem("datacol", JSON.stringify(origin))
      state.datacol = JSON.stringify(origin)
    }
  },
  // 用于保存计算属性，计算属性：将计算结果缓存，只要数据没有发生变化，只发生一次，以后都使用缓存中数据
  // (也就是方法不会去执行，返回的结果已经缓存，直接读取缓存数据)
  getters: {
    // 也会自动传 state 用于加工
    dataListSize(state) {
      return JSON.parse(state.datalist).length
    },
    getMail(state){
      return state.mail
    },
    getToken(state){
      return state.token
    },
    getProList(state){
      return state.prolist
    },
    getDataList(state){
      let pagesize = state.pagesize
      let page = state.page
      let start = (page-1) * pagesize
      let end = page * pagesize
      let len = JSON.parse(state.datalist).length
      if (end > len) end = len
      console.log(start + " "+ end)
      return JSON.parse(state.datalist).slice(start, end)
    },
    getDataCol(state){
      return JSON.parse(state.datacol)
    }
  },
  // Actions类似于Mutations，提交的是mutations而不是变更当前状态，可以包含任意异步操作
  actions: {
    // dispatch 触发，还可传参,传参需要payload来接收
    add:(context, payload) => {
      setTimeout(function() {
        context.commit("add", payload)
      },3000)
    },
    updateuserinfo:(context, payload) => {
      context.commit("userInfoFix",payload)
    },
    updatetoken (context, value) {
      context.commit("tokenFix", value)
    },
    uploadProList (context, value) {
      context.commit("prolistFix", value)
    },
    updateDataList (context, value) {
      context.commit("datalistFix", value)
    },
    updataPage(context, value) {
      context.commit("pageFix", value)
    },
    updataPageSize(context, value) {
      context.commit("pagesizeFix", value)
    },
    updateColStatus(context, value) {
      context.commit("colstaFix", value)
    }
  }
})
