<?php
//jjj
include_once('connect_database.php');
if(isset($_REQUEST['ten_admin']) AND !empty($_REQUEST['ten_admin']))
{
    $ten_admin=$_REQUEST['ten_admin'];
}
else{
    $_SESSION['err']="Không được bỏ trống";
    return header("Location: ../ADMIN/dang_ki_admin.php");
}

if(isset($_REQUEST['username']) AND !empty($_REQUEST['username']))
{
    $username=$_REQUEST['username'];
}
else{
    $_SESSION['err']="Không được bỏ trống";
    return header("Location: ../ADMIN/dang_ki_admin.php");
}

if(isset($_REQUEST['password']) AND !empty($_REQUEST['password']))
{
    $password=$_REQUEST['password'];
}
else{
    $_SESSION['err']="Không được bỏ trống";
    return  header("Location: ../ADMIN/dang_ki_admin.php");
}
if(isset($_REQUEST['phone']) AND !empty($_REQUEST['phone']))
{
    $phone=$_REQUEST['phone'];
}
else{
    $_SESSION['err']="Không được bỏ trống";
   return header("Location: ../ADMIN/dang_ki_admin.php");
}


if(isset($_REQUEST['email']) AND !empty($_REQUEST['email']))
{
    $email=$_REQUEST['email'];
}
else{
    $_SESSION['err']="Không được bỏ trống";
   return header("Location: ../ADMIN/dang_ki_admin.php");
}



$sql="INSERT INTO admin
    SET 
    ten_admin='$ten_admin',
    username='$username',
    password='$password',
    phone='$phone',
    email='$email'
";
if(mysqli_query($conn, $sql))
{
    $_SESSION['err']="";
    return header("Location: ../ADMIN/index.php");
}
else{
    return header("Location: ../ADMIN/dang_ki_admin.php");
}