<template>
	<div id="app">
		<router-view/>
	</div>
</template>

<script>
	export default {
		name: 'App'
	}
</script>
<style>
	body {
		padding: 0px;
		margin: 0px;
	}
	
	* {
		font-family: 'sans-serif';
		font-weight: 400;
		font-style: normal;
		touch-action: pan-y;
		-webkit-overflow-scrolling: touch;
		-webkit-overflow-scrolling: touch;
		-webkit-touch-callout: none;
		-webkit-tap-highlight-color: rgba(0, 0, 0, 0);
	}
	
	input {
		outline: none;
		padding: 0;
		margin: 0;
	}
	/*头部样式*/
	
	header {
		width: 100%;
		height: 60px;
		border-bottom: 2px solid #F7F4F4;
	}
	
	.gazhiAppMain {
		width: 100%;
		height: auto;
		padding: 0 30px;
		background-color: white;
		box-sizing: border-box;
	}
	
	.noneValue {
		width: 100%;
		height: 35px;
		text-align: center;
		line-height: 35px;
		color: #E5E5E5;
		font-size: 14px;
	}
	/*弹框样式*/
	/*.bombMain{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0px;
		left: 0px;
		z-index: 1314520;
		background: rgba(0,0,0,0);
	}
	.bombMain*/
	
</style>