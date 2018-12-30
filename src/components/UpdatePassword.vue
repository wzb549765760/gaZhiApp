<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
	<div>
		<div class="forgetPwdMain" style="top: 0;">
			<div class="loginOrActivationParty forgetPwdParty">
				<div class="companyLogo" style="width: 100%;">
					<div class="rollBack" @click="$router.go(-1)"></div>
				</div>
				<div class="loginAndOther" style="margin-top: 30%;height: 70%;">
					<div class="loginPartyMain">
						<div class="loginInputMain">
							<div class="inputMain">
								<div class="tisi" id="oldPwdTittle">验证登录密码</div>
								<input type="password" data-tisi="验证登录密码" v-model="oldPwd" />
							</div>
						</div>
						<div class="loginInputMain">
							<div class="inputMain">
								<div class="tisi" id="newPwdTittle">新密码</div>
								<input type="password" data-tisi="新密码" v-model="newPwd" />
							</div>
						</div>
						<div class="loginInputMain">
							<div class="inputMain">
								<div class="tisi" id="reNewPwdTittle">确认密码</div>
								<input type="password" data-tisi="确认密码" v-model="reNewPwd" />
							</div>
						</div>
					</div>
					<div class="activationOtherMain">
						<div class="activationInto"><span @click="updateMobileSubmit()">修改密码</span></div>
					</div>
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
	import {
		hex_md5
	} from '../assets/js/base/md5.js' //注意路径
	export default {
		data() { //数据绑定
			return {
				"updateMobileContent": "获取验证码",
				"oldPwd": "",
				"reNewPwd": "",
				"newPwd": "",
				"updateMobileNum": 60,
				"updateMobileInterval": null,
				"token": getCookie("token"),
				"forgetFlag": true
			}
		},
		created() { //实例创建完成后执行的钩子

		},
		mounted() { //数据的初始化，整个实例中只执行一次
			this.init();
		},
		methods: { //执行的方法
			init() {
				$(".inputMain .tisi").click(function() {
					$(this).next().focus();
				});
				$(".inputMain input").focus(function() {
					$(this).css({
						"border-bottom": "1px solid white"
					})
					$(this).parent().find(".tisi").css({
						"height": "20px",
						"background": "none",
						"line-height": "20px",
						"text-indent": "0px"
					})
				});
				$(".inputMain input").blur(function() {
					var v = $(this).val();
					$(this).css({
						"border-bottom": "1px solid white"
					})
					if(v == null || v == "" || v == undefined) {
						$(this).parent().find(".tisi").css({
							"height": "50px",
							"background": "rgba(255, 255, 255, 0.2)",
							"line-height": "50px",
							"text-indent": "10px"
						});
						$(this).css({
							"border-bottom": "0px solid white"
						})
					}

				});
				$(".inputMain input").keyup(function() {
					var tisi = $(this).attr("data-tisi");
					$(this).parent().find(".tisi").html(tisi).css({
						"color": "#F2F2F2"
					});
				});
				$(".loginBottom").click(function() {
					$(".loginMain .main").css({
						"margin-left": "-100%"
					})
				});
				$(".activationBottom").click(function() {
					$(".loginMain .main").css({
						"margin-left": "0"
					})
				});
				$("#forgetPwd").click(function() {
					$(".forgetPwdMain").css({
						"top": "0px"
					});
				});
				$(".companyLogo .close").click(function() {
					$(".forgetPwdMain").css({
						"top": "100%"
					});
				});
			},
			async updateMobileSubmit() {
				var updateMobile = true;
				if(!checkVal(this.oldPwd)) {
					$("#oldPwdTittle").css({
						"color": "red"
					}).html("请输入原登录密码");
					updateMobile = false;
				}

				if(!checkVal(this.newPwd)) {
					$("#newPwdTittle").css({
						"color": "red"
					}).html("请输入新登录密码");
					updateMobile = false;
				}else{
					var length = checkPass(this.newPwd);
					if(length < 3) {
						$("#newPwdTittle").css({
							"color": "red"
						}).html("密码必须包含大小写字母和数字");
					}
				}

				if(!checkVal(this.reNewPwd)) {
					$("#reNewPwdTittle").css({
						"color": "red"
					}).html("请输入新登录密码");
					updateMobile = false;
				}

				if(!updateMobile) {
					return;
				} else {
					if(this.newPwd != this.reNewPwd) {
						$("#reNewPwdTittle").css({
							"color": "red"
						}).html("两次密码不一致");
						return;
					}
				}
				this.$layer.loading('修改中...');
				let data = await http.post('/userPwd', {
					token: this.token,
					oldPwd: this.oldPwd,
					pwd: hex_md5(this.newPwd)
				});
				if(data.code == "203"){
					this.$router.push('/Login');
				};
				this.$layer.close();
				if(data.code == 200) {
					this.$router.push('/MemberImf');
				} else {
					this.$layer.toast({
						icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
						content: "修改失败",
						time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
					});
				}
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='css'>
	@import "../assets/css/login.css";
</style>