import { createWebHashHistory,createRouter } from "vue-router";

const routes=[
    {
        path:'/',
        name:'home',
        component:()=>import('@/page/home/home.vue') 
    },//首页
    {
        path:'/goodsDetails',
        name:'goodsDetails',
        component:()=>import('@/page/goodsDetails/index.vue') 
    },//商品详情页
    {
        path:'/complaintPage',
        name:'complaintPage',
        component:()=>import('@/page/complaintPage/index.vue') 
    }//商品详情页
]
const router = createRouter({
    history:createWebHashHistory(),
    routes
})
export default router