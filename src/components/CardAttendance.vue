<template>
	<div>
		<div class="gazhiAppMain">
			<header>
				<div class="contactsListTop">
					<div class="rollBack" @click="$router.go(-1)"></div>
					<div class="searchMain">考勤打卡</div>
					<div class="intoAttendanceStatistics" @click="$router.push('/AttendanceStatistics')"></div>
				</div>
			</header>
			<div class="cardAttendanceMain">
				<div class="cardAttendanceTop">
					<div class="head">
						<img src="../assets/img/memberlogo.png" width="100%" height="100%" style="border-radius: 100%;" />
					</div>
					<div class="content">
						<div class="name">{{empName}}</div>
						<div class="attendanceUnit">
							考勤组：产品
						</div>
					</div>
					<div class="detailTime logo" @click="changeTime()">
						<span>{{timeShow}}</span>
						<input type="date" style="opacity: 0;width: 70px;" v-model="time" @change="changeTime()" />
					</div>
				</div>
				<div class="AttendanceStatisticsMain" v-show="dataFlag">
					<div class="commuterRecord" id="goToWOrk">
						<div class="contents">上班时间&nbsp;&nbsp;{{dataResult.ruleOnTime}}</div>
						<div class="contents">打卡时间&nbsp;&nbsp;{{dataResult.markOnTime}}
							<span class="nomal" v-if="dataResult.markOnStatus == 1">正常</span>
							<span class="early" v-if="dataResult.markOnStatus == 2">迟到范围内打卡</span>
							<span class="early" v-if="dataResult.markOnStatus == 3">严重迟到</span>
							<span class="early" v-if="dataResult.markOnStatus == 4">旷工</span>
							<span class="early" v-if="dataResult.markOnStatus == 5">超出有效打卡范围 </span>
							<span class="early" v-if="dataResult.markOnStatus == 6">缺卡</span>
							<span class="early" v-if="dataResult.markOnStatus == 7">早退</span>
						</div>
						<div class="contents address">{{dataResult.markOnAddr}}</div>
						<i></i>
					</div>
					<div class="commuterRecord" style="display: none;" id="outToWOrk">
						<div class="contents">下班时间&nbsp;&nbsp;{{dataResult.ruleDownTime}}</div>
						<div class="contents">打卡时间&nbsp;&nbsp;{{dataResult.markOnTime}}
							<span class="nomal" v-if="dataResult.markOnStatus == 1">正常</span>
							<span class="early" v-if="dataResult.markOnStatus == 2">迟到范围内打卡</span>
							<span class="early" v-if="dataResult.markOnStatus == 3">严重迟到</span>
							<span class="early" v-if="dataResult.markOnStatus == 4">旷工</span>
							<span class="early" v-if="dataResult.markOnStatus == 5">超出有效打卡范围 </span>
							<span class="early" v-if="dataResult.markOnStatus == 6">缺卡</span>
							<span class="early" v-if="dataResult.markOnStatus == 7">早退</span>
						</div>
						<div class="contents address">{{dataResult.markDownAddr}}</div>
						<div class="contents"><span style="color: #94CEA8;">更新打卡时间</span></div>
						<i></i>
					</div>
				</div>
				<div class="noneValue" v-show="!dataFlag">暂无数据</div>
				<!--<div class="workType">
					<div class="goToWork" v-show="workType" @click="clockOn()">打卡上班</div>
					<div class="ouTWork" v-show="!workType" @click="earlyWithdrawal()">早退下班</div>
				</div>-->
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
	import http from '../assets/js/base/http.js'
	export default {
		data() { //数据绑定
			return {
				"time": "",
				"timeShow": "",
				"token": getCookie("token"),
				"workType": true,
				"dataResult": "",
				"dataFlag": "",
				"empName":this.GLOBAL.memberImf.name
			}
		},
		created() { //实例创建完成后执行的钩子

		},
		mounted() { //数据的初始化，整个实例中只执行一次
			var nowDate = new Date();
			var year = nowDate.getFullYear();
			this.thisMounth = nowDate.getMonth() + 1;
			var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) :
				nowDate.getMonth() + 1;
			var day = nowDate.getDate() < 10 ? "0" + nowDate.getDate() : nowDate
				.getDate();
			this.timeShow = year + "." + month + "." + day;
			this.time = year + "." + month + "." + day;
			this.dataTime = year + "-" + month + "-" + day;
			this.init();

		},
		methods: { //执行的方法
			changeTime() {
				if(this.time == null || this.time == "" || this.time == undefined) {
					return;
				}
				var timeMain = this.time.split("-");
				if(timeMain == undefined || timeMain == "" || timeMain == null || timeMain.length < 3) {
					return;
				}
				this.timeShow = timeMain[0] + "." + timeMain[1] + "." + timeMain[2];
				this.dataTime = timeMain[0] + "-" + timeMain[1] + "-" + timeMain[2];
				this.init();
			},
			clockOn() {
				$("#goToWOrk").css({
					"height": "150px",
					"border-left": "1px solid #E5E5E5"
				}).find(".contents").css({
					"height": "20px"
				});
				$("#outToWOrk").show();
				this.workType = false;
			},
			earlyWithdrawal() {
				$("#outToWOrk").css({
					"height": "150px"
				}).find(".contents").css({
					"height": "20px"
				});
				$(".workType .ouTWork").hide();
			},
			async init() {
				this.$layer.loading('加载中...');
				let markRequest = await http.get('/markLog', {
					token: this.token,
					dayDate: this.dataTime
				});
				if(markRequest.code == "203"){
					this.$router.push('/Login');
				};
				this.$layer.close();
				if(markRequest.markLog == null || markRequest.markLog == "" || markRequest.markLog == undefined) {
					this.dataFlag = false;
					return;
				} else {
					this.dataFlag = true;
				}
				let thisObj = this;
				thisObj.dataResult = markRequest.markLog;
				this.dataResult.markOnTime = this.getHourAndMinute(this.dataResult.markOnTime);
				this.dataResult.markDownTime = this.getHourAndMinute(this.dataResult.markDownTime);
				this.dataResult.ruleDownTime = this.getHourAndMinute(this.dataResult.ruleDownTime);
				this.dataResult.ruleOnTime = this.getHourAndMinute(this.dataResult.ruleOnTime);
				/*this.dataResult.markOnStatus = this.markOnStatus(this.dataResult.markOnStatus);
				this.dataResult.markDownStatus = this.markOnStatus(this.dataResult.markOnStatus);*/
				setTimeout(function() {
					thisObj.clockOn();
					thisObj.earlyWithdrawal();
				}, 500)

			},
			getHourAndMinute(obj) {
				if(parseInt(obj.hour) < 10) {
					obj.hour = "0" + obj.hour;
				}
				if(parseInt(obj.minute) < 10) {
					obj.minute = "0" + obj.minute;
				}
				return obj.hour + ":" + obj.minute;
			}
		}
	}
</script>
<style scoped lang='css'>
	@import "../assets/css/cardAttendance.css";
	input[type="date"]::calendar-picker-indicator {
		display: none;
	}
</style>