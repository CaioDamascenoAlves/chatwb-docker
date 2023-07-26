import { createRouter, createWebHistory } from 'vue-router';
import WebSocketPage from '../views/WebSocketPage.vue';

const routes = [
  {
    path: '/',
    name: 'WebSocketPage',
    component: WebSocketPage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
