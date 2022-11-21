<?php
session_start();
include_once('connect_database.php');
if(isset($_REQUEST['username']) AND !empty($_REQUEST['username']))
{
    $username=$_REQUEST['username'];
}
else{
    return header("Location: ../HTML/dangnhap.php");
}

if(isset($_REQUEST['password']) AND !empty($_REQUEST['password']))
{
    $password=$_REQUEST['password'];
}
else{
    return  header("Location: ../HTML/dangnhap.php");
}

 

$sql="SELECT * 
        FROM user WHERE username='$username' AND password='$password'
";
$result = db_qr($sql);
$num= db_nums($result);
if($num>0)
{   
    $_SESSION['err']="";
    
    return header("Location: ../HTML/Project_CN_BanHang.php");

}
else{
    
    $_SESSION['err']="Usernaame hoặc pass không đúng";
    return header("Location: ../HTML/dangnhap.php");

}