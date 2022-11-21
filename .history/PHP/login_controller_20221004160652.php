<?php
session_start();
include_once('connect_database.php');

$username=$_REQUEST['username'];
$password=$_REQUEST['password'];

$sql="SELECT * 
        FROM user WHERE username='$username' AND password='$password'
";
$result = db_qr($sql);
$num= db_nums($result);
if($num>0)
{   
    $_SESSION['err']="";
    
    header("Location: ../HTML/Project_CN_BanHang.php");

}
else{
    
    $_SESSION['err']="Usernaame hoặc pass không đúng";
    header("Location: ../HTML/dangnhap.php");

}