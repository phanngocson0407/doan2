<?php
session_start();
include_once('connect_database.php');

$username=$_REQUEST['username'];
$password=$_REQUEST['password'];

$sql="SELECT * 
        FROM customer WHERE username='$username' AND password='$password'
";
$result = db_qr($sql);
$num= db_nums($result);
if($num>0)
{   
    $_SESSION['err']="";
    header("Location: ../web.php");

}
else{
    
    $_SESSION['err']="Usernaame hoặc pass không đúng";
    header("Location: ../index.php");

}