<template>
  <div>
    <header>
      <div class="dib" style="width: 200px;">单页后台应用Demo</div>
      <ul class="dib dib-wrap menu">
        <li v-for='(item, index) in menu' :key='index'>
          <router-link :to="item.link">{{item.label}}</router-link>
          </li>
      </ul>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
const menu = [{
  link: '/content',
  label: '内容管理'
},{
  link: '/interaction',
  label: '互动组件'
},{
  link: '/system',
  label: '系统管理'
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
body{
  margin: 0;
  padding: 0;
}
header{
  background: #a8f;
  color: #fff;
}
.fl {
  float: left;
}
.dib {
  display: inline-block;
}
.dib-wrap > *{
 display: inline-block;
}
.menu li{
  padding: 0.5em 1em;
}
</style>
