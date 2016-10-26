<?php 
$list = [
	'status' => 200,
	'message' => '成功',
	'data' => [
		['name'=>1,'url'=>'/upload/1.jpeg'],
		['name'=>2,'url'=>'/upload/2.jpeg'],
		['name'=>3,'url'=>'/upload/3.jpeg'],
		['name'=>3,'url'=>'/upload/3.jpeg'],
		['name'=>3,'url'=>'/upload/3.jpeg'],
		['name'=>3,'url'=>'/upload/3.jpeg'],
		['name'=>3,'url'=>'/upload/3.jpeg'],
	],
];
echo json_encode($list);die;