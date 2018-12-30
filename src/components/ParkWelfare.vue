<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
	<div>
		<div class="gazhiAppMain">
			<header>
				<div class="contactsListTop">
					<div class="rollBack" @click="toBack()"></div>
					<div class="searchMain">园区福利</div>
				</div>
			</header>
			
			<!--<div class="transactionRecodeMain">
				<div class="transactionRecodeChart"
					
				</div>
			</div>-->
		</div>
		<div class="timeLists">
			<div class="timeList" style="line-height: 150px;">
				<img src="../assets/img/timeFitst.png" width="60%"/>
			</div>
			<div class="timeList" style="line-height: 200px;">
				<img src="../assets/img/timeSecend.png" width="100%"/>
			</div>
			<div class="timeList" style="line-height: 250px;">
				<img src="../assets/img/timeThid.png" width="60%"/>
			</div>
		</div>
		<div class="welfareMain">
			<div class="welfares">
				<div class="headLogo">
					<img src="../assets/img/welfareList.png" width="100%" height="100%"/>
				</div>
				<div class="content">
					<div class="key">12月份个人交通补贴</div>
					<div class="value">01-01  09:07</div>
				</div>
				<div class="money">+400.00</div>
			</div>
			<div class="welfares">
				<div class="headLogo">
					<img src="../assets/img/welfareList.png" width="100%" height="100%"/>
				</div>
				<div class="content">
					<div class="key">12月份个人交通补贴</div>
					<div class="value">01-01  09:07</div>
				</div>
				<div class="money">+400.00</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() { //数据绑定
			return {
			}
		},
		created() { //实例创建完成后执行的钩子

		},
		mounted() { //数据的初始化，整个实例中只执行一次
		},
		methods: { //执行的方法
			toBack() {
				this.$router.go(-1);
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='css'>
	@import "../assets/css/transationRecord.css";
</style>