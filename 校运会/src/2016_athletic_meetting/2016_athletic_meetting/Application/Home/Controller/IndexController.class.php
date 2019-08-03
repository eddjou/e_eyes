<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.onethink.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: 麦当苗儿 <zuojiazi@vip.qq.com> <http://www.zjzit.cn>
// +----------------------------------------------------------------------

namespace Home\Controller;
use OT\DataDictionary;

/**
 * 前台首页控制器
 * 主要获取首页聚合数据
 */
class IndexController extends HomeController {

	//系统首页

      public function index(){

        $college = D('DocumentCollege');
        $allcollege = $college ->field('college')  -> select(); // 书院
        $this -> assign('allcollege',$allcollege);   
        $array = array('allcollege'=>$allcollege);
     //     $array = json_encode($array);
    //    var_dump($allcollege);
        if(IS_POST){  
             $this->ajaxReturn($array,'JSON');  
        }else{
            $this->display();
        }

            
    }
       public function main(){
        $document = D('Document');  //新闻           
        session_start();
      //  $college =D('Document');
        
    //    $arrangement = D('Arrangement','Logic')->jianxun($day=18,...);
        $arrangement = D('DocumentArrangement');//简讯
        $college = D('DocumentCollege');
        //var_dump($_GET['dormitory']);exit();
   //     $mycollege = I('dormitory');
        if(I('dormitory')) 
        {  $mycollege = I('dormitory');//暂定,我的队伍设置
           $_SESSION['name'] = $mycollege;
        }else{
           $mycollege =  $_SESSION['name'] ;
        }
        $myid = $college -> where("college = '%s' ",$mycollege) -> field('id') ->  find();
        $medal = $college ->field('college,gold') -> order('gold desc') -> select(); // 书院金牌排行
        $num_gold = $college->sum('gold');
        $mymedal = $college -> where("id = '%d' ",$myid) -> field('college,gold') ->  find(); // 折线图
   //     $medalrg = $college -> where("college = '%s' ",$mycollege) -> field('goldre') ->  select(); // 折线图
    //    $this -> assign('medalrg',$medalrg);
        $this -> assign('medal',$medal);
        $this -> assign('mymedal',$mymedal);
        //var_dump($medal);
        $map = array('day'=>'17','interval'=>'1');
        $info1 = $arrangement -> where($map) ->field('arrange,champion,start_time')-> select(); //17号上午竞赛简讯
        $map = array('day'=>'17','interval'=>'2');
        $info2 = $arrangement -> where($map) -> field('arrange,champion,start_time')->select(); //17号下午竞赛简讯
        $map = array('day'=>'18','interval'=>'1'); 
        $info3 = $arrangement -> where($map) ->field('arrange,champion,start_time')->select(); //18号上午竞赛简讯
        $map = array('day'=>'18','interval'=>'2');
        $info4 = $arrangement -> where($map) -> field('arrange,champion,start_time')->select(); //18号下午竞赛简讯
        $this -> assign('info1',$info1);
        $this -> assign('info2',$info2);
        $this -> assign('info3',$info3);
        $this -> assign('info4',$info4);

        $time = time();
        $time1 = $time - 7200; 
		$data = date("Y-m-d H:i:s", $time);
        $data1 = date("Y-m-d H:i:s", $time1);
        $map1['time'] = array(array('gt',$data1),array('lt',$data)) ;
   //    var_dump($map1);
       $num_alone1 = $arrangement ->where("college = '%d'",$myid)-> where($map1) -> count();

      
         $time2 = $time - 14400;   
		// $data = date("Y-m-d H:i:s", $time);
		 $data2 = date("Y-m-d H:i:s", $time2);
        $map1['time'] = array(array('gt',$data2),array('lt',$data1)) ;
        $num_alone2 = $arrangement ->where("college = '%d'",$myid)-> where ($map1) -> count();


           $time3 = $time - 21600;   
		// $data = date("Y-m-d H:i:s", $time);
		 $data3 = date("Y-m-d H:i:s", $time3);
        $map1['time'] = array(array('gt',$data3),array('lt',$data2)) ;
        $num_alone3 = $arrangement ->where("college = '%d'",$myid)-> where ($map1) -> count();


           $time4 = $time - 28800;   
		// $data = date("Y-m-d H:i:s", $time);
		 $data4 = date("Y-m-d H:i:s", $time4);
        $map1['time'] = array(array('gt',$data4),array('lt',$data3)) ;
        $num_alone4 = $arrangement ->where("college = '%d'",$myid)-> where ($map1) -> count();

            $time5 = $time - 36000;   
		// $data = date("Y-m-d H:i:s", $time);
		 $data5 = date("Y-m-d H:i:s", $time5);
        $map1['time'] = array(array('gt',$data5),array('lt',$data4)) ;
        $num_alone5 = $arrangement ->where("college = '%d'",$myid)-> where ($map1) -> count();


        $this -> assign('num_alone1',$num_alone1);
        $this -> assign('num_alone2',$num_alone2);
        $this -> assign('num_alone3',$num_alone3);
        $this -> assign('num_alone4',$num_alone4);
        $this -> assign('num_alone5',$num_alone5);

        //var_dump($info1);
        //$map=array('day'=>17,'college'=>'xx书院xxx');
     //   $num_gold = $arrangement->where("champion != '%s'","NULL")->count();
        $this -> assign('num_gold',$num_gold);
     //   $college_gold = $arrangement -> where("champion = '%s'",$mycollege)->count();
    //    $this -> assign('college_gold',$college_gold);
        $report = $document ->where("model_id = '%d'",array(2)) -> field('id,title') -> select(); // 新闻播报
        $this -> assign('report',$report);
        //echo $report;
        //$array = array('$medal','$mymedal','$medalrg','$info1','$info2','$info3','$info4','$report');
        if(IS_POST){
      //      $var = I('post.college');
      //  $mymedal = $college -> where("college = '%s' ",$var) -> field('college,gold') ->  find(); // 折线图

            $array=array(
           'medal'=>$medal,
           'mycollege'=>$mycollege,
            'num_gold'=>$num_gold,
            'mymedal'=>$mymedal,
            'info1'=>$info1,
            'info2'=>$info2,
            'info3'=>$info3,
            'info4'=>$info4,
            'num_alone1'=>$num_alone1,
           'num_alone2'=>$num_alone2,
            'num_alone3'=>$num_alone3,
            'num_alone4'=>$num_alone4,
            'num_alone5'=>$num_alone5,
            'report'=>$report,
           
          );
       $this->ajaxReturn($array,'JSON');  
       } else {
                    $this->display();
       }
       

    }
  
    public function article(){
  
             $article = D('DocumentArticle');
             $id =I('passageId');
             $report = $article -> where("id = '%d'",$id) ->field('content')-> select();
             $this -> assign('report',$report);
             $this -> ajaxReturn($report,'JSON');
        //     $this ->display();

    }
}