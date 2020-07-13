import Vue from 'vue'
import VueRouter from 'vue-router'
import {
    GodControl,
    AddRoles,
    HomePage,
    PlayerLogin,
    PlayerPage,
    Rank,
    Rules,
    RoomSettings,
    GameOver,
} from '../../pages'

Vue.use(VueRouter)

const routes = [
    {
        //首页
        path: '/',
        component: HomePage,
    },
    {
        //房间设置
        path: '/roomSettings',
        component: RoomSettings,
    },
    {
        //添加角色
        path: '/addRoles',
        component: AddRoles,
    },
    {
        //上帝房间状态控制
        path: '/godControl',
        name:'godControl',
        component: GodControl,
    },
    {
        //规则说明
        path: '/rules',
        component: Rules,
    },
    {
        //玩家登录
        path: '/playerLogin',
        component: PlayerLogin,
    },
    {
        //玩家个人信息页
        path: '/playerPage',
        component: PlayerPage,
    },
    {
        //游戏结束
        path: '/gameOver',
        component: GameOver,
    },
    {
        //排行榜
        path: '/rank',
        component: Rank,
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router