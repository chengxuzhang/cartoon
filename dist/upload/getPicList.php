<?php
class Mysql{
	public $mysql_server_name = 'localhost';
	public $mysql_username = 'root';
	public $mysql_password = '';
	public $mysql_database = 'cartoon';

	private function connectData(){
		$conn=mysql_connect($this->mysql_server_name,$this->mysql_username,$this->mysql_password) or die("error connecting") ; //连接数据库
		mysql_query("set names 'utf8'"); //数据库输出编码 应该与你的数据库编码保持一致.南昌网站建设公司百恒网络PHP工程师建议用UTF-8 国际标准编码.
		mysql_select_db($this->mysql_database); //打开数据库
		return $conn;
	}

	public function selectData($page = 0,$perPage = 10){
		$conn = $this->connectData();
		$limit = ($page*$perPage).",10";
		$sql ="select * from `pic` order by id DESC limit ".$limit; //SQL语句
		$result = mysql_query($sql,$conn); //查询
		mysql_close(); //关闭MySQL连接
		$data = [];
		while($row = mysql_fetch_array($result)){
			$temp = ['id'=>$row['id'],'url'=>$row['url'],'name'=>$row['name']];
			array_push($data,$temp);
		}
		return [
			'status' => 200,
			'message' => '成功',
			'data' => $data,
		];
	}

	// 删除某条数据
	public function delData($id){
		$conn = $this->connectData();
		$sql ="delete from `pic` where id=".$id; //SQL语句
		$result = mysql_query($sql,$conn); //查询
		mysql_close(); //关闭MySQL连接
		if($result){
			return ['status'=>'200'];
		}else{
			return ['status'=>'400'];
		}
	}

	// 获取图片的总数
	public function getTotal(){
		$conn = $this->connectData();
		$sql ="select count(*) from `pic`"; //SQL语句
		$result = mysql_query($sql,$conn); //查询
		if(mysql_num_rows($result)){
		   $rs=mysql_fetch_array($result);
		   $count=$rs[0];
		}else{
		    $count=0;
		}
		mysql_close(); //关闭MySQL连接
		return ['total'=>$count];
	}
}
$mysql = new Mysql();
if(isset($_GET['page']) && isset($_GET['perPage'])){
	$data = $mysql->selectData($_GET['page'],$_GET['perPage']);
}else if(isset($_GET['id'])){
	$data = $mysql->delData($_GET['id']);
}else{
	$data = $mysql->getTotal();
}
echo json_encode($data);die;
?>