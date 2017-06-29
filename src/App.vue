<template>
  <div id="app">
  <div id="wrapper">
    <top-nav></top-nav>
    <router-view></router-view>
  </div>
    <page-footer></page-footer>
  </div>
</template>

<script>
import topNav from './components/topnav'
import pageFooter from './components/footer'
export default {
  name: 'app',
  components:{
    topNav,
    pageFooter
  }
}
</script>
<style type="text/css">
	@import './style/fonts/iconfont.css';
	@import './style/css/ishare.css';

</style>
<style lang="less">
@import "./style/less/style.less";

</style>
