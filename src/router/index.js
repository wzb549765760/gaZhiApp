import Vue from 'vue'
import Router from 'vue-router'
/*登录页*/
import Login from '@/components/Login'
/*会员中心*/
import MemberCenter from '@/components/MemberCenter'
/*会员信息*/
import MemberImf from '@/components/MemberImf'
/*考勤统计*/
import AttendanceStatistics from '@/components/AttendanceStatistics'
/*考勤打卡*/
import CardAttendance from '@/components/CardAttendance'
/*考勤日历*/
import CardAttendanceTime from '@/components/CardAttendanceTime'
/*联系人列表*/
import ContactsList from '@/components/ContactsList'
/*联系人詳情*/
import ContactsDetail from '@/components/ContactsDetail'
/*园区停车*/
import ParkSpaceAdd from '@/components/ParkSpaceAdd'
/*交易记录*/
import TransactionRecord from '@/components/TransactionRecord'
/*修改手机号*/
import UpdateMobile from '@/components/UpdateMobile'
/*修改密码*/
import UpdatePassword from '@/components/UpdatePassword'
/*园区福利*/
import ParkWelfare from '@/components/ParkWelfare'
/*园区福利*/
import DomeTest from '@/components/DomeTest'


Vue.use(Router)

export default new Router({
	mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/MemberCenter',
      name: 'MemberCenter',
      component: MemberCenter,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/ParkWelfare',
      name: 'ParkWelfare',
      component: ParkWelfare,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/MemberImf',
      name: 'MemberImf',
      component: MemberImf,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/AttendanceStatistics',
      name: 'AttendanceStatistics',
      component: AttendanceStatistics,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/CardAttendance',
      name: 'CardAttendance',
      component: CardAttendance,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/CardAttendanceTime',
      name: 'CardAttendanceTime',
      component: CardAttendanceTime,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/ContactsList',
      name: 'ContactsList',
      component: ContactsList,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/ContactsDetail',
      name: 'ContactsDetail',
      component: ContactsDetail,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/ParkSpaceAdd',
      name: 'ParkSpaceAdd',
      component: ParkSpaceAdd,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/TransactionRecord',
      name: 'TransactionRecord',
      component: TransactionRecord,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/UpdateMobile',
      name: 'UpdateMobile',
      component: UpdateMobile,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/UpdatePassword',
      name: 'UpdatePassword',
      component: UpdatePassword,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/DomeTest',
      name: 'DomeTest',
      component: DomeTest,
      meta: {
        keepAlive: true
      }
    }
  ]
})
