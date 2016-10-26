<?php
class Mysql{
	public $mysql_server_name = 'localhost';
	public $mysql_username = 'root';
	public $mysql_password = '';
	public $mysql_database = 'cartoon';

	public function innsertData($url){
		$conn=mysql_connect($this->mysql_server_name,$this->mysql_username,$this->mysql_password) or die("error connecting") ; //连接数据库
		mysql_query("set names 'utf8'"); //数据库输出编码 应该与你的数据库编码保持一致.南昌网站建设公司百恒网络PHP工程师建议用UTF-8 国际标准编码.
		mysql_select_db($this->mysql_database); //打开数据库
		$sql = "insert into pic (url) values ('$url')";
		mysql_query($sql);
		mysql_close(); //关闭MySQL连接
	}

	public function upload($uploadFile){
		if ((($uploadFile["fileList"]["type"] == "image/gif")
		|| ($uploadFile["fileList"]["type"] == "image/jpeg")
		|| ($uploadFile["fileList"]["type"] == "image/pjpeg"))
		&& ($uploadFile["fileList"]["size"] < 5*1024*1024)){
		  	if ($uploadFile["fileList"]["error"] > 0){
		    	echo "Return Code: " . $uploadFile["fileList"]["error"] . "<br />";
		    }else{
			    echo "Upload: " . $uploadFile["fileList"]["name"] . "<br />";
			    echo "Type: " . $uploadFile["fileList"]["type"] . "<br />";
			    echo "Size: " . ($uploadFile["fileList"]["size"] / 1024) . " Kb<br />";
			    echo "Temp file: " . $uploadFile["fileList"]["tmp_name"] . "<br />";
			    if (file_exists("upload/" . $uploadFile["fileList"]["name"])){
			      	echo $uploadFile["fileList"]["name"] . " already exists. ";
			    }else{
			    	$filename=explode(".",$uploadFile['fileList']['name']);
		            $filename[0]= date('Ymd') .'_'. time(); //设置随机数长度
		            $name = implode(".",$filename);
				    if(move_uploaded_file($uploadFile["fileList"]["tmp_name"],"upload/" . $name)){
				    	// $mysql = new Mysql();
				    	$this->innsertData("upload/" . $name);
				    }
				    echo "Stored in: " . "upload/" . $uploadFile["fileList"]["name"];
		    	}
		    }
		}else{
		  	echo "Invalid file";
		}
	}
}

$mysql = new Mysql();
$mysql->upload($_FILES);
?>