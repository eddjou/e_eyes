// 此处，预处理函数
(window.onload = function() {
    var width = document.documentElement.clientWidth;
    var rem = width / 10;
    document.documentElement.style.fontSize = rem + 'px';
    document.getElementsByTagName('body')[0].style.fontSize = window.innerHeight * 0.025 + 'px';
});
