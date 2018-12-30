<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
	<div>
		<div class="gazhiAppMain">
			<header>
				<div class="contactsListTop">
					<div class="rollBack" @click="$router.go(-1)"></div>
					<div class="searchMain">园区停车</div>
					<div class="edit" v-show="editOrDelFlag" @click="toDel()"></div>
					<div class="del" v-show="editOrDelFlag" @click="toEdit()"></div>
				</div>
			</header>
			<div class="contactsLists">
				<div class="contactsList">
					<div class="addParkingSpaceMain">
						<div class="addParkingSpaceLogo" id="addQiyouClick" @click="toEdit()">
							<img v-bind:src="addQiyou" width="100%" />
						</div>
						<div class="addParkingSpaceContent" id="showContent" v-show="editFlag" style="display: inline-block;">{{youContent}}</div>
						<div class="addParkingSpaceContent" v-show="!editFlag">
							<div class="contentDetails">
								<span class="value focus"></span>
							</div>
							<div class="contentDetails">
								<span class="value nomal"></span>
							</div>
							<div class="contentDetails">
								<span class="point">·</span>
							</div>
							<div class="contentDetails">
								<span class="value nomal"></span>
							</div>
							<div class="contentDetails">
								<span class="value nomal"></span>
							</div>
							<div class="contentDetails">
								<span class="value nomal"></span>
							</div>
							<div class="contentDetails">
								<span class="value nomal"></span>
							</div>
							<div class="contentDetails">
								<span class="value nomal"></span>
							</div>
							<div class="contentDetails">
								<span class="value nomal"></span>
							</div>
						</div>
						<!--<div class="toRight"></div>-->
					</div>
					<div class="addParkingSpaceMain">
						<div class="addParkingSpaceLogo" @click="toEdit()">
							<img v-bind:src="addDian" width="100%" />
						</div>
						<div class="addParkingSpaceContent" id="showContentDian" v-show="editFlagDian" style="display: inline-block;">{{dianContent}}</div>
						<div class="addParkingSpaceContent" v-show="!editFlagDian">
							<div class="contentDetails">
								<span class="value focus"></span>
							</div>
							<div class="contentDetails">
								<span class="value nomal"></span>
							</div>
							<div class="contentDetails">
								<span class="point">·</span>
							</div>
							<div class="contentDetails">
								<span class="value nomal"></span>
							</div>
							<div class="contentDetails">
								<span class="value nomal"></span>
							</div>
							<div class="contentDetails">
								<span class="value nomal"></span>
							</div>
							<div class="contentDetails">
								<span class="value nomal"></span>
							</div>
							<div class="contentDetails">
								<span class="value nomal"></span>
							</div>
							<div class="contentDetails">
								<span class="value nomal"></span>
							</div>
						</div>
						<div class="toLeft"></div>
					</div>
				</div>

			</div>
		</div>
		<div class="keyBoard" v-show="keyBoardFlag" id="keyBoard">
			<div class="keyBoardLine">
				<div class="keyBoards">
					<span>1</span>
				</div>
				<div class="keyBoards">
					<span>2</span>
				</div>
				<div class="keyBoards">
					<span>3</span>
				</div>
				<div class="keyBoards">
					<span>4</span>
				</div>
				<div class="keyBoards">
					<span>5</span>
				</div>
				<div class="keyBoards">
					<span>6</span>
				</div>
				<div class="keyBoards">
					<span>7</span>
				</div>
				<div class="keyBoards">
					<span>8</span>
				</div>
				<div class="keyBoards">
					<span>9</span>
				</div>
				<div class="keyBoards">
					<span>0</span>
				</div>
			</div>
			<div class="keyBoardLine">
				<div class="keyBoards">
					<span>q</span>
				</div>
				<div class="keyBoards">
					<span>w</span>
				</div>
				<div class="keyBoards">
					<span>e</span>
				</div>
				<div class="keyBoards">
					<span>r</span>
				</div>
				<div class="keyBoards">
					<span>t</span>
				</div>
				<div class="keyBoards">
					<span>y</span>
				</div>
				<div class="keyBoards">
					<span>u</span>
				</div>
				<div class="keyBoards">
					<span>i</span>
				</div>
				<div class="keyBoards">
					<span>o</span>
				</div>
				<div class="keyBoards">
					<span>p</span>
				</div>
			</div>
			<div class="keyBoardLine padding10">
				<div class="keyBoards">
					<span>a</span>
				</div>
				<div class="keyBoards">
					<span>s</span>
				</div>
				<div class="keyBoards">
					<span>d</span>
				</div>
				<div class="keyBoards">
					<span>f</span>
				</div>
				<div class="keyBoards">
					<span>g</span>
				</div>
				<div class="keyBoards">
					<span>h</span>
				</div>
				<div class="keyBoards">
					<span>j</span>
				</div>
				<div class="keyBoards">
					<span>k</span>
				</div>
				<div class="keyBoards">
					<span>l</span>
				</div>
			</div>
			<div class="keyBoardLine padding30">
				<div class="keyBoards">
					<span>z</span>
				</div>
				<div class="keyBoards">
					<span>x</span>
				</div>
				<div class="keyBoards">
					<span>c</span>
				</div>
				<div class="keyBoards">
					<span>v</span>
				</div>
				<div class="keyBoards">
					<span>b</span>
				</div>
				<div class="keyBoards">
					<span>n</span>
				</div>
				<div class="keyBoards">
					<span>m</span>
				</div>
				<div class="delButtom" @click="delVal()"></div>
			</div>
			<div class="keyBoardSure">
				<div class="sureBottom" @click="sureAdd()">确定</div>
			</div>
		</div>
		<div class="keyBoard" v-show="keyBoardChinaFlag" id="keyBoardChina">
			<div class="keyBoardLine">
				<div class="keyBoards">
					<span>京</span>
				</div>
				<div class="keyBoards">
					<span>沪</span>
				</div>
				<div class="keyBoards">
					<span>粤</span>
				</div>
				<div class="keyBoards">
					<span>津</span>
				</div>
				<div class="keyBoards">
					<span>冀</span>
				</div>
				<div class="keyBoards">
					<span>晋</span>
				</div>
				<div class="keyBoards">
					<span>蒙</span>
				</div>
				<div class="keyBoards">
					<span>辽</span>
				</div>
				<div class="keyBoards">
					<span>吉</span>
				</div>
				<div class="keyBoards">
					<span>黑</span>
				</div>
			</div>
			<div class="keyBoardLine">
				<div class="keyBoards">
					<span>苏</span>
				</div>
				<div class="keyBoards">
					<span>浙</span>
				</div>
				<div class="keyBoards">
					<span>皖</span>
				</div>
				<div class="keyBoards">
					<span>闽</span>
				</div>
				<div class="keyBoards">
					<span>赣</span>
				</div>
				<div class="keyBoards">
					<span>鲁</span>
				</div>
				<div class="keyBoards">
					<span>豫</span>
				</div>
				<div class="keyBoards">
					<span>鄂</span>
				</div>
				<div class="keyBoards">
					<span>湘</span>
				</div>
				<div class="keyBoards">
					<span>桂</span>
				</div>
			</div>
			<div class="keyBoardLine padding10">
				<div class="keyBoards">
					<span>琼</span>
				</div>
				<div class="keyBoards">
					<span>渝</span>
				</div>
				<div class="keyBoards">
					<span>川</span>
				</div>
				<div class="keyBoards">
					<span>贵</span>
				</div>
				<div class="keyBoards">
					<span>云</span>
				</div>
				<div class="keyBoards">
					<span>藏</span>
				</div>
				<div class="keyBoards">
					<span>陕</span>
				</div>
				<div class="keyBoards">
					<span>甘</span>
				</div>
				<div class="keyBoards">
					<span>青</span>
				</div>
			</div>
			<div class="keyBoardLine padding20">
				<div class="keyBoards">
					<span>宁</span>
				</div>
				<div class="keyBoards">
					<span>新</span>
				</div>
				<div class="keyBoards">
					<span>使</span>
				</div>
				<div class="keyBoards">
					<span>领</span>
				</div>
				<div class="keyBoards">
					<span>警</span>
				</div>
				<div class="keyBoards">
					<span>学</span>
				</div>
				<div class="keyBoards">
					<span>港</span>
				</div>
				<div class="keyBoards">
					<span>澳</span>
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
	var addQiyou = require('../assets/img/addParkingSpace.png');
	var addQiyouH = require('../assets/img/addParkingSpaceH.png');
	var thisBoj = "";
	function shield() {
		return false;
	}
	document.addEventListener('touchstart', shield, false); //取消浏览器
	export default {
		data() { //数据绑定
			return {
				"keyBoardFlag": false,
				"keyBoardChinaFlag": false,
				"editFlag": true,
				"editFlagDian":true,
				"token": getCookie("token"),
				"editNum": 0,
				"youContent": "登记车牌信息后，可直接通过车牌识别系统进出园区",
				"addQiyou": addQiyou,
				"addDian": addQiyou,
				"addType": "0",
				"dianContent": "登记车牌信息后，可直接通过车牌识别系统进出园区",
				"editOrDelFlag":false
			}
		},
		created() { //实例创建完成后执行的钩子
			thisBoj = this;
		},
		mounted() { //数据的初始化，整个实例中只执行一次
			$("#keyBoardChina .keyBoards span").click(function() {
				$(".addParkingSpaceContent .focus").html($(this).html());
				thisBoj.editNum = thisBoj.editNum + 1;
				thisBoj.changeEidt();
				thisBoj.keyBoardFlag = true;
				thisBoj.keyBoardChinaFlag = false;
			});
			$("#keyBoard .keyBoards span").click(function() {
				$(".addParkingSpaceContent .focus").html($(this).html());
				if(thisBoj.addType == 0 && thisBoj.editNum != 7) {
					thisBoj.editNum = thisBoj.editNum + 1;
				}
				if(thisBoj.addType == 1 && thisBoj.editNum != 15) {
					thisBoj.editNum = thisBoj.editNum + 1;
				}
				thisBoj.changeEidt();
				thisBoj.judgeNull();
			});
			$(".addParkingSpaceContent .value").click(function() {
				thisBoj.editNum = $(".addParkingSpaceContent .value").index(this);
				if(thisBoj.editNum == 0 || thisBoj.editNum == 8) {
					thisBoj.keyBoardFlag = false;
					thisBoj.keyBoardChinaFlag = true;
				} else {
					thisBoj.keyBoardFlag = true;
					thisBoj.keyBoardChinaFlag = false;
				}
				thisBoj.changeEidt();
			});
			$(".addParkingSpaceMain .toRight").click(function() {
				$(".contactsLists .contactsList").css({
					"margin-left": "-100%"
				});
				$(this).hide();
				$(".addParkingSpaceMain .toLeft").show();
				thisBoj.addType = 1;
			});
			$(".addParkingSpaceMain .toLeft").click(function() {
				$(".contactsLists .contactsList").css({
					"margin-left": "0px"
				});
				$(this).hide();
				$(".addParkingSpaceMain .toRight").show();
				thisBoj.addType = 0;
			});
			this.init();
		},
		methods: { //执行的方法
			async init(){
				this.$layer.loading('加载中...');
				let data = await http.get('/userInfo', {
					token: this.token
				});
				if(data.code == "203"){
					this.$router.push('/Login');
				}
				this.$layer.close();
				if(checkVal(data.carNo)){
					this.editOrDelFlag = true;
					var carNo = data.carNo;
					$("#showContent").css({
						"color": "#333333",
						"font-size": "16px",
						"letter-spacing": "14px"
					});
					this.youContent = carNo;
					this.addQiyou = addQiyouH;
					var spanList = $("#showContent").next().find(".contentDetails span");
					for(var i = 0;i<carNo.length;i++){
						$(spanList[i]).html(carNo.charAt(i));
					}
				}
				console.log(data);
			},
			toEdit() {
				if(this.keyBoardFlag || this.keyBoardChinaFlag) {
					return;
				}
				this.keyBoardChinaFlag = true;
				if(thisBoj.addType == 0) {
					this.editFlag = false;
					$(".contentDetails .value").first().click();
				} else {
					this.editFlagDian = false;
					$($(".contentDetails .value")[8]).click();
				}

				$(".contactsLists").css({
					"height": $(".contactsLists").height() - $(".keyBoard").height() + "px"
				});
			},
			async toDel(){
				this.$layer.loading('删除中...');
				let data = await http.post('/updateUser', {
					token: this.token,
					carNo:""
				});
				if(data.code == "203"){
					this.$router.push('/Login');
				}
				this.$layer.close();
				this.editOrDelFlag = false;
				this.editFlagDian = true;
				this.addQiyou = addQiyou;
				$("#showContent").html("登记车牌信息后，可直接通过车牌识别系统进出园区").css({
					    "font-size": "12px",
					    "color": "#CCCCCC",
					    "letter-spacing": "0px"
				});
				$("#showContent").next().find(".contentDetails .value").html("");
				
			},
			changeEidt() {
				$(".contentDetails .value.focus").removeClass("focus").addClass("nomal");
				$($(".contentDetails .value")[this.editNum]).removeClass("nomal").addClass("focus");
			},
			delVal() {
				this.editNum;
				var thisEdit = $(".addParkingSpaceContent .value")[this.editNum];
				var html = $(thisEdit).html();
				if(html == "" || html == null || html == undefined) {
					--this.editNum;
					$($(".addParkingSpaceContent .value")[this.editNum]).click().html("");
				} else {
					$(thisEdit).html("");
				}
				this.judgeNull();
			},
			judgeNull() {
				var valList = $(".addParkingSpaceContent .value");
				var valFlag = true;
				if(this.addType == 0) {
					for(var i = 0; i < 8; i++) {
						if($(valList[i]).html() == null || $(valList[i]).html() == "" || $(valList[i]).html() == undefined) {
							valFlag = false;
						}
					}
				} else {
					for(var i = 8; i < 16; i++) {
						if($(valList[i]).html() == null || $(valList[i]).html() == "" || $(valList[i]).html() == undefined) {
							valFlag = false;
						}
					}
				}

				if(valFlag) {
					$(".keyBoardSure").css({
						"top": "-40px",
						"opacity": "1"
					});
				} else {
					$(".keyBoardSure").css({
						"opacity": "0",
						"top": "0px"
					});
				}
			},
			async sureAdd() {
				this.keyBoardFlag = false;
				this.keyBoardChinaFlag = false;
				$(".contactsLists").removeAttr("style");
				var valueObj = $(".addParkingSpaceContent .contentDetails span");
				var index = 0;
				var indexLength = 0;
				console.log(this.addType)
				if(this.addType == 0) {
					this.editFlag = true;
					index = 0;
					indexLength = 9;
					this.youContent = "";
					$("#showContent").css({
						"color": "#333333",
						"font-size": "16px",
						"letter-spacing": "14px"
					});
				} else {
					this.editFlagDian = true;
					index = 9;
					indexLength = 18;
					this.dianContent = "";
					$("#showContentDian").css({
						"color": "#333333",
						"font-size": "16px",
						"letter-spacing": "14px"
					});
				}
				for(var b = index; b < indexLength; b++) {
					if(this.addType == 0) {
						this.youContent += $(valueObj[b]).html();
					} else {
						this.dianContent += $(valueObj[b]).html();
					}

				}
				if(this.addType == 0) {
					this.addQiyou = addQiyouH;
				} else {
					this.addDian = addQiyouH;
				}
				
				this.$layer.loading('修改中...');
				let data = await http.post('/updateUser', {
					token: this.token,
					carNo:this.youContent
				});
				if(data.code == "203"){
					this.$router.push('/Login');
				}
				this.$layer.close();
				this.$router.push('/ParkSpaceAdd');
				this.editOrDelFlag = true;
				$("#showContent").html(this.youContent).css({
					    "color": "#333333",
						"font-size": "16px",
						"letter-spacing": "14px",
					    "display":"block"
				});
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='css'>
	@import "../assets/css/parkSpaceAdd.css";
</style>