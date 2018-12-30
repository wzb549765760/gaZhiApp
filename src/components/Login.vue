<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
	<div>
		<div class="loginMain">
			<div class="companyLogo"></div>
			<div class="main">
				<div class="loginOrActivationParty loginParty">
					<div class="loginAndOther">
						<div class="loginPartyMain">
							<div class="loginInputMain">
								<div class="inputMain">
									<div class="tisi" id="loginMobileTittle">手机号码</div>
									<input v-model="loginMobile"  type="text" data-tisi="手机号码" />
								</div>
							</div>
							<div class="loginInputMain">
								<div class="inputMain">
									<div class="tisi" id="loginPwdTittle">登录密码</div>
									<input v-model="loginPwd" type="password" data-tisi="登录密码" />
								</div>
							</div>
						</div>
						<div class="loginOtherMain">
							<div class="forgetPwd">
								<span id="forgetPwd">忘记密码?</span>
							</div>
							<div class="loginInto"></div>
						</div>
					</div>
					<div class="loginBottom"></div>
					<div class="centerPoint" id="loginPointer">
						<div class="line">
							<span @click="loginClick()">登录</span>
						</div>
					</div>
				</div>
				<div class="loginOrActivationParty activationParty">
					<div class="loginAndOther">
						<div class="loginPartyMain">
							<div class="loginInputMain">
								<div class="inputMain">
									<div class="tisi" id="registerMobileTittle">手机号码</div>
									<input data-tisi="手机号码" type="text" v-model="registerMobile" />
								</div>
							</div>
							<div class="loginInputMain">
								<div class="inputMain">
									<div class="tisi" id="registerCodeTittle">验证码</div>
									<input data-tisi="验证码" v-model="registerCode" />
									<div class="getCode" @click="registerGetCode()">{{registerContent}}</div>
								</div>
							</div>
							<div class="loginInputMain">
								<div class="inputMain">
									<div class="tisi" id="registerPwdTittle">设置密码</div>
									<input type="password" data-tisi="设置密码" v-model="registerPwd" />
								</div>
							</div>
							<div class="loginInputMain">
								<div class="inputMain">
									<div class="tisi" id="registerRePwdTittle">确认密码</div>
									<input type="password" data-tisi="确认密码" v-model="registerRePwd" />
								</div>
							</div>
						</div>
						<div class="activationOtherMain">
							<div class="activationInto">
								<span @click="registerSubmit()"></span>
							</div>

						</div>
					</div>
					<div class="activationBottom">
						<span></span>
					</div>
					<div class="centerPointRegister" id="registerPointer">
						<div class="line">
							<span @click="activityClick()">激活账号</span>
						</div>
					</div>
					
				</div>
			</div>
			<div class="conpanyName" id="conpanyName">到了园区服务平台</div>
		</div>
		<div class="forgetPwdMain">
			<div class="loginOrActivationParty forgetPwdParty">
				<div class="companyLogo" style="width: 100%;">
					<div class="close">X</div>
				</div>
				<div class="loginAndOther" style="margin-top: 30%;height: 70%;">
					<div class="loginPartyMain">
						<div class="loginInputMain">
							<div class="inputMain">
								<div class="tisi" id="forgetMobileTittle">手机号码</div>
								<input data-tisi="手机号码" type="text" v-model="forgetMobile" />
							</div>
						</div>
						<div class="loginInputMain">
							<div class="inputMain">
								<div class="tisi" id="forgetCodeTittle">验证码</div>
								<input data-tisi="验证码" v-model="forgetCode" />
								<div class="getCode" @click="forgetPwdGetCode()">{{forgetContent}}</div>
							</div>
						</div>
						<div class="loginInputMain">
							<div class="inputMain">
								<div class="tisi" id="forgetPwdTittle">重置密码</div>
								<input type="password" v-model="forgetPwd" data-tisi="重置密码" />
							</div>
						</div>
						<div class="loginInputMain">
							<div class="inputMain">
								<div class="tisi" id="forgetRePwdTittle">确认密码</div>
								<input type="password" v-model="forgetRePwd" data-tisi="确认密码" />
							</div>
						</div>
					</div>
					<div class="activationOtherMain">
						<div class="activationInto"><span @click="forgetPwdSubmit()">重置密码</span></div>
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
		setCookie30,
		delCookie
	} from '../assets/js/base/reg.js' //注意路径
	import {
		hex_md5
	} from '../assets/js/base/md5.js' //注意路径
	import http from '../assets/js/base/http.js'

	export default {
		data() { //数据绑定
			return {
				"loginMobile": "",
				"loginPwd": "",
				"registerContent": "获取验证码",
				"registerNum": 60,
				"forgetTimeOut": null,
				"registerInterval": null,
				"registerFlag": true,
				"forgetContent": "获取验证码",
				"forgetNum": 60,
				"forgetInterval": null,
				"forgetFlag": true,
				"registerMobile": "",
				"registerCode": "",
				"registerPwd": "",
				"registerRePwd": "",
				"forgetMobile": "",
				"forgetCode": "",
				"forgetPwd": "",
				"forgetRePwd": ""
			}
		},
		created() { //实例创建完成后执行的钩子
			let _this = this;
		},
		mounted() { //数据的初始化，整个实例中只执行一次
			this.init();
			/*_this.$layer.loading('加载中...');
			setTimeout(function(){
                _this.$layer.close();
            },3000);*/
			/*this.$layer.toast({
				icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
				content: '提示文字',
				time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
			})*/
			var loginAccount = getCookie("loginAccount");
			var loginPwd = getCookie("loginPwd");
			if(loginAccount != null && loginAccount != "" && loginAccount != undefined) {
				this.loginMobile = loginAccount;
				$("#loginMobileTittle").css({
					"height": "20px",
					"background": "none",
					"line-height": "20px",
					"text-indent": "0px"
				})
				$("#loginMobileTittle").next().css({
					"border-bottom": "1px solid white"
				});
			}
			if(loginPwd != null && loginPwd != "" && loginPwd != undefined) {
				this.loginPwd = loginPwd;
				$("#loginPwdTittle").css({
					"height": "20px",
					"background": "none",
					"line-height": "20px",
					"text-indent": "0px"
				});
				$("#loginPwdTittle").next().css({
					"border-bottom": "1px solid white"
				});
			}
		},
		methods: { //执行的方法
			init() {
				var windowH = $(window).height() / 2;
				$(".loginMain").height($(window).height());
				var windowW = $(window).width();
				var h = $(".loginInto").height() / 2;
				var top = $('.loginInto').offset().top;
				var h1 = $(".activationInto").height() / 2;
				var top1 = $('.activationInto').offset().left;
				$("#loginPointer .line").css({
					"height": (top - windowH + h + 15) + "px"
				});
				$("#registerPointer .line").css({
					"height": ((windowW - 50) / 2 + 82) + "px"
				});
				$(".inputMain .tisi").click(function() {
					$(this).next().focus();
				});
				$(".inputMain input").focus(function() {
					$("#conpanyName").hide();
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
					$("#conpanyName").show();
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
				$(".activationBottom").click(function() {
					$(".loginBottom").show();
					$(".activationBottom").hide();
					$(".loginMain .main").css({
						"margin-left": "-100%"
					});
					$(".loginMain .companyLogo,.conpanyName").css({
						"left": "50px"
					});

					var windowW = $(window).width();
					var windowH = $(window).height() / 2;
					var lineH = ($(window).width() - 50) / 2 + 50 + 32;
					var top1 = $('.activationInto').offset().left;
					$("#registerPointer .line").css({
						"height": (top1 - windowH + h + 15) + "px"
					});
					$("#loginPointer .line").css({
						"height": lineH + "px"
					});
					$("#loginPointer .line span").css({
						"font-size": "12px"
					});
					$("#registerPointer").css("transform", "rotate(0deg)");
					$("#registerPointer .line span").css({
						"font-size": "28px"
					});
					$("#registerPointer .line span").css("transform", "rotate(0deg)");
					$("#loginPointer").css("transform", "rotate(-90deg)");

				});
				$(".loginBottom").click(function() {
					$(".loginBottom").hide();
					$(".activationBottom").show();
					$(".loginMain .main").css({
						"margin-left": "0"
					});
					$(".loginMain .companyLogo,.conpanyName").css({
						"left": "0px"
					});
					var windowH = $(window).height() / 2;
					var windowW = $(window).width();
					var h = $(".loginInto").height() / 2;
					var top = $('.loginInto').offset().top;
					var top1 = $('.activationInto').offset().top;
					$("#loginPointer .line").css({
						"height": (top - windowH + h + 15) + "px"
					});
					$("#loginPointer .line span").css({
						"font-size": "28px"
					});
					$("#registerPointer .line span").css({
						"font-size": "12px"
					});
					$("#registerPointer").css("transform", "rotate(90deg)");
					$("#registerPointer .line span").css("transform", "rotate(-180deg)");

					$("#loginPointer").css("transform", "rotate(0deg)");
					$("#registerPointer .line").css({
						"height": ((windowW - 50) / 2 + 82) + "px"
					});
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
			activityClick() {
				var type = $(".loginMain .companyLogo").css("left");
				if(type != "0px") {
					this.registerSubmit();
				} else {
					$(".activationBottom").click();
				}
			},
			loginClick() {
				var type = $(".loginMain .companyLogo").css("left");
				if(type == "0px") {
					this.loginSubmit();
				} else {
					$(".loginBottom").click();
				}
			},
			async loginSubmit() {
				var loginFlag = true;
				if(!checkVal(this.loginMobile)) {
					loginFlag = false;
					$("#loginMobileTittle").css({
						"color": "red"
					}).html("请输入手机号码");
				}

				if(!checkVal(this.loginPwd)) {
					loginFlag = false;
					$("#loginPwdTittle").css({
						"color": "red"
					}).html("请输入登录密码")
				}
				if(!loginFlag) return;
				let params = {
					phone: this.loginMobile,
					pwd: hex_md5(this.loginPwd)
				}

				try {
					this.$layer.loading('登录中...');
					let data = await http.post('/login', params);
					this.$layer.close();
					if(data.code == 406) {
						this.$layer.toast({
							icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
							content: '请激活账号',
							time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
						});
					} else if(data.code == 200) {
						this.toSetCookie(data.token);
						this.$router.push('/MemberCenter');
						setCookie30("loginAccount", this.loginMobile);
						setCookie30("loginPwd", this.loginPwd);
					} else if(data.code == 203) {
						this.$layer.toast({
							icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
							content: data.error,
							time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
						});
					} else {
						this.$layer.toast({
							icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
							content: '登录失败',
							time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
						});
					}
				} catch(err) {
					this.$layer.toast({
						icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
						content: "登录失败",
						time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
					});
				}

			},
			async forgetPwdGetCode() {
				if(!checkVal(this.forgetMobile)) {
					$("#forgetMobileTittle").css({
						"color": "red"
					}).html("请输入手机号码");
					return
				}
				if(!checkValByExp(this.forgetMobile, "mobile")) {
					$("#forgetMobileTittle").css({
						"color": "red"
					}).html("手机号码格式不正确");
					return;
				}
				let params = {
					phone: this.forgetMobile
				}
				let thisForget = this;
				if(!thisForget.forgetFlag) {
					return;
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
					thisForget.forgetContent = thisForget.forgetNum + "秒后重新获取"
					thisForget.forgetInterval = setInterval(function() {
						thisForget.forgetNum = thisForget.forgetNum - 1;
						thisForget.forgetContent = thisForget.forgetNum + "秒后重新获取"
						if(thisForget.forgetNum == 0) {
							clearInterval(thisForget.forgetInterval);
							thisForget.forgetContent = "重新获取";
							thisForget.forgetNum = 60;
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

			},
			async registerGetCode() {
				if(!checkVal(this.registerMobile)) {
					$("#registerMobileTittle").css({
						"color": "red"
					}).html("请输入手机号码");
					return
				}
				if(!checkValByExp(this.registerMobile, "mobile")) {
					$("#registerMobileTittle").css({
						"color": "red"
					}).html("手机号码格式不正确");
					return;
				}
				let thisRegister = this;
				if(!thisRegister.registerFlag) {
					return;
				}
				let params = {
					phone: this.registerMobile
				}
				let data = await http.post('/sendSmsCode', params);
				if(data.code == 203) {
					this.$layer.toast({
						icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
						content: data.error,
						time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
					});
				} else if(data.code == 504) {
					this.$layer.toast({
						icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
						content: data.respInfo,
						time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
					});
				} else if(data.code == 200) {
					thisRegister.registerFlag = false;
					thisRegister.registerContent = thisRegister.registerNum + "秒后重新获取"
					thisRegister.registerInterval = setInterval(function() {
						thisRegister.registerNum = thisRegister.registerNum - 1;
						thisRegister.registerContent = thisRegister.registerNum + "秒后重新获取"
						if(thisRegister.registerNum == 0) {
							clearInterval(thisRegister.registerInterval);
							thisRegister.registerContent = "重新获取";
							thisRegister.registerNum = 60;
							thisRegister.registerFlag = true;
						}
					}, 1000);
				} else {
					this.$layer.toast({
						icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
						content: "获取失败",
						time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
					});
				}

			},
			async registerSubmit() {
				var registerFlag = true;
				if(!checkVal(this.registerMobile)) {
					registerFlag = false;
					$("#registerMobileTittle").css({
						"color": "red"
					}).html("请输入手机号码");
				} else {
					if(!checkValByExp(this.registerMobile, "mobile")) {
						$("#registerMobileTittle").css({
							"color": "red"
						}).html("手机号码格式不正确");
						registerFlag = false;
					}
				}
				if(!checkVal(this.registerCode)) {
					registerFlag = false;
					$("#registerCodeTittle").css({
						"color": "red"
					}).html("请输入验证码");
				}
				if(!checkVal(this.registerPwd)) {
					registerFlag = false;
					$("#registerPwdTittle").css({
						"color": "red"
					}).html("请输入密码");
				} else {
					var length = checkPass(this.registerPwd);
					if(length < 3) {
						registerFlag = false;
						$("#registerPwdTittle").css({
							"color": "red"
						}).html("密码必须包含大小写字母和数字");
					}
				}
				if(!checkVal(this.registerRePwd)) {
					registerFlag = false;
					$("#registerRePwdTittle").css({
						"color": "red"
					}).html("请输入密码");
				} else {
					if(this.registerRePwd != this.registerPwd) {
						registerFlag = false;
						$("#registerRePwdTittle").css({
							"color": "red"
						}).html("两次密码不一致");
					}
				}
				if(!registerFlag) {
					return;
				}
				let params = {
					phone: this.registerMobile,
					verifyCode: this.registerCode,
					pwd: hex_md5(this.registerPwd),
					verifyCode: this.registerCode
				}
				this.$layer.loading('激活中...');
				let data = await http.post('/activate', params);
				this.$layer.close();
				if(data.code == 203) {
					this.$layer.toast({
						icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
						content: data.error,
						time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
					});
				} else if(data.code == 200) {
					this.toSetCookie(data.token);
					this.$router.push('/MemberCenter');
				} else {
					this.$layer.toast({
						icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
						content: "激活失败",
						time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
					});
				}
			},
			async forgetPwdSubmit() {
				var forgetFlag = true;
				if(!checkVal(this.forgetMobile)) {
					forgetFlag = false;
					$("#forgetMobileTittle").css({
						"color": "red"
					}).html("请输入手机号码");
				}
				if(!checkVal(this.forgetCode)) {
					forgetFlag = false;
					$("#forgetCodeTittle").css({
						"color": "red"
					}).html("请输入验证码");
				}
				if(!checkVal(this.forgetPwd)) {
					forgetFlag = false;
					$("#forgetPwdTittle").css({
						"color": "red"
					}).html("请输入密码");
				} else {
					var length = checkPass(this.forgetPwd);
					if(length < 3) {
						$("#forgetPwdTittle").css({
							"color": "red"
						}).html("密码必须包含大小写字母和数字");
					}
				}

				if(!checkVal(this.forgetRePwd)) {
					forgetFlag = false;
					$("#forgetRePwdTittle").css({
						"color": "red"
					}).html("请输入密码");
				}else if(this.forgetPwd != this.forgetRePwd){
					forgetFlag = false;
					$("#forgetRePwdTittle").css({
						"color": "red"
					}).html("两次密码不一致");
				}
				if(!forgetFlag) {
					return;
				}
				let params = {
					phone: this.forgetMobile,
					verifyCode: this.forgetCode,
					pwd: hex_md5(this.forgetRePwd),
					verifyCode: this.forgetCode
				}
				try {
					this.$layer.loading('找回密码中...');
					let data = await http.post('/activate', params);
					this.$layer.close();
					if(data.code == 406) {
						this.$layer.toast({
							icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
							content: "请激活账号",
							time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
						});
					} else if(data.code == 504) {
						this.$layer.toast({
							icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
							content: data.respInfo,
							time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
						});
					} else if(data.code == 200) {
						this.toSetCookie(data.token);
						this.$router.push('/MemberCenter');
					} else {
						this.$layer.toast({
							icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
							content: "失败",
							time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
						});
					}
				} catch(err) {
					this.$layer.toast({
						icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
						content: "失败",
						time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
					});
				}
			},
			toSetCookie(token) {
				setCookie("token", token);
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='css'>
	@import "../assets/css/login.css";
</style>