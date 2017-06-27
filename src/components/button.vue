<template>
	<button :type="type" :class="'md-btn btn-color ' + shape + ' ' + size + ' ' + inverseClass" :disabled="disabled" @click="ripple"><slot></slot></button>
</template>
<script>
	export default{
		props:{
			type:{
				type:String,
				default:'button'
			},
			shape:{
				type:String,
				default:''
			},
			disabled:{
				type:Boolean
			},
			inverse:{
				type:Boolean
			},
			size:{
				type:String,
				default:''
			}
		},
		mounted:function(){
			 	this.rippleLayer = document.createElement('span')
				this.rippleLayer.className = 'ripple'
				const btnWidth = window.getComputedStyle(this.$el).width
				const btnHeight = window.getComputedStyle(this.$el).height
				const maxlength = Math.max(btnWidth.substr(0,btnWidth.indexOf('px')), btnHeight.substr(0,btnHeight.indexOf('px')))
				if('btn-circle' === this.shape){
					this.$el.style.width = this.$el.style.height = maxlength + 'px'
				}
				this.rippleLayer.style.width = this.rippleLayer.style.height = maxlength + 'px'
				this.$el.appendChild(this.rippleLayer)
		},
		computed:{
			inverseClass(){
				return this.inverse?'btn-inverse':''
			}
			
			
		},
		methods:{
			ripple : function(event){
				var self = this
				const maxlength = this.rippleLayer.style.height.substr(0, this.rippleLayer.style.height.indexOf('px'))
				const x = event.pageX - this.$el.offsetLeft - maxlength/2,
				y = event.pageY - this.$el.offsetTop - maxlength/2
				this.rippleLayer.className  += ' ripple-active'
				this.rippleLayer.style.top = y + 'px'
				this.rippleLayer.style.left = x + 'px'
				setTimeout(() => {
					self.rippleLayer.className = 'ripple'
					this.$emit('oneclick')
				}, 300);
				this.$emit('btnClick');
			}
		}

	}
</script>
