import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import UserList from '../components/UserList.vue'
import EditUser from '../components/EditUser.vue'
import DeleteUser from '../components/DeleteUser.vue'
import AddUser from '../components/AddUser.vue'

const routes: Array<RouteRecordRaw> = [
  { path: '/', component: UserList, name: 'UserList' },
  { path: '/edit/:id', component: EditUser, name: 'EditUser' },
  { path: '/delete/:id', component: DeleteUser, name: 'DeleteUser' },
  { path: '/add', component: AddUser, name: 'AddUser' }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
