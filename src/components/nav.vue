<template>
  <div class="page-header">
    <div class="page-header-top">
      <div class="container">
        <div class="page-logo">
          <a href="#" id="logo">
            <img src="../assets/logo.png" height="40" width="200">
          </a>
        </div>
        <a @click="showMenu" class="menu-toggler"><i class="fa fa-bars"></i></a>
      </div>
    </div>
    <div  v-show="!isDropdownMeun || isShowMenu" class="page-header-menu">
      <div class="container">
       <form class="search-form">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search" name="query" v-model="keyword">
          <span class="input-group-btn">
            <a class="search-btn" @click="search" @keyup.13="search">
              <i class="fa fa-search"></i>
            </a>
          </span>
        </div>
      </form>
      <div class="hor-menu">
        <ul class="nav navbar-nav">
        <li class="menu-dropdown classic-menu-dropdown active">
             <router-link :to="{ path: 'home'}">首页</router-link>
          </li>
          <li class="menu-dropdown classic-menu-dropdown active">
             <router-link :to="{ path: 'home', query: { filter: 'vue' }}">Vue组件</router-link>
          </li>
          <li class="menu-dropdown classic-menu-dropdown">
            <router-link :to="{ path: 'home', query: { filter: 'angular' }}"> Angular插件</router-link>
          </li>
          <li class="menu-dropdown classic-menu-dropdown">
            <router-link :to="{ path: 'home', query: { filter: 'jquery' }}"> jQuery插件</router-link>
          </li>
          <li class="menu-dropdown classic-menu-dropdown">
            <router-link :to="{ path: 'uiFramework'}"> UI框架</router-link>
          </li>
          <li class="menu-dropdown classic-menu-dropdown">
          <router-link :to="{ path: 'tags'}"> Tags</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</div>

</template>
<script>
	export default{
    data(){
      return{
        isShowMenu:false,
        keyword:''
      }
    },
    computed:{
      isDropdownMeun(){
        return window.screen.width<=992
      },
      keyword(){
        return this.$store.state.keyword 
      }
    },
    methods:{
      showMenu : function(){
        this.isShowMenu=!this.isShowMenu
      },
      search: function(){
        this.$store.dispatch('search')
        this.$store.state.keyword = this.keyword
        this.keyword=''
        this.$store.state.isSearch=true
              this.$router.push({
                path: '/search',
                query: {
                  searchtype: 'bySearch'
                }
              })

      }
    }
  }
</script>
