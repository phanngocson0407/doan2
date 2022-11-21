<?php
include_once('connect_database.php');

if(isset($_REQUEST['username']) AND !empty($_REQUEST['username']))
{
    $username=$_REQUEST['username'];
}
else{
    return header("Location: ../HTML/dangki.php");
}

if(isset($_REQUEST['password']) AND !empty($_REQUEST['password']))
{
    $password=$_REQUEST['password'];
}
else{
    return  header("Location: ../HTML/dangki.php");
}

if(isset($_REQUEST['email']) AND !empty($_REQUEST['email']))
{
    $email=$_REQUEST['email'];
}
else{
   return header("Location: ../HTML/dangki.php");
}



$sql="INSERT INTO user 
    SET 
    username='$username',
    password='$password',
    email='$email'
";
if(mysqli_query($conn, $sql))
{
    return header("Location: ../HTML/dangnhap.php");
}
else{
    return header("Location: ../HTML/dangki.php");
}