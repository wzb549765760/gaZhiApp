<template>
	<div>
		<!--详细信息-->
		<div class="memberImf">
			<div class="imfTop" style="height: 40%;">
				<div class="setTop">
					<div class="rollBack" @click="rollBack()"></div>
					<div class="setButtom" v-show="setFlag" @click="intoEdit()"></div>
				</div>
				<div class="headLogo">
					<img src="../assets/img/memberlogo.png" style="height: 0px;" @click="upload()" />
					<input type="file" id="upload_file" accept="image" style="display: none;" @change="change($event)">
					<!--<input accept="image/*" name="upimage" id="upload_file" type="file" style="display: none;" @change="change()">-->
					<textarea id="base64_output" name="Word" style="display: none;" v-model="base64_output_val"></textarea>
				</div>
				<div class="imfDeatil" style="height: 55%;">
					<div class="realyName" style="height: 60%;">
						<span @click="upload()">{{realyNameContent}}</span>
					</div>
					<div class="realyDepartment" v-show="setFlag">
						<span style="height: 0px;line-height: normal;padding: 6px 0;box-sizing: border-box;">{{data.deptName}}</span>
						<span style="height: 0px;line-height: normal;padding: 6px 0;box-sizing: border-box;">{{data.placeName}}</span>
					</div>
				</div>
				<input type="file" id="fileUpload" style="display: none;" />
			</div>
			<div class="imfMain" v-show="setFlag" id="imfMain" style="height: 0px;">
				<div class="companyName detailCompanyName">{{data.companyName}}</div>
				<div class="otherName detailMibile">+86 {{data.phone}}</div>
				<div class="otherName detailEmail">{{data.email}}</div>
				<div class="otherName detailAddress">
					<span>{{data.address}}</span>
				</div>
			</div>
			<div class="imfMain" id="imfEditMain" style="height: 0px;" v-show="!setFlag">
				<div class="otherNameSet detailMibile">
					<div class="setValue">+86 {{data.phone}}</div>
					<div class="intoLink" @click="$router.push('/UpdateMobile')"></div>
				</div>
				<div class="otherNameSet detailPwd">
					<div class="setValue">登录密码</div>
					<div class="intoLink" @click="$router.push('/UpdatePassword')"></div>
				</div>
				<div class="otherNameSet detailMessage">
					<div class="setValue">消息通知</div>
					<div class="closeOrOpen" id="notification">
						<div class="buttomSlid">
							<div class="bottomMain"></div>
						</div>
					</div>
				</div>
				<div class="otherNameSet">
					<div class="setValue">接收访客来访请求</div>
					<div class="closeOrOpen" id="visitorsVisit">
						<div class="buttomSlid">
							<div class="bottomMain"></div>
						</div>
					</div>
				</div>
				<div class="otherNameSet">
					<div class="setValue">上班打卡提醒</div>
					<div class="closeOrOpen" id="goToWork">
						<div class="buttomSlid">
							<div class="bottomMain"></div>
						</div>
					</div>
				</div>
				<div class="otherNameSet">
					<div class="setValue">下班打卡提醒</div>
					<div class="closeOrOpen" id="goOffWork">
						<div class="buttomSlid">
							<div class="bottomMain"></div>
						</div>
					</div>
				</div>
				<div class="otherNameSet detailAutoAddBody">
					<div class="setValue">自动将访客加入联系人</div>
					<div class="closeOrOpen" id="joinAContact">
						<div class="buttomSlid">
							<div class="bottomMain"></div>
						</div>
					</div>
				</div>
				<div class="loginOut" @click="loginOut()">
					退出登录
				</div>
			</div>
		</div>

		<div class="companyLogoBottom" v-show="setFlag">
			<span>到了园区服务平台 </span>
		</div>
		<div id="demo">
			<!-- 遮罩层 -->
			<div class="container" v-show="panel">
				<div>
					<img id="image" :src="url" alt="Picture">
				</div>
				<button type="button" id="button" @click="commit">确定</button>
				<button type="button" id="cancel" @click="cancel">取消</button>
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
	import Cropper from "cropperjs"
	export default {
		data() { //数据绑定
			return {
				"setFlag": true,
				"realyName": "",
				"realyNameContent": "",
				"token": getCookie("token"),
				"base64_output_val": "",
				"data": "",
				"headerImage": "",
				"picValue": "",
				"cropper": "",
				"croppable": false,
				"panel": false,
				"url": "",
				"imgCropperData": {
					accept: "image/gif, image/jpeg, image/png, image/jpg"
				}
			}
		},
		created() { //实例创建完成后执行的钩子
			var self = this;
			setTimeout(function() {
				var image = document.getElementById("image");
				self.cropper = new Cropper(image, {
					aspectRatio: 1,
					viewMode: 1,
					background: false,
					zoomable: false,
					ready: function() {
						self.croppable = true;
					}
				});
			}, 1000)

		},
		mounted() { //数据的初始化，整个实例中只执行一次
			this.init();
			setTimeout(function() {
				$(".realyDepartment span").css({
					"height": "35px"
				})
				$(".realyName span").css({
					"height": "100%"
				})
			}, 0);
			setTimeout(function() {
				$(".headLogo img").css({
					"height": "100%"
				})
			}, 300)
			setTimeout(function() {
				$("#imfMain").css({
					"height": "60%"
				});
			}, 500)
		},
		methods: { //执行的方法
			async init() {
				$(".headLogo img").width($(".headLogo").height()).height($(".headLogo").height());
				$(".otherNameSet .closeOrOpen").click(function() {
					var objId = $(this).attr("id");
					var flag = 0;
					if($(this).find(".buttomSlid").css("left") == "0px") {
						$(this).find(".buttomSlid").css({
							"left": "-20px"
						});
						flag = 0;
					} else {
						$(this).find(".buttomSlid").css({
							"left": "0px"
						})
						flag = 1;
					}
					localStorage.setItem(objId, flag);
				});
				if(this.token == "" || this.token == null || this.token == undefined) {
					this.$router.push('/Login');
				}
				this.$layer.loading('加载中...');
				let data = await http.get('/userInfo', {
					token: this.token
				});
				this.$layer.close();
				if(data.photo != null) {
					$(".headLogo img").attr("src", data.photo);
				}
				if(data.placeName == "" || data.placeName == null || data.placeName == undefined) {
					data.placeName = "职员";
				}
				if(data.code == "203") {
					this.$router.push('/Login');
				};
				this.realyName = data.name;
				this.realyNameContent = data.name;
				this.data = data;
			},
			upload() {
				if(this.setFlag) {
					return;
				}
				$("#upload_file").click();
			},
			async get_base64() {
				var thisBase = this;
				var file = document.getElementById("upload_file").files[0];
				var r = new FileReader(); //本地预览
				r.onload = function() {
					thisBase.base64_output_val = r.result
				}
				r.readAsDataURL(file); //Base64
			},
			async loginOut() {
				let data = await http.post('/loginOut', {
					token: this.token
				});
				delCookie("token");
				this.$router.push('/Login');
			},
			async uploadInto() {
				this.$layer.loading('上传中...');
				let data = await http.post('/updateUser', {
					token: this.token,
					photo: this.base64_output_val
				});
				this.$layer.close();
				if(data.code == "203") {
					this.$router.push('/Login');
				} else if(data.code == "200") {
					$(".headLogo img").attr("src", this.base64_output_val);

				}
			},
			intoEdit() {

				if(checkVal(localStorage.getItem("notification")) && localStorage.getItem("notification") == "1") { //消息通知
					$("#notification").click();
				}
				if(checkVal(localStorage.getItem("visitorsVisit")) && localStorage.getItem("visitorsVisit") == "1") { //访客来访
					$("#visitorsVisit").click();
				}
				if(checkVal(localStorage.getItem("goToWork")) && localStorage.getItem("goToWork") == "1") { //上班
					$("#goToWork").click();
				}
				if(checkVal(localStorage.getItem("goOffWork")) && localStorage.getItem("goOffWork") == "1") { //下班
					$("#goOffWork").click();
				}
				if(checkVal(localStorage.getItem("joinAContact")) && localStorage.getItem("joinAContact") == "1") { //消息通知
					$("#joinAContact").click();
				}
				this.setFlag = false;
				$(".imfTop").css({
					"height": "30%"
				});
				$(".imfTop .realyName").css({
					"height": "100%",
					"font-size": "12px"
				});
				setTimeout(function() {
					$("#imfEditMain").css({
						"height": "70%"
					});
					$("#imfMain").css({
						"height": "0px"
					});
					$(".headLogo img").width($(".headLogo").height()).height($(".headLogo").height());
				}, 500);
				this.realyNameContent = "点击编辑头像";

			},
			rollBack() {

				if(this.setFlag) {
					this.$router.go(-1);
				} else {
					this.setFlag = true;
					this.realyNameContent = this.realyName;
					$(".imfTop").css({
						"height": "40%"
					});
					$(".imfTop .realyName").css({
						"height": "60%",
						"font-size": "20px"
					});
					setTimeout(function() {
						$("#imfEditMain").css({
							"height": "0px"
						});
						$("#imfMain").css({
							"height": "60%"
						});
						$(".headLogo img").width($(".headLogo").height()).height($(".headLogo").height());
					}, 500);

				}
			},
			//取消上传
			cancel() {
				this.panel = false;
				var obj = document.getElementById('change');
				obj.outerHTML = obj.outerHTML;
			},
			//创建url路径
			getObjectURL(file) {
				var url = null;
				if(window.createObjectURL != undefined) {
					// basic
					url = window.createObjectURL(file);
				} else if(window.URL != undefined) {
					// mozilla(firefox)
					url = window.URL.createObjectURL(file);
				} else if(window.webkitURL != undefined) {
					// webkit or chrome
					url = window.webkitURL.createObjectURL(file);
				}
				return url;
			},
			//input框change事件，获取到上传的文件
			change(e) {
				let files = e.target.files || e.dataTransfer.files;
				if(!files.length) return;
				let type = files[0].type; //文件的类型，判断是否是图片
				let size = files[0].size; //文件的大小，判断图片的大小
				if(this.imgCropperData.accept.indexOf(type) == -1) {
					this.$layer.toast({
							icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
							content: '请选择我们支持的图片格式',
							time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
						});
					return false;
				}
				if(size > 1024000) {
					this.$layer.toast({
							icon: 'icon-check', // 图标clssName 如果为空 toast位置位于下方,否则居中 
							content: '请选择5M以内的图片',
							time: 2000 // 自动消失时间 toast类型默认消失时间为2000毫秒 
						});
					return false;
				}
				this.picValue = files[0];
				this.url = this.getObjectURL(this.picValue);
				//每次替换图片要重新得到新的url
				if(this.cropper) {
					this.cropper.replace(this.url);
				}
				this.panel = true;
			},
			//确定提交
			commit() {
				this.panel = false;
				var croppedCanvas;
				var roundedCanvas;
				if(!this.croppable) {
					return;
				}
				// Crop
				croppedCanvas = this.cropper.getCroppedCanvas();
				// Round
				roundedCanvas = this.getRoundedCanvas(croppedCanvas);
				this.headerImage = roundedCanvas.toDataURL();
				//上传图片
				this.postImg(this.headerImage);
			},
			//canvas画图
			getRoundedCanvas(sourceCanvas) {
				var canvas = document.createElement("canvas");
				var context = canvas.getContext("2d");
				var width = sourceCanvas.width;
				var height = sourceCanvas.height;
				canvas.width = width;
				canvas.height = height;
				context.imageSmoothingEnabled = true;
				context.drawImage(sourceCanvas, 0, 0, width, height);
				context.globalCompositeOperation = "destination-in";
				context.beginPath();
				context.arc(
					width / 2,
					height / 2,
					Math.min(width, height) / 2,
					0,
					2 * Math.PI,
					true
				);
				context.fill();
				return canvas;
			},
			//提交上传函数
			postImg(url) {
				this.base64_output_val = url;
				this.uploadInto();
				//这边写图片的上传
			}
		}
		/*,
		watch: {
			"base64_output_val": function(newVal, oldVal) {
				this.uploadInto();
			}
		}*/
	}
</script>
<style scoped lang='css'>
	@import "../assets/css/memberImf.css";
</style>
<style>
	#demo #button,
	#demo #cancel {
		position: absolute;
		right: 10px;
		top: 10px;
		width: 80px;
		height: 40px;
		border: none;
		border-radius: 5px;
		background: white;
	}
	
	#demo #cancel {
		left: 10px;
	}
	
	#demo .show {
		width: 100px;
		height: 100px;
		overflow: hidden;
		position: relative;
		border-radius: 50%;
		border: 1px solid #d5d5d5;
	}
	
	#demo .picture {
		width: 100%;
		height: 100%;
		overflow: hidden;
		background-position: center center;
		background-repeat: no-repeat;
		background-size: cover;
	}
	
	#demo .container {
		z-index: 99;
		position: fixed;
		padding-top: 60px;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 1);
	}
	
	#demo #image {
		max-width: 100%;
	}
	
	.cropper-view-box,
	.cropper-face {
		border-radius: 50%;
	}
	/*! 
 * Cropper.js v1.0.0-rc 
 * https://github.com/fengyuanchen/cropperjs 
 * 
 * Copyright (c) 2017 Fengyuan Chen 
 * Released under the MIT license 
 * 
 * Date: 2017-03-25T12:02:21.062Z 
 */
	
	.cropper-container {
		font-size: 0;
		line-height: 0;
		position: relative;
		-webkit-user-select: none;
		-moz-user-select: none;
		-ms-user-select: none;
		user-select: none;
		direction: ltr;
		-ms-touch-action: none;
		touch-action: none;
	}
	
	.cropper-container img {
		display: block;
		min-width: 0 !important;
		max-width: none !important;
		min-height: 0 !important;
		max-height: none !important;
		width: 100%;
		height: 100%;
		image-orientation: 0deg;
	}
	
	.cropper-wrap-box,
	.cropper-canvas,
	.cropper-drag-box,
	.cropper-crop-box,
	.cropper-modal {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
	}
	
	.cropper-wrap-box {
		overflow: hidden;
	}
	
	.cropper-drag-box {
		opacity: 0;
		background-color: #fff;
	}
	
	.cropper-modal {
		opacity: 0.5;
		background-color: #000;
	}
	
	.cropper-view-box {
		display: block;
		overflow: hidden;
		width: 100%;
		height: 100%;
		outline: 1px solid #39f;
		outline-color: rgba(51, 153, 255, 0.75);
	}
	
	.cropper-dashed {
		position: absolute;
		display: block;
		opacity: 0.5;
		border: 0 dashed #eee;
	}
	
	.cropper-dashed.dashed-h {
		top: 33.33333%;
		left: 0;
		width: 100%;
		height: 33.33333%;
		border-top-width: 1px;
		border-bottom-width: 1px;
	}
	
	.cropper-dashed.dashed-v {
		top: 0;
		left: 33.33333%;
		width: 33.33333%;
		height: 100%;
		border-right-width: 1px;
		border-left-width: 1px;
	}
	
	.cropper-center {
		position: absolute;
		top: 50%;
		left: 50%;
		display: block;
		width: 0;
		height: 0;
		opacity: 0.75;
	}
	
	.cropper-center:before,
	.cropper-center:after {
		position: absolute;
		display: block;
		content: " ";
		background-color: #eee;
	}
	
	.cropper-center:before {
		top: 0;
		left: -3px;
		width: 7px;
		height: 1px;
	}
	
	.cropper-center:after {
		top: -3px;
		left: 0;
		width: 1px;
		height: 7px;
	}
	
	.cropper-face,
	.cropper-line,
	.cropper-point {
		position: absolute;
		display: block;
		width: 100%;
		height: 100%;
		opacity: 0.1;
	}
	
	.cropper-face {
		top: 0;
		left: 0;
		background-color: #fff;
	}
	
	.cropper-line {
		background-color: #39f;
	}
	
	.cropper-line.line-e {
		top: 0;
		right: -3px;
		width: 5px;
		cursor: e-resize;
	}
	
	.cropper-line.line-n {
		top: -3px;
		left: 0;
		height: 5px;
		cursor: n-resize;
	}
	
	.cropper-line.line-w {
		top: 0;
		left: -3px;
		width: 5px;
		cursor: w-resize;
	}
	
	.cropper-line.line-s {
		bottom: -3px;
		left: 0;
		height: 5px;
		cursor: s-resize;
	}
	
	.cropper-point {
		width: 5px;
		height: 5px;
		opacity: 0.75;
		background-color: #39f;
	}
	
	.cropper-point.point-e {
		top: 50%;
		right: -3px;
		margin-top: -3px;
		cursor: e-resize;
	}
	
	.cropper-point.point-n {
		top: -3px;
		left: 50%;
		margin-left: -3px;
		cursor: n-resize;
	}
	
	.cropper-point.point-w {
		top: 50%;
		left: -3px;
		margin-top: -3px;
		cursor: w-resize;
	}
	
	.cropper-point.point-s {
		bottom: -3px;
		left: 50%;
		margin-left: -3px;
		cursor: s-resize;
	}
	
	.cropper-point.point-ne {
		top: -3px;
		right: -3px;
		cursor: ne-resize;
	}
	
	.cropper-point.point-nw {
		top: -3px;
		left: -3px;
		cursor: nw-resize;
	}
	
	.cropper-point.point-sw {
		bottom: -3px;
		left: -3px;
		cursor: sw-resize;
	}
	
	.cropper-point.point-se {
		right: -3px;
		bottom: -3px;
		width: 20px;
		height: 20px;
		cursor: se-resize;
		opacity: 1;
	}
	
	@media (min-width: 768px) {
		.cropper-point.point-se {
			width: 15px;
			height: 15px;
		}
	}
	
	@media (min-width: 992px) {
		.cropper-point.point-se {
			width: 10px;
			height: 10px;
		}
	}
	
	@media (min-width: 1200px) {
		.cropper-point.point-se {
			width: 5px;
			height: 5px;
			opacity: 0.75;
		}
	}
	
	.cropper-point.point-se:before {
		position: absolute;
		right: -50%;
		bottom: -50%;
		display: block;
		width: 200%;
		height: 200%;
		content: " ";
		opacity: 0;
		background-color: #39f;
	}
	
	.cropper-invisible {
		opacity: 0;
	}
	
	.cropper-bg {
		background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC");
	}
	
	.cropper-hide {
		position: absolute;
		display: block;
		width: 0;
		height: 0;
	}
	
	.cropper-hidden {
		display: none !important;
	}
	
	.cropper-move {
		cursor: move;
	}
	
	.cropper-crop {
		cursor: crosshair;
	}
	
	.cropper-disabled .cropper-drag-box,
	.cropper-disabled .cropper-face,
	.cropper-disabled .cropper-line,
	.cropper-disabled .cropper-point {
		cursor: not-allowed;
	}
</style>
