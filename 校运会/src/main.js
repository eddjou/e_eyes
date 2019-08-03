//日程
$(function(){
    $("#14morn").click(function(e){
        $.ajax({
            url:'',
            type:'get',
            success:function(data){
            $("#14morn").append(data) //data的id命为data14morn
        }})
    })
});
$('#14morn').click(function (e) {
            if ($("#data14morn").css('display') === 'none') {
                $("#data14morn").show()
            }else{
                $("#data14morn").hide()
            }
        });
$(function(){
    $("#14after").click(function(e){
        $.ajax({
            url:'',
            type:'get',
            success:function(data){
            $("#14after").append(data)  //data的id命为data14after
        }})
    })
});
$('#14after').click(function (e) {
            if ($("#data14after").css('display') === 'none') {
                $("#data14after").show()
            }else{
                $("#data14after").hide()
            }
        });
$(function(){
    $("#15morn").click(function(e){
        $.ajax({
            url:'',
            type:'get',
            success:function(data){
            $("#15morn").append(data) //data的id命为data15morn
        }})
    })
});
$('#15morn').click(function (e) {
            if ($("#data15morn").css('display') === 'none') {
                $("#data15morn").show()
            }else{
                $("#data15morn").hide()
            }
        });
$(function(){
    $("#15after").click(function(e){
        $.ajax({
            url:'',
            type:'get',
            success:function(data){
            $("#15after").append(data)  //data的id命为data15after
        }})
    })
});
$('#15after').click(function (e) {
            if ($("#data15after").css('display') === 'none') {
                $("#data15after").show()
            }else{
                $("#data15after").hide()
            }
        });
$(function(){
    $("#d15").click(function(e){
        $(".m_14").hide()
        $(".m_15").show()
        $("#d15").css({'background-color':"rgba(0,0,0,.7)"})
        $("#d14").css({'background-color':"rgba(0,0,0,.3)"})
    })
});
$(function(){
    $("#d14").click(function(e){
        $(".m_15").hide()
        $(".m_14").show()
        $("#d15").css({'background-color':"rgba(0,0,0,.3)"})
        $("#d14").css({'background-color':"rgba(0,0,0,.7)"})
    })
});

//新闻
$(function(){
    $.ajax({
        url:'',
        type:'get',
        success:function(data){
            $("#newslist").html(data)
        }
    })
});
$(function(){
    $("#newslist p").css({'font-size':"0.5rem",'color':"#fff",'margin-top':"0.3125rem",'margin-bottom':"0.3125rem",'margin-left':"10%"})
});
$(function() {
            $("#newslist").click(function(event) {
                var id = '';
                if (event.target.id === '') {
                    id = event.target.children[0].id
                }else{
                    id = event.target.id
                }
                console.log(id)
                $.ajax({
                    url: '',
                    type: 'get',
                    success: function(data) {
                        $("#newsviewport").show()
                        $("#newsviewport").html(data)
                    }
                })
            })
        });
$('#newsviewport').click(function (e) {
            if ($("#newsviewport").css('display') === 'none') {
                $("#newsviewport").show()
            }else{
                $("#newsviewport").hide()
            }
        })
//排行榜
$(function(){
    $("#more").click(function(e){
        $(function(){
        $.ajax({
            url:'',
            type:'get',
            success:function(data){
                $("#ranking_list").append(data)   
    }})
})
    })
});
//进入h5
$(function(){
    $("#h5logo").click(function(event){
            window.location.href="";
        })
    });