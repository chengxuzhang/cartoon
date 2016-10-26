<?php
if ((($_FILES["fileList"]["type"] == "image/gif")
|| ($_FILES["fileList"]["type"] == "image/jpeg")
|| ($_FILES["fileList"]["type"] == "image/pjpeg"))
&& ($_FILES["fileList"]["size"] < 5*1024*1024)){
  	if ($_FILES["fileList"]["error"] > 0){
    	echo "Return Code: " . $_FILES["fileList"]["error"] . "<br />";
    }else{
	    echo "Upload: " . $_FILES["fileList"]["name"] . "<br />";
	    echo "Type: " . $_FILES["fileList"]["type"] . "<br />";
	    echo "Size: " . ($_FILES["fileList"]["size"] / 1024) . " Kb<br />";
	    echo "Temp fileList: " . $_FILES["fileList"]["tmp_name"] . "<br />";
	    if (file_exists("upload/" . $_FILES["fileList"]["name"])){
	      	echo $_FILES["fileList"]["name"] . " already exists. ";
	    }else{
		    move_uploaded_file($_FILES["fileList"]["tmp_name"],
		    "upload/" . $_FILES["fileList"]["name"]);
		    echo "Stored in: " . "upload/" . $_FILES["fileList"]["name"];
    	}
    }
}else{
  	echo "Invalid fileList";
}
die;
?>