import Layout from '@/layout'

export default {
  path: '/approvals',
  component: Layout,
  children: [
    {
      path: '',
      name: 'approvals',
      component: () => import('@/views/approvals/index'),
      meta: { title: '审查', icon: 'tree-table' }
    }
  ]
}
