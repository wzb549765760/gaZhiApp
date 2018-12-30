<template>
	<div>
		<div class="gazhiAppMain">
			<header>
				<div class="contactsListTop">
					<div class="rollBack" @click="$router.go(-1)"></div>
					<div class="searchMain">考勤日历</div>
				</div>
			</header>
			<div class="cardAttendanceMain">
				<div class="cardAttendanceTop">
					<div class="head">
						<img src="../assets/img/memberlogo.png" width="100%" height="100%" style="border-radius: 100%;"/>
					</div>
					<div class="content">
						<div class="name">{{empName}}</div>
						<div class="attendanceUnit">
							考勤组：产品
						</div>
					</div>
					<div class="detailTime" @click="changeTime()">
						{{dateTime}}
					</div>
				</div>
				<div class="dateMain">
					<div class="tittle">
						<span>日</span>
						<span>一</span>
						<span>二</span>
						<span>三</span>
						<span>四</span>
						<span>五</span>
						<span>六</span>
					</div>
					<div class="dataByWeek" v-for="d in dateList">
						<div class="weekOfDay" v-for="dc in d">
							<div class="day" v-if="dc[1]!=thisMounth" style="color: #E5E5E5;"><span></span></div><!--nomal queqin-->
							<div class="day" v-if="dc[1]==thisMounth" style="color: #E5E5E5;" v-bind:data-day = "dc[2]"><span @click="thisDayGetImf($event)">{{dc[2]}}</span></div><!--nomal queqin-->
						</div>
						
					</div>
				</div>
				<div class="AttendanceStatisticsMain" style="margin-top: 10px;overflow: auto;" v-show="detailFlag">
					<div class="commuterRecordNum">今日打卡2次，共计工时9小时14分钟<i></i></div>
					<div class="commuterRecord" id="goToWOrk" style="height: 100px;border-left: 1px solid #E5E5E5;">
						<div class="contents" style="height: 20px;">打卡时间&nbsp;&nbsp;{{dataResult.markOnTime}}  (上班时间&nbsp;&nbsp;{{dataResult.ruleOnTime}})
							<span class="nomal" v-if="dataResult.markOnStatus == 1">正常</span>
							<span class="early" v-if="dataResult.markOnStatus == 2">迟到范围内打卡</span>
							<span class="early" v-if="dataResult.markOnStatus == 3">严重迟到</span>
							<span class="early" v-if="dataResult.markOnStatus == 4">旷工</span>
							<span class="early" v-if="dataResult.markOnStatus == 5">超出有效打卡范围 </span>
							<span class="early" v-if="dataResult.markOnStatus == 6">缺卡</span>
							<span class="early" v-if="dataResult.markOnStatus == 7">早退</span>
						</div>
						<div class="contents address" style="height: 20px;">{{dataResult.markOnAddr}}</div>
						<i></i>
					</div>
					<div class="commuterRecord" id="outToWOrk" style="height: 100px;">
						<div class="contents" style="height: 20px;">打卡时间&nbsp;&nbsp;{{dataResult.markOnTime}} (下班时间&nbsp;&nbsp;{{dataResult.ruleDownTime}})
							<span class="nomal" v-if="dataResult.markOnStatus == 1">正常</span>
							<span class="early" v-if="dataResult.markOnStatus == 2">迟到范围内打卡</span>
							<span class="early" v-if="dataResult.markOnStatus == 3">严重迟到</span>
							<span class="early" v-if="dataResult.markOnStatus == 4">旷工</span>
							<span class="early" v-if="dataResult.markOnStatus == 5">超出有效打卡范围 </span>
							<span class="early" v-if="dataResult.markOnStatus == 6">缺卡</span>
							<span class="early" v-if="dataResult.markOnStatus == 7">早退</span>
						</div>
						<div class="contents address" style="height: 20px;">{{dataResult.markDownAddr}}</div>
						<i></i>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import { getTimtByParams } from '../assets/js/base/data.js' //注意路径
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
				"dateTime": "",
				"dayList": ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
				"dateList": null,
				"thisMounth":"",
				"token": getCookie("token"),
				"detailFlag":false,
				"nowDataContent":"",
				"dataResult": "",
				"thisDay":"",
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
			var dateStr = year + "." + month + "." + day;
			this.thisDay = day;
			var dateStr = year + "." + month + "." + day;
			this.nowDataContent = year + "-" + month;
			this.dateTime = dateStr + " " + this.dayList[nowDate.getDay()]
			this.getTime(nowDate.getFullYear(), nowDate.getMonth());
			var h = $(window).height()-480;
			$(".AttendanceStatisticsMain").css({
				"height":h+"px"
			});
			this.init();
		},
		methods: { //执行的方法
			async init(){
				console.log(this.GLOBAL.memberImf)
				this.$layer.loading('加载中...');
				let markLogObj = await http.get('/markLogList', {
					token: this.token,
					monthDate: this.nowDataContent
//					monthDate: this.nowDataContent
				});
				if(markLogObj.code == "203"){
					this.$router.push('/Login');
				};
				this.$layer.close();
				if(markLogObj.markLogList != null && markLogObj.markLogList != "" && markLogObj.markLogList != undefined){
					for(var i=0;i<markLogObj.markLogList.length;i++){
						var thisMarkLogObj = markLogObj.markLogList[i];
						var thisMarkLogObjDay = thisMarkLogObj.markDate.dayOfMonth;
						var dayList = $(".weekOfDay .day");
						$(".weekOfDay .day[data-day='"+thisMarkLogObjDay+"']").css({
								"color":"#000"
							}); 
						if(thisMarkLogObj.markOnStatus == 0 && thisMarkLogObj.markDownStatus == 0){
							$(".weekOfDay div[data-day='"+thisMarkLogObjDay+"']").addClass("nomal")
						}else{
							$(".weekOfDay div[data-day='"+thisMarkLogObjDay+"']").addClass("queqin")
						}
					}
				}
				
				console.log(markLogObj);
			},
			getTime(year, mounth) {
				this.dateList = getTimtByParams(year, mounth);
			},
			async thisDayGetImf(t){
				var color = $(t.target).parent().css("color");
				if(color == "rgb(229, 229, 229)"){
					return;
				}
				var dataTime = this.nowDataContent+"-"+$(t.target).html();
				let markRequest = await http.get('/markLog', {
					token: this.token,
					dayDate: dataTime
				});
				if(markRequest.code == "203"){
					this.$router.push('/Login');
				};
				$(".weekOfDay span").css({
					"background-color":"white"
				});
				$(t.target).css({
					"background-color":"#CAE7D4"
				});
				if(markRequest.markLog == null || markRequest.markLog == "" || markRequest.markLog == undefined) {
					this.detailFlag = false;
					return;
				} else {
					this.detailFlag = true;
				}
				let thisObj = this;
				thisObj.dataResult = markRequest.markLog;
				this.dataResult.markOnTime = this.getHourAndMinute(this.dataResult.markOnTime);
				this.dataResult.markDownTime = this.getHourAndMinute(this.dataResult.markDownTime);
				this.dataResult.ruleDownTime = this.getHourAndMinute(this.dataResult.ruleDownTime);
				this.dataResult.ruleOnTime = this.getHourAndMinute(this.dataResult.ruleOnTime);
				
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
</style>