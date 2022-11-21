<?php
include_once('connect_database.php');

if(isset($_REQUEST['loaiquanly']) AND !empty($_REQUEST['loaiquanly']))
{
    $loaiquanly=$_REQUEST['loaiquanly'];
}
else{
    return  header("Location: ../ADMIN/index.php");
}
switch($loaiquanly)
{
    case "create":{
        if(isset($_REQUEST['tenkhachhang']) AND !empty($_REQUEST['tenkhachhang']))
        {
            $tenkhachhang=$_REQUEST['tenkhachhang'];
        }
        else{
            return_err("Điền tên khách hàng");
        }

        if(isset($_REQUEST['phone']) AND !empty($_REQUEST['phone']))
        {
            $phone=$_REQUEST['phone'];
        }
        else{
            return_err("Điền số điện thoại ");
        }

        if(isset($_REQUEST['username']) AND !empty($_REQUEST['username']))
        {
            $username=$_REQUEST['username'];
        }
        else{
            return_err("Điền username");
        }

        if(isset($_REQUEST['password']) AND !empty($_REQUEST['password']))
        {
            $password=$_REQUEST['password'];
        }
        else{
            return_err("Điền password");
        }

        if(isset($_REQUEST['email']) AND !empty($_REQUEST['email']))
        {
            $email=$_REQUEST['email'];
        }
        else{
            return_err("Điền email ");
        }



        $sql="INSERT INTO user
            SET 
            tenkhachhang='$tenkhachhang',
            phone='$phone',
            username='$username',
            password='$password',
            email='$email'
        ";
        $arr=[];
        
        if(mysqli_query($conn, $sql))
        {
            return_successs("Cập nhật thành công");
        }
        else{
            return_err("Thất bại");
        }
        echo json_encode($arr);
        break;
    }

    case "delete":{
        if(isset($_REQUEST['id_user']) AND !empty($_REQUEST['id_user']))
        {
            $id_user=$_REQUEST['id_user'];
        }
        else{
        }
        $sql="DELETE FROM user 
            WHERE id='$id_user'
        ";
        $arr=[];
        $arr['success']="";
        if(mysqli_query($conn, $sql))
        {
            $arr['success']="true";
        }
        else{
            $arr['success']="false";
        }
        echo json_encode($arr);
        break;
    }



    case "update":{
        if(isset($_REQUEST['id_user']) AND !empty($_REQUEST['id_user']))
        {
            $id_user=$_REQUEST['id_user'];
        }
        else{
            return_err("Điền id user");
        }

        if(isset($_REQUEST['tenkhachhang']) AND !empty($_REQUEST['tenkhachhang']))
        {
            $tenkhachhang=$_REQUEST['tenkhachhang'];
        }
        else{
            return_err("Điền tên khách hàng");
        }

        if(isset($_REQUEST['phone']) AND !empty($_REQUEST['phone']))
        {
            $phone=$_REQUEST['phone'];
        }
        else{
            return_err("Điền số điện thoại");
        }

        if(isset($_REQUEST['username']) AND !empty($_REQUEST['username']))
        {
            $username=$_REQUEST['username'];
        }
        else{
            return_err("Điền username");
        }

        if(isset($_REQUEST['password']) AND !empty($_REQUEST['password']))
        {
            $password=$_REQUEST['password'];
        }
        else{
            return_err("Điền password");
        }

        if(isset($_REQUEST['email']) AND !empty($_REQUEST['email']))
        {
            $email=$_REQUEST['email'];
        }
        else{
            return_err("Điền email");
        }
        $sql="UPDATE user
            SET 
            tenkhachhang='$tenkhachhang',
            phone='$phone',
            username='$username',
            password='$password',
            email='$email'
            WHERE id = '$id_user'
        ";
        $arr=[];
        if(mysqli_query($conn, $sql))
        {
            return_successs("Cập nhật thành công");
        }
        else{
            return_err("Thất bại");
        }
        break;

    }
    case "list_user":{
        $sql="select * from user WHERE 1=1";
        if(isset($_REQUEST['id_user']) AND !empty($_REQUEST['id_user']))
        {
            $id_user=$_REQUEST['id_user'];
            $sql=" AND id='$id_user'";
        }

        $result = db_qr($sql);
        $num= db_nums($result);
        $arr=[];
        if($num>0)
        {   
            while($row= db_assoc($result))
            {
                $item=[
                    "id_user"=>$row['id'],
                    "tenkhachhang"=>$row['tenkhachhang'],
                    "phone"=>$row['phone'],
                    "username"=>$row['username'],
                    "password"=>$row['password'],
                    "email"=>$row['email']
                
                ];
                $arr[]=$item;

            }
        }
        else{
        }
        echo json_encode($arr);
        break;
    }
    default : {
        break;
    }
}

