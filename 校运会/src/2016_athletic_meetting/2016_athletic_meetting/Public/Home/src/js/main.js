
// 从后端发送过来的数据
var mycollegeRank;

$.post('http://2016.eeyes.net/index.php?s=/Home/Index/main',{},function(data){
    $('.list').css('top',window.innerHeight)

    // 先对我的书院进行处理
    for(var i = 0; i < data.medal.length; i++){
        if(data.medal[i].college == data.mycollege){
            mycollegeRank = i + 1;
            break;
        }
        if(i == data.medal.length - 1)mycollegeRank = undefined;
    }


    // 报道aside和content高度同步
    var messageTime = $(".messages .message-time"),
        messages = $(".messages");
    messagesHeight = messages.height();

    messageTime.css({
        height: messagesHeight + 'px',
        lineHeight: messagesHeight + 'px',
    });

    $('#placeholder').width(window.innerWidth * 0.8).height(window.innerWidth * 0.8);
    $('#line').width(window.innerWidth * 0.8).height(window.innerWidth * 0.6);
    $('#myDorP').css('margin-top',window.innerWidth + 'px').css('margin-left',window.innerWidth * 0.25 + 'px');
    $('#myDorLine').css('margin-top',window.innerWidth * 0.8 + 'px').css('margin-left',window.innerWidth * 0.25 + 'px');

    if(typeof mycollegeRank === 'undefined'){
        $('#report').hide();
    }
    else{
        // 饼状图
        var dataPie = [],
            placeholder = $(".pie");
        
        dataPie[0] = {label:data.mycollege, data:parseInt(data.mymedal.gold)};
        dataPie[1] = {label:'总金牌数', data:parseInt(data.num_gold)};

        for (var i = 0; i < placeholder.length; i++) {
            $.plot(placeholder[i], dataPie, {
                series: {
                    pie: {
                        show: true
                    },
                },
                colors:['#ddd','#fff']
            });
        }
        // 折线图
        var line = $(".line").eq(0);
        var now = new Date();
        $.plot("#line", [[
                [now.getHours() - 8,parseInt(data.num_alone1)],
                [now.getHours() - 6,parseInt(data.num_alone2)],
                [now.getHours() - 4,parseInt(data.num_alone3)],
                [now.getHours() - 2,parseInt(data.num_alone4)],
                [now.getHours(),parseInt(data.num_alone5)]
            ]],{
            series:{
                lines:{
                    fill:true
                }
            },
            colors:['rgba(255,255,255,1)'],
            grid:{
                show:true,
                borderColor:"#fff"
            }
        })
        $('#line').css('background','rgba(0,0,0,0)')
        $('.flot-text').css('color','rgb(255, 255, 255)')
    }

    // 滚动事件
    var $footer = $("footer"),
        footerFixedFlag = 0,
        footerIndex,
        initTop = 0,
        deltaTop = 0,
        footerState = 1;    // move 1  fix 2  move-top 3

    setTimeout(reBoundScroll,5);

    function reBoundScroll(){

        var passageTop = $("#passage").offset().top;
        var commentsTop = $("#comments").offset().top;
        var listTop = $('#list').offset().top;
        var $nav = $('.nav-container');
        var timeId;

        $(window).off('scroll');
        $(window).on('scroll',function(){

            var windowTop = $(document).scrollTop();

            // footer 的设置
            if(windowTop > initTop){
                // console.log('向下');

                deltaTop -= (windowTop - initTop)
                if(deltaTop < 0) deltaTop = 0;

                if(footerState != 1 && windowTop < $nav.offset().top + $nav.height()){
                    $footer.removeClass().addClass("move");
                    footerState = 1;
                }
                else if(footerState != 3 && windowTop > $nav.offset().top + $nav.height() && deltaTop == 0){
                    $footer.removeClass().addClass("fix");
                    timeId = setTimeout(function(){
                        $footer.removeClass().addClass("move-top");
                    },1000)
                    footerState = 3;
                }
            }
            else if (windowTop < initTop){
                // console.log('向上')
                clearTimeout(timeId);

                deltaTop += (initTop - windowTop)
                if(deltaTop > $footer.height() * 2) deltaTop = $footer.height() * 2;

                if(footerState != 1 && windowTop < $nav.offset().top + $nav.height() + 5){
                    $footer.removeClass().addClass("move");
                    footerState = 1;
                }
                else if(footerState != 2 && windowTop > $nav.offset().top + $nav.height() && deltaTop == $footer.height() * 2){
                    $footer.removeClass().addClass("fix");
                    footerState = 2;
                }
            }

            if(footerIndex != 1 && windowTop < passageTop - 5){
                $("footer .list-inline li").removeClass("selected");
                $("footer .list-inline li").eq(0).addClass("selected");
                footerIndex = 1;
            }

            if(footerIndex != 2 && windowTop > passageTop - 5 && windowTop < commentsTop - 5){
                $("footer .list-inline li").removeClass("selected");
                $("footer .list-inline li").eq(1).addClass("selected");
                footerIndex = 2;
            }

            if(footerIndex != 3 && windowTop > commentsTop - 5){
                $("footer .list-inline li").removeClass("selected");
                $("footer .list-inline li").eq(2).addClass("selected");
                footerIndex = 3;
            }
            initTop = windowTop;
        })
    }

    // 加载奖牌数
    
    var curRank = 0;        // 当前加载的排名
    var rankPeroid = 8;     // 每次加载的排名数
    
    var initHtml = ''; 

    if(typeof mycollegeRank === 'undefined'){
        initHtml = $("#medal-rank").html();
    }
    else{
        initHtml = $("#medal-rank").html() + '<tr> <td>' + mycollegeRank + '</td> <td>' + data.mycollege + '</td> <td>' + data.mymedal.gold + '</td></tr>';
    }

    $('#medal-rank').html(initHtml);

    // 在页面加载时进行加载，须保证排行榜元素个数大于 rankPeroid
    addRank(0,curRank + rankPeroid < data.medal.length ? curRank + rankPeroid : data.medal.length);
    curRank += rankPeroid;

    $('#more-rank').click(function(){
        var addEnd = curRank + rankPeroid < data.medal.length ? curRank + rankPeroid : data.medal.length;
        addRank(curRank, addEnd);
        curRank += rankPeroid;
    })

    $('#myDorLineSpan,#myDorSpan').text(data.mycollege);


    // 加载更多的奖牌
    function addRank(start, end){
        var rankHtml = '';
        for(i = start; i < end; i++){
            switch(i){
                case 0: rankHtml += '<tr><td id="img_gold_cur"> <td>' + data.medal[i].college + '</td> <td>' + data.medal[i].gold + '</td></tr>';break;
                case 1: rankHtml += '<tr><td id="img_sliver_cur"> <td>' + data.medal[i].college + '</td> <td>' + data.medal[i].gold + '</td></tr>';break;
                case 2: rankHtml += '<tr><td id="img_copper_cur"> <td>' + data.medal[i].college + '</td> <td>' + data.medal[i].gold + '</td></tr>';break;
                default: rankHtml += '<tr> <td>' + (i + 1) + '</td> <td>' + data.medal[i].college + '</td> <td>' + data.medal[i].gold + '</td></tr>';break;
            }
        }
        $('#more-rank').before($(rankHtml));
        setTimeout(function(){
            $('#img_gold_cur').prepend($('#img_gold'))
            $('#img_sliver_cur').prepend($('#img_silver'))
            $('#img_copper_cur').prepend($('#img_copper'))
        },15)
        
        if(end == data.medal.length){
            $('#more-rank').remove();
        }
    }


    // 简报
    var $asideContent = $("#aside-content"),
        $sectionContent = $("#section-content"),
        $firstDay = $("#first-day"),
        $secondDay = $("#second-day");

    // 此处设置延时是因为可能会有未完全加载完的情况发生
    addReport(1);
    reBound();
    setTimeout(resetHeight,10);



    $('#first-day').on('click',function(){
        addReport(1);
        reBound();
        resetHeight();
        $('#first-day').addClass('selected');
        $('#second-day').removeClass('selected');
    });

    $('#second-day').on('click',function(){
        addReport(2);
        reBound();
        resetHeight();
        $('#first-day').removeClass('selected');
        $('#second-day').addClass('selected');
    });
    
    // 在内容改变后重新设置侧边栏的高度 以及 重新绑定点击事件
    function resetHeight(){
        var sectionHeight = $sectionContent.height();
        $asideContent.height(sectionHeight);
        $firstDay.css({'height' : sectionHeight/2 + 'px', 'line-height' : sectionHeight/2 + 'px'});
        $secondDay.css({'height' : sectionHeight/2 + 'px', 'line-height' : sectionHeight/2 + 'px'});
    }

    function addReport(day){
        var dayStr;
        if(day === 1) {dayStr = 'firstDay';}
        if(day === 2) {dayStr = 'secondDay';}

        var reportHtml = '';

        // 上午
        reportHtml += '<section class="message-content"><div class="content">'
        reportHtml += day === 1 ? '<time>17日 上午</time><div class="detail">' : '<time>18日 上午</time><div class="detail">';
        for(var j = 0; j < data['info' + (day * 2 - 1)].length; j++){
            reportHtml += '<br> <p>项目:' + data['info' + (day * 2 - 1)][j].arrange
            if(typeof data['info' + (day * 2 - 1)][j].start_time != 'undefined' && data['info' + (day * 2 - 1)][j].start_time != "")reportHtml += '</p> <p>开始时间:' + data['info' + (day * 2 - 1)][j].start_time
            reportHtml += '</p> <p>冠军:' + data['info' + (day * 2 - 1)][j].champion + '</p>';
            // 最后闭合 .detail
            if(j === data['info' + (day * 2 - 1)][j].length - 1){reportHtml += '</div>'}
        }
        reportHtml += '</div> </section>';

        // 下午
        reportHtml += '<section class="message-content"><div class="content">'
        reportHtml += day === 1 ? '<time>17日 下午</time><div class="detail">' : '<time>18日 下午</time><div class="detail">';
        for(var j = 0; j < data['info' + (day * 2)].length; j++){
            reportHtml += '<br> <p>项目:' + data['info' + (day * 2)][j].arrange 
            if(typeof data['info' + (day * 2)][j].start_time != 'undefined' && data['info' + (day * 2)][j].start_time != "")reportHtml += '</p> <p>开始时间:' + data['info' + (day * 2)][j].start_time
            reportHtml += '</p> <p>冠军:' + data['info' + (day * 2)][j].champion + '</p>';
            // 最后闭合 .detail
            if(j === data['info' + (day * 2)][j].length - 1){reportHtml += '</div>'}
        }
        reportHtml += '</div> </section>';
        $('#section-content').html(reportHtml);
    }

    // 重新绑定点击事件
    function reBound(){
        $("#section-content .content").off('click');
        // 单击以改变详情是否显示
        $("#section-content .content").on('click',function(){
            $(this).parent().siblings().find(".detail").hide();
            $(this).find(".detail").toggle();
            resetHeight();
        })
    }


    var curPassage = 0;        // 当前加载的新闻
    var passagePeroid = 8;     // 每次加载的新闻数

    // 报道
    if(data.report != null)
    clickMorePassage();

    $('#more-passage').click(function(){clickMorePassage() })

    $('#passageClose, #passageDetail .return').on('click',function(){
        $('#passageDetail').hide();
        $('body').css({
            'overflow-y':'auto'
        })
    })

    $('#passageDetail, #passageDetailContent').height(window.innerHeight - 50);

    function clickMorePassage(){
        var addEnd = curPassage + passagePeroid < data.report.length ? curPassage + passagePeroid : data.report.length;
        addPassage(curPassage, addEnd);
        curPassage += passagePeroid;
    }

    function addPassage(start, end){
        var passageHtml = '';
        for(var i = start; i < end; i++){
            passageHtml += '<li class="list-group-item" id = passage-' + data.report[i].id + '>' + data.report[i].title + '</li>';
        }
        $('#more-passage').before(passageHtml);
        if(end == data.report.length){
            $('#more-passage').remove();
        }
        reShowPassage();
    }

    function reShowPassage(){
        $('.comments .list-group-item').off('click');
        $('.comments .list-group-item').on('click',function(){
            var passageId = parseInt($(this).attr('id').substr(8));

            // 单击标题请求新闻数据
            // 新闻数据应包含 h3 p img 
            $.post('http://2016.eeyes.net/index.php?s=/Home/Index/article',{
                'passageId':passageId
            },function(data){
                $('#passageDetailContent').html(data[0].content);
            })

            timeId = setTimeout(function(){
                $footer.removeClass().addClass("move-top");
            },1000)
            footerState = 3;

            $('#passageDetail').show();
            $('body').css({
                'overflow-y':'hidden'
            })
        })
    }
})