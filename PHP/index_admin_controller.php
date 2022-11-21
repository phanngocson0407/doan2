<?php
session_start();
include_once('connect_database.php');
if(isset($_REQUEST['username']) AND !empty($_REQUEST['username']))
{
    
    $username=$_REQUEST['username'];
}
else{
    $_SESSION['err']="Sai tài khoản, mật khẩu, email hoặc để trống";
    return header("Location: ../ADMIN/index.php");
}

if(isset($_REQUEST['password']) AND !empty($_REQUEST['password']))
{
    
    $password=$_REQUEST['password'];
}
else{
    $_SESSION['err']="Sai tài khoản, mật khẩu hoặc email hoặc để trống";
    return  header("Location: ../ADMIN/index.php");
}

if(isset($_REQUEST['email']) AND !empty($_REQUEST['email']))
{
    
    $email=$_REQUEST['email'];
}
else{
    $_SESSION['err']="Sai tài khoản, mật khẩu hoặc email hoặc để trống";
    return  header("Location: ../ADMIN/index.php");
}


$sql="SELECT * 
        FROM admin WHERE 
        username='$username'AND password='$password'AND email='$email'
";
$result = db_qr($sql);
$num= db_nums($result);
if($num>0)
{   
    $_SESSION['err']="";
    return header("Location: ../ADMIN/trangchu.php");

}
else{
    
    return header("Location: ../ADMIN/index.php");

}