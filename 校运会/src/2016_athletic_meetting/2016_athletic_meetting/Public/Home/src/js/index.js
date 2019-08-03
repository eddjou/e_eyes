$(function() {
    // 开始界面选择队伍
    // 160412---分离两个js文件 = = 
    var $select = $(".container-index .select"),
        $options = $(".options"),
        $input = $(".container-index input[type=hidden]"),
        $login = $(".login"),
        dormitory = '请选择你的队伍';

    $select.click(function(event) {
        $options.show()
    });

    $("body").height(window.innerHeight);


  

    $.post("http://2016.eeyes.net/index.php?s=/Home/Index/index",{},function(data){
     //   data = '{"allcollege":[{"college":"\u5f6d\u5eb7\u4e66\u9662"},{"college":"\u52b1\u5fd7\u4e66\u9662"},{"college":"\u5357\u6d0b\u4e66\u9662"},{"college":"\u4ef2\u82f1\u4e66\u9662"},{"college":"\u6587\u6cbb\u4e66\u9662"},{"college":"\u5d07\u5b9e\u4e66\u9662"},{"college":"\u5b97\u6fc2\u4e66\u9662"},{"college":"\u542f\u5fb7\u4e66\u9662"}]}'
      //  console.log(data)
            //data = JSON.parse(data.substr(data.indexOf('{')));

        //console.log(data)

        for(var i = 0; i < data.allcollege.length; i++){
            $('<li class="option list-group-item">' + data.allcollege[i].college + '</li>').appendTo('.options');
        }

        var $option = $(".option");

        $option.click(function(event) {
            var _this = $(this);
            for (var i = 0; i < $option.length; i++) {
                $option.eq(i).removeClass('selected');
            }
            _this.addClass('selected');
            dormitory = _this.text();
            $select.text(dormitory);
            $options.hide();

            $option.css("font-size",window.innerHeight * 0.04 + "px");
        });
    })
      $login.click(function(e){
        e.preventDefault();
        if(dormitory == '请选择你的队伍'){
            alert("请选择你的队伍后再提交！");
            return;
        }
        // 后端先测试下吧。。发送的是一个字符串 dormitory ，若成功应返回一个 "Success!" 的字符串代表接收数据成功
        $.post("http://2016.eeyes.net/index.php?s=/Home/Index/main", {
            'dormitory':dormitory
        }, function(data){
            if(data){
                console.log(data);
                location.href = "http://2016.eeyes.net/index.php?s=/Home/Index/main";
            }
        })
    })

})
