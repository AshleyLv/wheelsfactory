<template>
	<div class="card">
	<router-link :to="{ path: 'detail', query: { id: cardObj.id }}" :title="cardObj.title">
					<div class="cover">
						
						  <img v-lazy="getBasePath() + '/api/readImage?image='+cardObj.cover">
					</div>
					<div class="card-info">
						<div class="title">{{cardObj.name}}</div>
						<p class="desc">{{cardObj.description}}</p>
					</div>
					<div class="footer">
						<img v-if="cardObj.type=='VUE'" src="../assets/vue.png" height="200" width="200">
						<img v-if="cardObj.type=='Angular'" src="../assets/angular.jpeg" height="363" width="363">
						<img v-if="cardObj.type=='jQuery'" src="../assets/jquery.jpg" height="300" width="300">
						<span class="pull-right"><i class="fa fa-heart"></i>{{cardObj.likeCounter}}</span><span class="pull-right"><i class="fa fa-eye"></i>{{cardObj.readCounter}}</span>
					</div>
					</router-link>
				</div>
</template>
<script>
import {basePath} from './utils/util.js'
	export default{
		name:'card',
		props:{
			cardObj: {
				type:Object
			}
		},
		 data(){
            return{

            }
        },
        methods:{
        	getBasePath(){
        		return basePath
        	}
        }
    }
</script>