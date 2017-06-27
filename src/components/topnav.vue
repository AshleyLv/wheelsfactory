<template>
<nav class="main-nav">
    <h1>
      <a href="#" class="logo main-nav-button md-button">
       <img src="../assets/logo.png" height="34" width="168">
    </a>
  </h1>
 <button class="main-nav-button l-right md-button nav-btn" @click="toggleNav"> 
    <i class="fa fa-navicon"></i>
  </button>
  <ul v-show="!isDropdownMeun || isShowMenu">
    <li class="l-left">
      <router-link :to="{ path: 'home', query: { filter: 'all' }}" class="main-nav-button md-button">首页</router-link>
    </li>
    <li class="l-left">
       <router-link :to="{ path: 'home', query: { filter: 'vue' }}" class="main-nav-button md-button">Vue组件</router-link>
    </li>
    <li class="l-left">
      <router-link :to="{ path: 'home', query: { filter: 'angular' }}" class="main-nav-button md-button"> Angular插件</router-link>
    </li>
    <li class="l-left">
      <router-link :to="{ path: 'home', query: { filter: 'jquery' }}" class="main-nav-button md-button"> jQuery插件</router-link>
    </li>
    <li class="l-left">
      <router-link :to="{ path: 'uiFramework'}" class="main-nav-button md-button"> UI框架</router-link>
    </li>
    <li class="l-left">
      <router-link :to="{ path: 'tags'}" class="main-nav-button md-button"> Tags</router-link>
    </li>
      <!-- <li class="l-right">
        <form class="search-form">
        <div class="input-group">
          <input type="text" class="form-control" placeholder="Search" autocomplete="off" v-model="keyword">
          <span class="input-group-btn">
            <a class="search-btn" @click="search" @keyup.13="search">
              <i class="fa fa-search"></i>
            </a>
          </span>
        </div>
      </form>
      </li> -->
      
    </ul>
  </nav>

</template>
<script>
	export default{
    data(){
      return{
        isShowMenu:false,
        keyword:'',

      }
    },
    computed:{
      isDropdownMeun(){
        return window.screen.width<=1025
      },
      keyword(){
        return this.$store.state.keyword 
      }
    },
    methods:{
      toggleNav : function(){
        this.isShowMenu=!this.isShowMenu
      },
      search: function(){
        if(this.keyword){
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
 }
</script>
