<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
	<div>
		<div class="gazhiAppMain">
			<header>
				<div class="contactsListTop">
					<div class="rollBack" @click="$router.go(-1)"></div>
					<div class="searchMain">考勤统计</div>
					<div class="intoAttendanceTime" @click="$router.push('/CardAttendanceTime')"></div>
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
				</div>
			</div>
		</div>
		<div class="cardAttendanceRecode">
			<div class="tittle">工作时长</div>
			<div class="recodeMain">
				<div class="recode" id="myChart"></div>
			</div>
		</div>
		<div class="gazhiAppMain">
			<div class="getRecodeByMonth">
				<div class="changtTime">
					<div class="left" @click="lastMonth()"></div>
					<div class="content">{{thisDate}}</div>
					<div class="right" v-show="nextFlag" @click="nextMonth()"></div>
					<div class="right" v-show="!nextFlag"></div>
				</div>
			</div>
			<div class="recodeDetail">
				<div class="main">
					<span class="name">出勤天数</span>
					<span class="value">{{markReport.workDays}}天</span>
				</div>
				<div class="main">
					<span class="name">迟到</span>
					<span class="value">{{markReport.lateNum}}次</span>
				</div>
				<div class="main">
					<span class="name">早退</span>
					<span class="value">{{markReport.leaveEarlyNum}}次</span>
				</div>
				<div class="main">
					<span class="name">缺卡</span>
					<span class="value">{{missesWorkDownNummissesWorkOnNum}}次</span>
				</div>
				<div class="main">
					<span class="name">旷工</span>
					<span class="value">{{markReport.absentNum}}次</span>
				</div>
				<div class="main">
					<span class="name">出勤</span>
					<span class="value">{{markReport.workDays}}次</span>
				</div>
				<div class="main">
					<span class="name">加班</span>
					<span class="value">{{markReport.extraHours}}小时</span>
				</div>
				<div class="averageTimeOfWork">{{averagLengthOfTime}}</div>
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
	let echarts = require('echarts/lib/echarts');
	import http from '../assets/js/base/http.js'
	export default {
		data() { //数据绑定
			return {
				"myChart": null,
				"option": [],
				"data": [],
				"hourList": [],
				"thisDate": "",
				"nextFlag": false,
				"token": getCookie("token"),
				"nowData": "",
				"markReport": "",
				"averagLengthOfTime":"",
				"missesWorkDownNummissesWorkOnNum":"",
				"empName":this.GLOBAL.memberImf.name
			}
		},
		created() { //实例创建完成后执行的钩子

		},
		mounted() { //数据的初始化，整个实例中只执行一次
			//在 methoes 中封装一个方法 drawLine()
			var nowDate = new Date();
			var year = nowDate.getFullYear();
			var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) :
				nowDate.getMonth() + 1;
			this.thisDate = year + "." + month;
			this.nowData = year + "." + month;
			this.nowDataContent = year + "-" + month;
			var h = $(window).height() - 450;
			$(".recodeDetail").css({
				"height": h + "px"
			})
			this.init();
		},
		methods: {
			async init() {
				this.$layer.loading('加载中...');
				let markLogObj = await http.get('/markLogList', {
					token: this.token,
					monthDate: this.nowDataContent
//monthDate: "2017-12"
				});
				if(markLogObj.code == "203"){
					this.$router.push('/Login');
				};
				this.$layer.close();
				this.markReport = markLogObj.markReport;
				if(checkVal(this.markReport.missesWorkDownNum) && checkVal(this.markReport.missesWorkOnNum)){
					this.missesWorkDownNummissesWorkOnNum = this.markReport.missesWorkDownNum + this.markReport.missesWorkOnNum;
				}else{
					this.missesWorkDownNummissesWorkOnNum = 0;
				}
				if(checkVal(this.markReport)){
					if(checkVal(this.markReport.workDays) && checkVal(this.markReport.workHours)){
						var averagTime = (this.markReport.workHours/this.markReport.workDays)*60;
						this.averagLengthOfTime = "本月平均工时"+(parseInt(averagTime/60))+"小时"+parseInt((averagTime-(parseInt(averagTime/60)*60)))+"分钟";
					}
				}
				let list = markLogObj.markLogList;
				var dataDayList = [];
				var dataHourList = [];
				if(list.length > 0) {
					for(var i = 0; i < list.length; i++) {
						dataDayList.push(list[i].markDate.dayOfMonth);
						dataHourList.push(list[i].workHours);
					}
				}
				this.data = dataDayList;
				this.hourList = dataHourList;
				if(list.length < 11) {
					$("#myChart").css({
						"width": "100%"
					})
				} else {
					$("#myChart").css({
						"width": (list.length * 10) + "%"
					})
				}
				this.drawLine();
			},
			drawLine() {
				let myChart = echarts.init(document.getElementById('myChart'))
				myChart.setOption({
					title: {
						text: ''
					},
					tooltip: {
						trigger: 'axis',
						axisPointer: {
							type: 'cross',
							label: {
								backgroundColor: 'blue'
							}
						}
					},
					legend: {
						data: []
					},
					toolbox: {
						feature: {
							saveAsImage: {}
						}
					},
					plotOptions: {
						areaStyle: {
							normal: {
								radius: 1,
								lineColor: '#666666',
								lineWidth: 0
							}
						}
					},
					grid: {
						left: '0%',
						right: '0%',
						bottom: '0%',
						top: '0',
						containLabel: false
					},
					xAxis: [{
						type: 'category',
						boundaryGap: false,
						backgroundColor: 'blue',
						data: this.data
					}],
					yAxis: [{
						type: 'value',
						splitLine: {
							show: false
						}
					}],

					series: [{
						name: '工作时长',
						type: 'line',
						stack: '总量',
						smooth: true,
						lineColor: 'blue',
						areaStyle: {
							normal: {
								show: true,
								position: 'top',
								color: '#94CEA8',
								lineColor: "#94CEA8",
								borderWidth: '0px'
							}
						},
						itemStyle: {
							normal: {
								lineStyle: {
									color: '#94CEA8'
								}
							}
						},
						data: this.hourList
					}]
				})
			},
			lastMonth() {
				var year = "";
				var month = "";
				var thisDates = this.thisDate.split(".");
				var nowDates = this.nowData.split(".");
				var thisMonth = parseInt(thisDates[1]);
				var thisYear = parseInt(thisDates[0]);
				if(thisMonth == 1) {
					year = thisYear - 1;
					month = 12;
				} else {
					month = (thisMonth - 1) < 10 ? "0" + (thisMonth - 1) : (thisMonth - 1);
					year = thisYear;
				}
				this.nextFlag = true;
				this.thisDate = year + "." + month;
				this.nowDataContent = year + "-" + month;
				this.init();
			},
			nextMonth() {
				var year = "";
				var month = "";
				var thisDates = this.thisDate.split(".");
				var nowDates = this.nowData.split(".");
				var thisMonth = parseInt(thisDates[1]);
				var thisYear = parseInt(thisDates[0]);
				if(thisMonth == 12) {
					year = thisYear + 1;
					month = "01";
				} else {
					month = (thisMonth + 1) < 10 ? "0" + (thisMonth + 1) : (thisMonth + 1);
					year = thisYear;
				}
				if(month == nowDates[1]) {
					this.nextFlag = false;
				}
				this.thisDate = year + "." + month;
				this.nowDataContent = year + "-" + month;
				this.init();
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='css'>
	@import "../assets/css/cardAttendance.css";
</style>