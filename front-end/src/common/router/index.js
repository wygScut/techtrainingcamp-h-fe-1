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
        name: 'homepage',
        component: HomePage,
        meta: { index: 0 },
    },
    {
        //房间设置
        path: '/roomSettings',
        name: 'roomSettings',
        component: RoomSettings,
        meta: { index: 2 },
    },
    {
        //添加角色
        path: '/addRoles',
        name: 'addRoles',
        component: AddRoles,
        meta: { index: 3 },
    },
    {
        //上帝房间状态控制
        path: '/godControl',
        name:'godControl',
        component: GodControl,
        meta: { index: 4 },
    },
    {
        //规则说明
        path: '/rules',
        name: 'rules',
        component: Rules,
        meta: { index: 2 },
    },
    {
        //玩家登录
        path: '/playerLogin',
        name: 'playerLogin',
        component: PlayerLogin,
        meta: { index: 1 },
    },
    {
        //玩家个人信息页
        path: '/playerPage',
        name: 'playerPage',
        component: PlayerPage,
        meta: { index: 2 },
    },
    {
        //游戏结束
        path: '/gameOver',
        name: 'gameOver',
        component: GameOver,
        meta: { index: 3 },
    },
    {
        //排行榜
        path: '/rank',
        name: 'rank',
        component: Rank,
        meta: { index: 4 },
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router