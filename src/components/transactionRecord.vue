<template xmlns:v-bind="http://www.w3.org/1999/xhtml">
	<div>
		<div class="gazhiAppMain">
			<header>
				<div class="contactsListTop">
					<div class="rollBack" @click="toBack()"></div>
					<div class="searchMain">交易记录</div>
				</div>
			</header>
			<div class="transactionRecodeMain">
				<div class="transactionRecodeChart">
					<div class="transactionRecodeChartTop">
						<div class="changeTime">
							<span>{{dataByMonth}}</span>
							<input type="month" @change="timeChange()" v-model="inputVal" />
						</div>
						<div class="expenditure">
							<span class="into">支出</span>
						</div>
						<div class="income">
							<span class="out">收入</span>
						</div>
					</div>
					<div class="transactionRecodeChartMain">
						<div class="recodeChart">
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
							<div class="getChartByDay">
								<div class="out"></div>
								<div class="into"></div>
							</div>
						</div>
						<div class="dataDetail">
							<span class="flex1" style="text-align: left;">1</span>
							<span class="flex5">11</span>
							<span class="flex5">21</span>
							<span class="flex1" style="text-align: right;">31</span>
						</div>
					</div>
				</div>
				<div class="transactionLists">
					<div class="nullList">无交易记录</div>
					<!--<div class="transactionList" @click="showDetail()">
						<div class="head">
							<div class="headInto"></div>
						</div>
						<div class="contentMain">
							<div class="address">员工食堂</div>
							<div class="time">01-30 11:52</div>
						</div>
						<div class="money">-72.00</div>
					</div>-->
					<!--<div class="transactionList">
						<div class="head">
							<div class="headInto"></div>
						</div>
						<div class="contentMain">
							<div class="address">员工食堂</div>
							<div class="time">01-30 11:52</div>
						</div>
						<div class="money">-72.00</div>
					</div>
					<div class="transactionList">
						<div class="head">
							<div class="headInto"></div>
						</div>
						<div class="contentMain">
							<div class="address">员工食堂</div>
							<div class="time">01-30 11:52</div>
						</div>
						<div class="money">-72.00</div>
					</div>
					<div class="transactionList">
						<div class="head">
							<div class="headInto"></div>
						</div>
						<div class="contentMain">
							<div class="address">员工食堂</div>
							<div class="time">01-30 11:52</div>
						</div>
						<div class="money">-72.00</div>
					</div>
					<div class="transactionList">
						<div class="head">
							<div class="headInto"></div>
						</div>
						<div class="contentMain">
							<div class="address">员工食堂</div>
							<div class="time">01-30 11:52</div>
						</div>
						<div class="money">-72.00</div>
					</div>
					<div class="transactionList">
						<div class="head">
							<div class="headInto"></div>
						</div>
						<div class="contentMain">
							<div class="address">员工食堂</div>
							<div class="time">01-30 11:52</div>
						</div>
						<div class="money">-72.00</div>
					</div>
					<div class="transactionList">
						<div class="head">
							<div class="headInto"></div>
						</div>
						<div class="contentMain">
							<div class="address">员工食堂</div>
							<div class="time">01-30 11:52</div>
						</div>
						<div class="money">-72.00</div>
					</div>
					<div class="transactionList">
						<div class="head">
							<div class="headInto"></div>
						</div>
						<div class="contentMain">
							<div class="address">员工食堂</div>
							<div class="time">01-30 11:52</div>
						</div>
						<div class="money">-72.00</div>
					</div>-->
				</div>
			</div>
		</div>
		<div class="transactionDetail" id="transationDetail">
			<div class="topDetail">
				<div class="address">
					<div class="headInto"></div>
				</div>
				<span>员工食堂</span>
			</div>
			<div class="moneyMain">
				<div class="key">付款金额</div>
				<div class="value">
					<span>¥72.00</span>
				</div>
			</div>
			<div class="otherMain">
				<div class="key">当前状态</div>
				<div class="value">支付成功</div>
			</div>
			<div class="otherMain">
				<div class="key">支付时间</div>
				<div class="value">2017-01-01 11:11:11</div>
			</div>
			<div class="otherMain">
				<div class="key">支付方式</div>
				<div class="value">账户余额</div>
			</div>
			<div class="otherMain">
				<div class="key">交易单号</div>
				<div class="value">65465465655555555558</div>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		data() { //数据绑定
			return {
				"setFlag": true,
				"dataByMonth": "",
				"inputVal": ""
			}
		},
		created() { //实例创建完成后执行的钩子

		},
		mounted() { //数据的初始化，整个实例中只执行一次
			var nowDate = new Date();
			var year = nowDate.getFullYear();
			var month = nowDate.getMonth() + 1 < 10 ? "0" + (nowDate.getMonth() + 1) :
				nowDate.getMonth() + 1;
			this.dataByMonth = year + "." + month;
		},
		methods: { //执行的方法
			showDetail() {
				$("#transationDetail").css({
					"top": "61px"
				})
			},
			toBack() {
				var type = $("#transationDetail").css("top");
				if(type == "61px") {
					$("#transationDetail").css({
						"top": "100%"
					})
				} else {
					this.$router.go(-1);
				}
			},
			timeChange() {
				if(this.inputVal == "" || this.inputVal == undefined || this.inputVal == null){
					this.dataByMonth = "";
					return;
				}
				var newDate = new Date(this.inputVal);
				var year = newDate.getFullYear();
				var month = newDate.getMonth() + 1 < 10 ? "0" + (newDate.getMonth() + 1) :
					newDate.getMonth() + 1;
				this.dataByMonth = year + "." + month;
			}
		}
	}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='css'>
	@import "../assets/css/transationRecord.css";
</style>