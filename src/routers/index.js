import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login';
import Index from '../pages/Index';
import Page from '../pages/Page';
import UserList from '../pages/UserList';
import InfoDrug from '../pages/InfoDrug';
import RuleDrug from '../pages/RuleDrug';
import RuleDrugAudit from '../pages/RuleDrugAudit';
import SettingRole from '../pages/SettingRole';
import SettingRoom from '../pages/SettingRoom';
import SettingBasic from '../pages/SettingBasic';
import NoPage from '../pages/NoPage';
Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Login
        }, {
            path: '/login',
            name: 'login',
            component: Login
        }, {
            path: '/home',
            name: 'home',
            component: Index
        }, {
            path: '/page',
            name: 'page',
            components: {
              default:Page,
            },
            children: [
                {
                    path: 'user',
                    components: {
                    
                      default:UserList,
                    },
                }, {
                    path: 'info-drug',
                    components: {
                      default:InfoDrug,
                    },
                }, {
                    path: 'rule-drug',
                    components: {
                      default:RuleDrug,
                    },
                },  {
                    path: 'rule-audit',
                    components: {
                      default:RuleDrugAudit,
                    },
                }, {
                    path: 'setting',
                    components: {
                      default:SettingRole,
                    },
                }, {
                    path: 'setting-role',
                    components: {
                      default:SettingRole,
                    },
                }, {
                    path: 'setting-room',
                    components: {
                      default:SettingRoom,
                    },
                }, {
                    path: 'setting-basic',
                    components: {
                      default:SettingBasic,
                    },
                }
            ]
        }, {
            path: '*',
            name: 'no',
            component: NoPage
        }
    ]
})
export default router
