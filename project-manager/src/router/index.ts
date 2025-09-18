import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      redirect: { name: 'projects' },
      component: () => import('@/modules/projects/layouts/ProjectsLayout.vue'),
      children: [
        {
          path: 'projects',
          name: 'projects',
          component: () => import('@/modules/projects/views/ProjectsView.vue')
        },
        {
          path: 'projects/:id',
          props: true,
          name: 'single-project',
          component: () =>
            import('@/modules/projects/views/SingleProjectView.vue')
        }
      ]
    }
  ]
});

export default router;
