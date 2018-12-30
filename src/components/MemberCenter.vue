<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
	<div>
		<div class="gazhiAppMain">
			<header>
				<div class="memberTop back" v-show="!recode">
					{{data.companyName}}
					<div class="scanCode" @click="getQrCodeSao()"></div>
				</div>
				<div class="memberTop" v-show="recode">
					身份识别
					<div class="close" @click="closeErweima()"></div>
				</div>
			</header>
			<div class="memberCenterMain">
				<div class="cardMain">
					<div class="cardSet">
						<div class="setLogo" @click="$router.push('/MemberImf')" v-show="!recode"></div>
					</div>
					<div class="memLogo">
						<div class="memHead">
							<img src="../assets/img/memberlogo.png" />
						</div>
						<div class="memImf">
							<span class="tittle">{{data.name}}</span>
							<span class="occupation">{{data.placeName}}</span>
						</div>
					</div>
					<div class="departmentAndMoney">
						<div class="department">{{data.deptName}}</div>
						<div class="money">
							<span class="key">账户金额</span>
							<span class="value">&nbsp;&nbsp;¥{{data.balance/100}}</span>
						</div>
					</div>
				</div>
				<div class="menuMain">
					<div class="menuList" @click="$router.push('/CardAttendance')">
						<div class="img boderLeft">
							<img src="../assets/img/kaoqindaka.png" />
						</div>
						<div class="menuName">考勤打卡</div>
					</div>
					<div class="menuList" @click="$router.push('/ContactsList')">
						<div class="img boderLeft">
							<img src="../assets/img/lianxiren.png" />
						</div>
						<div class="menuName">联系人</div>
					</div>
					<div class="menuList" @click="$router.push('/ParkSpaceAdd')">
						<div class="img">
							<img src="../assets/img/yuanqutingche.png" />
						</div>
						<div class="menuName">园区停车</div>
					</div>
					<div class="menuList" @click="$router.push('/TransactionRecord')">
						<div class="img boderLeft">
							<img src="../assets/img/jiaoyijilu.png" />
						</div>
						<div class="menuName">交易记录</div>
					</div>
					<!--<div class="menuList" @click="toApply()">
						<div class="img boderLeft">
							<img src="../assets/img/shenqingxinyongka.png" />
						</div>
						<div class="menuName">申请信用卡</div>
					</div>-->
					<div class="menuList" @click="$router.push('/ParkWelfare')">
						<div class="img boderLeft">
							<img src="../assets/img/shenqingxinyongka.png" />
						</div>
						<div class="menuName">园区福利</div>
					</div>
					<div class="menuList" @click="huankuan()">
						<div class="img">
							<img src="../assets/img/huankuan.png" />
						</div>
						<div class="menuName">还款管家</div>
					</div>
				</div>
				<div class="erweima" @click="showImgCode()"></div>
				<div class="erweimaMain" style="display: none;">
					<i></i>
					<div class="img">
						<canvas id="canvas"></canvas>
					</div>
				</div>
			</div>

		</div>
	</div>
</template>
<script>
	var QRCode = require('qrcode');
	var getQrCodeCallBackFun = null;
	var getLocationCallBackFun = null;
	var token = "";
	let self = "";
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
				"recode": false,
				"token": getCookie("token"),
				"data": ""
			}
		},
		created() { //实例创建完成后执行的钩子

		},
		mounted() { //数据的初始化，整个实例中只执行一次
			token = this.token;
			this.init();
			self = this;
			self.websocket();
			this.showErWeiMa(this.token);
		},
		methods: { //执行的方法
			websocket() {
				
				if("WebSocket" in window) {
					// 打开一个 web socket
					self.websocket = new WebSocket("ws://163.53.90.117:8180/app/websocket");
					self.websocket.onopen = function() {
						var json = "{type:'01',token:'"+token+"'}";
						// Web Socket 已连接上，使用 send() 方法发送数据
						self.websocket.send(json);
					};
					self.websocket.onmessage = function(evt) {
						self.token = evt.data;
						setCookie("token",evt.data);
						self.showErWeiMa(self.token);
					};
					self.websocket.onclose = function() {
						
					};
				} else {
					// 浏览器不支持 WebSocket
					alert("您的浏览器不支持 WebSocket!");
				}
			},
			closeWebSocket() {
        		this.websocket.close();
      		},
			async init() {
				if(this.token == "" || this.token == null || this.token == undefined) {
					this.$router.push('/Login');
				}
				this.$layer.loading('加载中...');
				let data = await http.get('/userInfo', {
					token: this.token
				});
				if(data.code == "203") {
					this.$router.push('/Login');
				}
				this.$layer.close();
				if(data.photo != "" && data.photo != null && data.photo != undefined) {
					$(".memHead img").attr("src", data.photo);
					$(".memHead img").width($(".memHead img").height());
				}
				this.data = data;
				this.GLOBAL.memberImf = data;

			},
			toApply() {
				window.location.href = "http://www.omlife.com.cn/xinbox/toApplyCredit_inst?operCode=00028gazhi_mp&orgno=00028&platform=gazhi_mp&sign=3E0569CAEB08D03B6CCDAD9FD4FD9534";
			},
			huankuan() {
				this.$layer.toast({
					icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
					content: "敬请期待",
					time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
				});
			},
			async getQrCodeSao() {
				let getQrCodeSaoThis = this;
				if(/(Android)/i.test(navigator.userAgent)) {
					window.android.getQrCode();
					getQrCodeCallBackFun = setInterval(function() {
						if(getQrCodeCallBackVal != null && getQrCodeCallBackVal != "" && getQrCodeCallBackVal != undefined) {
							getQrCodeSaoThis.intoImf(getQrCodeCallBackVal);
							clearInterval(getQrCodeCallBackFun);
						}
					}, 100);
				} else if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					var params = {}
					JKEventHandler.newCallNativeFunction('sweepQRCode', params, 'sweepQRCodeBackId',
						function(data) {
							getQrCodeSaoThis.intoImf(data);
						},
						function(data) {
							getQrCodeSaoThis.$layer.toast({
								icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
								content: "失败",
								time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
							});
						});
				}

			},
			async intoImf(val) {
				clearInterval(getQrCodeCallBackFun);
				this.$router.push({
					path: "/ContactsDetail",
					query: {
						"qrcode": val
					}
				})
			},
			useqrcode(val) {
				var canvas = document.getElementById('canvas')
				QRCode.toCanvas(canvas, val, function(error) {
					if(error) console.error(error)
					$("#canvas").css({
						"width": "100%",
						"height": "auto"
					})
				})
			},
			showErWeiMa(t) {
				let selfMethod = this;
				if(/(Android)/i.test(navigator.userAgent)) {
					window.android.getLocation(t);
					getLocationCallBackFun = setInterval(function() {
						if(getLocationCallBackVal != null && getLocationCallBackVal != "" && getLocationCallBackVal != undefined) {
							selfMethod.useqrcode(getLocationCallBackVal);
							clearInterval(getLocationCallBackFun);
						}
					}, 100);
				} else if(/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
					var params = {
						"token": t
					}
					JKEventHandler.newCallNativeFunction('getQRCode', params, 'getQRCodeBackId',
						function(data) {
							selfMethod.useqrcode(data);
						},
						function(data) {
							selfMethod.$layer.toast({
								icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
								content: "失败",
								time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
							});
						});
				}

			},
			showImgCode() {
				$(".departmentAndMoney .money").css({
					"opacity": "0"
				});
				var w = $(".memLogo .memHead").width() + 70;
				$(".departmentAndMoney .department").css({
					"margin-left": w + "px",
					"justify-content": "initial",
					"margin-top": "-5%"
				});
				$(".erweimaMain").show();
				setTimeout(function() {
					$(".erweimaMain").css({
						"top": "34.3%",
						"height": "65%"
					})
					$(".erweima").hide();
				}, 10);
				this.recode = true;
			},
			closeErweima() {
				$(".departmentAndMoney .money").css({
					"opacity": "1"
				});
				$(".departmentAndMoney .department").css({
					"margin-left": "0px",
					"justify-content": "center",
					"margin-top": "0px"
				});
				$(".erweimaMain").css({
					"top": "100%",
					"height": "60%"
				});
				$(".erweima").show();
				setTimeout(function() {
					$(".erweimaMain").hide();
				}, 500);
				this.recode = false;
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='css'>
	@import "../assets/css/memberCenter.css";
</style>