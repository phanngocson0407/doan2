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
    
     

}
else{
    
    $_SESSION['err']="Usernaame hoặc pass không đúng";
    return header("Location: ../HTML/dangnhap.php");

}