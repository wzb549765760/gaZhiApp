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
								<div class="tisi" id="cardNumTittle">身份证后四位</div>
								<input data-tisi="身份证后四位" v-model="cardNum" />
							</div>
						</div>
						<div class="loginInputMain">
							<div class="inputMain">
								<div class="tisi" id="newMobileTittle">新手机号码</div>
								<input data-tisi="新手机号码" v-model="newMobile" />
							</div>
						</div>
						<div class="loginInputMain">
							<div class="inputMain">
								<div class="tisi" id="codeTittle">验证码</div>
								<input data-tisi="验证码" v-model="code" />
								<div class="getCode" @click="updateMobileGetCode()">{{updateMobileContent}}</div>
							</div>
						</div>
					</div>
					<div class="activationOtherMain">
						<div class="activationInto"><span @click="updateMobileSubmit()">修改手机号码</span></div>
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
	export default {
		data() { //数据绑定
			return {
				"updateMobileContent": "获取验证码",
				"cardNum": "",
				"code": "",
				"newMobile": "",
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
				if(!checkVal(this.cardNum)) {
					$("#cardNumTittle").css({
						"color": "red"
					}).html("身份证后四位不能为空");
					updateMobile = false;
				}
				if(!checkValByExp(this.cardNum, "digitOrEnglish")) {
					$("#cardNumTittle").css({
						"color": "red"
					}).html("身份证后四位格式不正确");
					updateMobile = false;
				}
				if(!checkVal(this.newMobile)) {
					$("#newMobileTittle").css({
						"color": "red"
					}).html("新手机号不能为空");
					updateMobile = false;
				} else {
					if(!checkValByExp(this.newMobile, "mobile")) {
						$("#newMobileTittle").css({
							"color": "red"
						}).html("新手机号码格式不正确");
						updateMobile = false;
					}
				}
				if(!checkVal(this.code)) {
					$("#codeTittle").css({
						"color": "red"
					}).html("验证码不能为空");
					updateMobile = false;
				}
				if(!updateMobile) {
					return;
				}
				this.$layer.loading('修改中...');
				let data = await http.post('/modifyMobile', {
					token: this.token,
					carNo: this.cardNum,
					phone: this.newMobile,
					verifyCode:this.code
				});
				if(data.code == "203") {
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
			},
			async updateMobileGetCode() {
				/*if(!checkVal(this.newMobile)) {
					$("#newMobileTittle").css({
						"color": "red"
					}).html("新手机号码不能为空");
					return
				}
				if(!checkValByExp(this.newMobile, "mobile")) {
					$("#newMobileTittle").css({
						"color": "red"
					}).html("新手机号码格式不正确");
					return;
				}*/
				let thisForget = this;
				if(!thisForget.forgetFlag) {
					return;
				}
				let params = {
					token: this.token
				}
				let data = await http.post('/sendSmsCode', params);
				if(data.code == 203) {
					this.$layer.toast({
						icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
						content: data.error,
						time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
					});
				} else if(data.code == 200) {
					thisForget.forgetFlag = false;
					thisForget.updateMobileContent = thisForget.updateMobileNum + "秒后重新获取"
					thisForget.updateMobileInterval = setInterval(function() {
						thisForget.updateMobileNum = thisForget.updateMobileNum - 1;
						thisForget.updateMobileContent = thisForget.updateMobileNum + "秒后重新获取"
						if(thisForget.updateMobileNum == 0) {
							clearInterval(thisForget.updateMobileInterval);
							thisForget.updateMobileContent = "重新获取";
							thisForget.updateMobileNum = 60;
							thisForget.forgetFlag = true;
						}
					}, 1000);
				} else {
					this.$layer.toast({
						icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
						content: "获取失败",
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