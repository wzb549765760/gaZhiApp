<template>
	<div>
		<!--详细信息-->
		<div class="memberImf" v-if="showFlag">
			<div class="contactsImfTop">
				<div class="setTop">
					<div class="rollBack" @click="$router.go(-1)"></div>
				</div>
				<div class="headLogo">
					<img src="../assets/img/memberlogo.png" />
				</div>
				<div class="imfDeatil">
					<div class="realyName">{{name}}</div>
				</div>
			</div>
			<div class="imfMain" style="height: 65%;">
				<div class="companyName">{{companyName}}</div>
				<div class="otherName detailMibile">+86 {{phone}}</div>
				<div class="otherName detailContactsNum">{{visiteNum}}人&nbsp;&nbsp;来访</div>
				<div class="otherName detailReason">{{visiteResion}}</div>
				<div class="otherName detailType">
					<span v-if="status ==1">来访申请</span>
					<span v-if="status ==2" style="color: #869DF8;">访问中</span>
					<span v-if="status ==3">已访问</span>
					<span v-if="status ==4" style="color: #CCCCCC;">拒绝访问</span>
				</div>
				<div class="otherName detailTime">{{visitTime}}</div>
				<div class="detailOperation">
					<!--未访问：电话 接受 拒绝
						访问中： 电话 加联系人 结束/电话 删联系人 结束
						已访问： 电话 加联系人 删除/电话 删联系人 刪除
						拒绝访问：删除-->
					<div class="opetationList delete" v-if="status == '4' || status == '3'" @click="otheroperation('del','删除')"></div>
					<!--刪除removeContact-->
					<div class="opetationList removeOperation" v-if="status == '1'" @click="otheroperation('nopassVisit','拒絕访问 ','4')"></div>
					<!--拒絕访问 modifyContact-->
					<div class="opetationList overVisit" v-if="status == '2'" @click="otheroperation('overVisit','访问結束','3')"></div>
					<!--访问結束 modifyContact-->
					<div class="opetationList addContancts" v-if="isContact == '0' && (status == '2' || status == '3')" @click="otheroperation('newContact','加联系人')"></div>
					<!--加联系人 newContact-->
					<div class="opetationList delContancts" v-if="isContact == '1' && (status == '2' || status == '3')" @click="otheroperation('delContent','刪除联系人')"></div>
					<!--刪除联系人removeContact -->
					<div class="opetationList agreeOperation" v-if="status == '1'" @click="otheroperation('agree','接受','2')"></div>
					<!--接受 modifyContact-->
					<div class="opetationList mobileOperation" @click="getMobile()" v-if="status != 4"></div>
					<!--电话-->
				</div>
			</div>
		</div>
		<div class="memberImf" v-if="!showFlag">
			<div class="imfTop" style="height: 40%;">
				<div class="setTop">
					<div class="rollBack" @click="$router.go(-1)"></div>
				</div>
				<div class="headLogo">
					<img src="../assets/img/memberlogo.png" id="contactPhoto" />
				</div>
				<div class="imfDeatil" style="height: 55%;">
					<div class="realyName" style="height: 60%;">
						{{contactName}}
					</div>
					<div class="realyDepartment">
						<span>{{deptName}}</span>
						<span>{{placeName}}</span>
					</div>
				</div>
			</div>
			<div class="imfMain" id="imfMain">
				<div class="companyName detailCompanyName">
					{{contactCompanyName}}
				</div>
				<div class="otherName detailMibile">+86 {{contactMobile}}</div>
				<div class="otherName detailEmail"> {{contactEmail}}</div>
				<div class="otherName detailAddress">
					<span> {{contactAddreee}}</span>
				</div>
				<div class="detailOperation">
					<div class="opetationList addContancts" v-if="isContact == '0'" @click="otheroperation('newContact','加联系人')"></div>
					<!--加联系人 newContact-->
					<div class="opetationList delContancts" v-if="isContact == '1'" @click="otheroperation('delContent','刪除联系人')"></div>
					<!--刪除联系人removeContact -->
					<div class="opetationList mobileOperation" @click="getMobile()"></div>
					<!--电话-->
				</div>
			</div>

		</div>
		<div class="operationBomb">
			<div class="operationMain">
				<div class="operationButtom">
					<a v-show="mobileFlag" @click="callMobileTo()">{{callMobile}}</a>
					<span v-show="!mobileFlag" @click="toOpearation()">{{operation}}</span>
				</div>
				<!--<div class="operationButtom" v-show="endVisit">15069876579</div>-->
				<div class="operationButtom" @click="close()">取消</div>
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
				"contactId": "",
				"contactCompanyName": "",
				"contactMobile": "",
				"contactEmail": "",
				"deptName": "",
				"placeName": "",
				"contactAddreee": "",
				"token": getCookie("token"),
				"bombMobile": false,
				"endVisit": false,
				"mobileFlag": true,
				"contact": "",
				"name": "",
				"companyName": "",
				"headPhoto": "",
				"phone": "",
				"visiteNum": "",
				"visiteResion": "",
				"visitType": "",
				"visitTime": "",
				"status": "1",
				"operation": "",
				"operationType": "",
				"operationStatus": "",
				"showFlag": true,
				"contactName": "",
				"callMobile":"",
				"qrcode":"",
				"empId":"",
				"isContact": "" /*0不是联系人  1是联系人*/
			}
		},
		created() { //实例创建完成后执行的钩子

		},
		mounted() { //数据的初始化，整个实例中只执行一次
			this.contactId = this.$route.query.id;
			this.qrcode = this.$route.query.qrcode;
			this.init();
		},
		methods: { //执行的方法
			callMobileTo(){
				window.location.href = 'tel://'+this.callMobile;
			},
			async init() {
				this.$layer.loading('加载中...');
				let data = await http.get('/contactDetail', {
					token: this.token,
					id: this.contactId,
					qrCode:this.qrcode
				});
				if(data.code == "203") {
					this.$router.push('/Login');
				};
				this.$layer.close();
				this.isContact = data.isContact;
				if(this.qrcode != "" && this.qrcode != null && this.qrcode != undefined){
					this.empId = data.contact.empId;
				}
				if(data.isVisit == 0) {
					var contact = data.contact;
					this.isContact = contact.isContact;
					this.showFlag = false;
					this.contactCompanyName = contact.contactCompany;
					this.contactName = contact.contactName;
					this.contactMobile = contact.contactPhone;
					this.contactEmail = contact.contactEmail;
					this.contactAddreee = contact.contanctConpanyAddr;
					this.callMobile = contact.contactPhone;
					this.deptName = contact.deptName;
					if(contact.placeName == "" || contact.placeName == null || contact.placeName == undefined){
						this.placeName = "职员";
					}else{
						this.placeName = contact.placeName;
					}
					this.status = contact.visitStatus;
				} else {
					this.showFlag = true;
					this.name = data.contact.visitName;
					this.companyName = data.contact.companyName;
					this.status = data.contact.status;
					this.isContact = data.isContact;
					this.visiteNum = data.contact.visitNum;
					this.visiteResion = data.contact.visitReason;
					this.phone = data.contact.visitPhone;
					this.callMobile = data.contact.visitPhone;
					if(checkVal(data.contact.visitTime)) {
						var time = data.contact.visitTime;
						this.visitTime = time.year + "-" + this.changeVal(time.monthValue) + "-" + this.changeVal(time.dayOfMonth) + "   " + this.changeVal(time.hour) + ":" + this.changeVal(time.minute);
					}

				}
			},
			changeVal(val) {
				if(parseInt(val) < 9) {
					return "0" + parseInt(val);
				}
				return val;
			},
			getMobile() {
				this.bombMobile = true;
				this.mobileFlag = true;
				this.showBomb();
			},
			async toOpearation() {
				this.close();
				var type = this.operationType;
				var url = "";
				switch(type) {
					case 'del':
						url = "/removeContact"
						break;
					case 'nopassVisit':
						url = "/modifyContact"
						break;
					case 'newContact':
						url = "/newContact"
						break;
					case 'overVisit':
						url = "/modifyContact"
						break;
					case 'addContent':
						url = "/addContact"
						break;
					case 'delContent':
						url = "/removeContact"
						break;
					case 'agree':
						url = "/modifyContact"
						break;
				}
				var paras = {
					token: this.token,
					contactId: this.contactId
				}
				if(url == "/modifyContact") {
					paras.status = this.operationStatus;
				}
				if(this.qrcode != "" && this.qrcode != null && this.qrcode != undefined){
					paras.empId = this.empId;
				}
				let data = await http.post(url, paras);
				if(data.code == "203") {
					this.$router.push('/Login');
				};
				if(type == "del" || type == "newContact" || type == "delContent") {
					this.$router.push('/ContactsList');
				} else {
					this.init();
				}
			},
			otheroperation(type, content, status) {
				this.mobileFlag = false;
				this.operationType = type;
				this.operation = content;
				this.operationStatus = status;
				this.showBomb();
			},
			showBomb() {
				$(".operationBomb").show();
				setTimeout(function() {
					$(".operationBomb").css({
						"opacity": "1"
					});
					$(".operationBomb .operationMain").css({
						"bottom": "0px"
					})
				}, 100);
			},
			close() {
				$(".operationBomb").css({
					"opacity": "0"
				});
				$(".operationBomb .operationMain").css({
					"bottom": "-140px"
				});
				setTimeout(function() {
					$(".operationBomb").hide();
				}, 500);
			}

		}
	}
</script>
<style scoped lang='css'>
	@import "../assets/css/memberImf.css";
</style>