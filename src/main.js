// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import VueResource from 'vue-resource'
import VueLazyload from 'vue-lazyload'
import 'bootstrap/dist/css/bootstrap.css'
import 'font-awesome/css/font-awesome.css'
import App from './App'
import home from './components/home'
import detail from './components/detail'
import tags from './components/tagsView'
import search from './components/searchView'
import uiFramework from './components/uiframeworkView'
import fwDetail from './components/frameworkdetail'
import Highlight from 'components/utils/highlight.js'


Vue.use(VueRouter)
Vue.use(VueResource)
Vue.use(Highlight)
Vue.use(VueLazyload)
Vue.config.devtools = true
Vue.config.productionTip = false
Vue.http.options.emulateJSON = true

const routes = [{
	path : '/',
	component : home
},{
	path : '/home',
	component : home
},{
	path : '/detail',
	component : detail
},{
	path : '/tags',
	component : tags
},{
	path : '/search',
	component : search
},{
	path : '/uiFramework',
	component : uiFramework
},{
	path : '/fwDetail',
	component : fwDetail
}];

const router = new VueRouter({
  routes
});

        		
new Vue({
  el: '#app',
  router,
  store,
  ...App,
})
