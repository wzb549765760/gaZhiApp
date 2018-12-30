<template>
	<div>
		<div class="gazhiAppMain">
			<header>
				<div class="contactsListTop">
					<div class="rollBack" @click="$router.go(-1)"></div>
					<div class="searchMain">
						<input placeholder="联系人" v-model="name"/>
					</div>
					<div class="searchInto" @click="init()"></div>
				</div>
			</header>
			<div class="contactsLists">
				<div class="contactsList" v-for="c in contactList" @click="toDetaile(c.id)">
					<div class="headLogo">
						<img :src="c.contactPhoto" v-if="c.contactPhoto != '' && c.contactPhoto != null" />
						<img src="../assets/img/memberlogo.png" v-if="c.contactPhoto == '' || c.contactPhoto == null" />
					</div>
					<div class="content">
						<div class="name">{{c.contactName}}</div>
						<div class="companyName">{{c.contactCompany}}</div>
					</div>
					<div class="visitType accessApplication" v-if="c.visitStatus ==1">来访申请</div>
					<div class="visitType accessApplication" v-if="c.visitStatus ==2" style="color: #869DF8;">访问中</div>
					<div class="visitType accessApplication" v-if="c.visitStatus ==3">已访问</div>
					<div class="visitType accessApplication" v-if="c.visitStatus ==4" style="color: #CCCCCC;">拒绝访问</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {
		goBlank,
		checkValByExp,
		checkVal,
		checkPass,
		setCookie,
		getCookie,
		delCookie
	} from '../assets/js/base/reg.js' //注意路径
	import http from '../assets/js/base/http.js'
	export default {
		data() { //数据绑定
			return {
				"token": getCookie("token"),
				"contactList": "",
				"visitList": "",
				"name":""
			}
		},
		created() { //实例创建完成后执行的钩子

		},
		mounted() { //数据的初始化，整个实例中只执行一次
			this.init();
		},
		methods: { //执行的方法
			toDetaile(id, isContact) {
				this.$router.push({
					path: "/ContactsDetail",
					query: {
						"id": id
					}
				})
			},
			async init() {
				this.$layer.loading('加载中...');
				let data = await http.get('/contactList', {
					token: this.token,
					name:this.name
				});
				if(data.code == "203") {
					this.$router.push('/Login');
				};
				this.contactList = data.contactList;
				this.$layer.close();
				this.visitList = data.visitList;
			}
		}
	}
</script>
<style scoped lang='css'>
	@import "../assets/css/contactsList.css";
</style>