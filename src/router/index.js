import Vue from 'vue';
import VueRouter from 'vue-router';

import Login from '@/views/Login.vue';
import Dashboard from '@/views/Dashboard.vue';
import TaiwanList from '@/views/TaiwanList.vue';
import History from '@/views/History.vue';
import Immediate from '@/views/Immediate.vue';
import Flow from '@/views/Flow.vue';
import Position from '@/views/Position.vue';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      component: Dashboard,
      children: [
        {
          name: 'taiwanList',
          path: '',
          component: TaiwanList,
        },
        {
          name: 'history',
          path: '/history',
          component: History,
        },
        {
          name: 'immediate',
          path: '/immediate',
          component: Immediate,
        },
        {
          name: 'flow',
          path: '/flow',
          component: Flow,
        },
        {
          name: 'position',
          path: '/position',
          component: Position,
        },
      ],
    },
    {
      name: 'loginPage',
      path: '/login',
      component: Login,
    },
  ],
});
