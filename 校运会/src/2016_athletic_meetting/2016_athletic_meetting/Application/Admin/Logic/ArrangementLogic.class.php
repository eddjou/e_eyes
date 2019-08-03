<?php
// +----------------------------------------------------------------------
// | OneThink [ WE CAN DO IT JUST THINK IT ]
// +----------------------------------------------------------------------
// | Copyright (c) 2013 http://www.onethink.cn All rights reserved.
// +----------------------------------------------------------------------
// | Author: 麦当苗儿 <zuojiazi@vip.qq.com> <http://www.zjzit.cn>
// +----------------------------------------------------------------------

namespace Admin\Logic;

/**
 * 文档模型子模型 - 学院模型
 */
class ArrangementLogic extends BaseLogic{
	/* 自动验证规则 */
	protected $_validate = array(
		array('arrange', 'require', '请输入比赛项目', self::MUST_VALIDATE , 'regex', self::MODEL_BOTH),
		array('day', 'number', '请输入比赛日期', self::MUST_VALIDATE , 'regex', self::MODEL_BOTH),
		//array('time','require','请输入比赛时间',self::MUST_VALIDATE,'regex',self::MODEL_BOTH),
		array('interval','number','请确认比赛区段（上(下)午）',self::MUST_VALIDATE,'regex',self::MODEL_BOTH),
		array('champion','require','请输入冠军得主',self::MUST_VALIDATE,'regex',self::MODEL_BOTH),
	);

	/* 自动完成规则 */
	protected $_auto = array();
/**
	 * 获取模型详细信息
	 * @param  integer $id 文档ID
	 * @return array       当前模型详细信息
	 * @author huajie <banhuajie@163.com>
	 */

	/**
	 * 新增或添加一条学院详情
	 * @param  number $id 文章ID
	 * @return boolean    true-操作成功，false-操作失败
	 * @author 麦当苗儿 <zuojiazi@vip.qq.com>
	 */
	public function update($id = 0){
		/* 获取模型数据 */
		$data = $this -> create();
		if($data === false){
			return false;
		}
		$college = D('College','Logic');
		$data['college'] = $college->where(array('college'=>$data['college']))->getField('id');
		/* 添加或更新数据 */
		if(empty($data['id'])){//新增数据
			$data['id'] = $id;
			$id = $this->add($data);
			if(!$id){
				$this->error = '新增详细内容失败！';
				return false;
			}
		} else { //更新数据
			$status = $this->save($data);
			if(false === $status){
				$this->error = '更新详细内容失败！';
				return false;
			}
		}
		return true;
	}
	/**
	 * 获取模型详细信息
	 * @param  integer $id 文档ID
	 * @return array       当前模型详细信息
	 */
	public function detail($id){
		$data = $this->field(true)->find($id);
		if(!$data){
			$this->error = '获取详细信息出错！';
			return false;
		}
		$college = D('College','Logic');
		$data['college'] = $college->where(array('id'=>$data['college']))->getField('college');
		return $data;
	}
	/**
	 * 获取文章的详细内容
	 * @return boolean
	 * @author huajie <banhuajie@163.com>
	 *
	* protected function getContent(){
	* 	$type = I('post.type');
	* 	$content = I('post.content');
	*	if($type > 1){	//主题和段落必须有内容
	*		if(empty($content)){
	*			return false;
	*		}
	*	}else{			//目录没内容则生成空字符串
	*		if(empty($content)){
	*			$_POST['content'] = ' ';
	*		}
	*	}
	*	return true;
	* }
    **/
	/**
	 * 保存为草稿
	 * @return true 成功， false 保存出错
	 * @author huajie <banhuajie@163.com>
	 */
	public function autoSave($id = 0){
		$this->_validate = array();

		/* 获取文章数据 */
		$data = $this->create();
		if(!$data){
			return false;
		}
		$college = D('College','Logic');
		$data['college'] = $college->where(array('college'=>$data['college']))->getField('id');
		/* 添加或更新数据 */
		if(empty($data['id'])){//新增数据
			$data['id'] = $id;
			$id = $this->add($data);
			if(!$id){
				$this->error = '新增详细内容失败！';
				return false;
			}
		} else { //更新数据
			$status = $this->save($data);
			if(false === $status){
				$this->error = '更新详细内容失败！';
				return false;
			}
		}

		return true;
	}
}