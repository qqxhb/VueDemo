<template>
  <el-row>
    <el-col :span="4" style="background-color: #def; min-height: calc(100vh - 69px);">
      <ul class="menu">
        <li v-for='(item, index) in menu' :key='index'>
          <router-link :to="item.link">{{item.label}}</router-link>
        </li>
      </ul>
    </el-col>
    <el-col :span="20">
      <router-view></router-view>
    </el-col>
  </el-row>
</template>
<script>
const menu = [{
  link: '/system/menu',
  label: '菜单管理'
}, {
  link: '/system/role',
  label: '角色管理'
}, {
  link: '/system/user',
  label: '用户管理'
}]
export default {
  name: 'app',
  data() {
    return {
      menu: menu
    }
  }
}
</script>
<style>
.menu li{
  padding: 0.5em 1em;
}
</style>
