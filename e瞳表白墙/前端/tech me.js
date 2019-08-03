/*js 单个网页里面

单线程 控制台 

script	引入

函数function

DOM		关联  document

jquery 库

ajax  XMLHttpRequest

new 构造函数 产生一个对象

// onreadystatechange

// responseText

// status

http 浏览器 请求 ------> 服务器
	 浏览器 响应 <------ 服务器

事件监听

*/

$('#submit').click(function (event) {
	// body...
})

$.ajax({
	url:'/dsadas',
	data:{
		username:'ssss',
		password:'****'
	},
	success:function (data) {
		// body...
	},
	error:function () {
		// body...
	}
})