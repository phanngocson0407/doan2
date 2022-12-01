<?php
include_once('connect_database.php');

if(isset($_REQUEST['loaiquanly']) AND !empty($_REQUEST['loaiquanly']))
{
    $loaiquanly=$_REQUEST['loaiquanly'];
}
else{
    return header("Location: ../ADMIN/index.php");
}
switch($loaiquanly)
{
    case "create":{
        if(isset($_REQUEST['masanpham']) AND !empty($_REQUEST['masanpham']))
        {
            $masanpham=$_REQUEST['masanpham'];
        }
        else{
            return_err("Điền mã sản phẩm");
                
        }

        if(isset($_REQUEST['tensanpham']) AND !empty($_REQUEST['tensanpham']))
        {
            $tensanpham=$_REQUEST['tensanpham'];
        }
        else{
            return_err("Điền tên sản phẩm");
        }

        if(isset($_REQUEST['gia']) AND !empty($_REQUEST['gia']))
        {
            $gia=$_REQUEST['gia'];
        }
        else{
            return_err("Điền giá sản phẩm");
        }

        if(isset($_REQUEST['chat_lieu']) AND !empty($_REQUEST['chat_lieu']))
        {
            $chat_lieu=$_REQUEST['chat_lieu'];
        }
        else{
            return_err("Điền chất liệu");
        }

        if(isset($_FILES['hinh_sanpham']))
        {
            $link_hinhmoithem=them_hinhanh("hinh_sanpham","images/sanpham/");
        }
        else{
            return_err("Thêm hình vào ");
        }


        $sql="INSERT INTO san_pham 
            SET 
            masanpham='$masanpham',
            tensanpham='$tensanpham',
            gia='$gia',
            chat_lieu='$chat_lieu',
            img_sp='$link_hinhmoithem'
        ";
        $arr=[];
        if(mysqli_query($conn, $sql))
        {
            return_successs("Them thành công");
        }
        else{
            return_err("Thất bại");
        }
        echo json_encode($arr);
        break;
    }

    case "delete":{
        if(isset($_REQUEST['id_sp']) AND !empty($_REQUEST['id_sp']))
        {
            $id_sp=$_REQUEST['id_sp'];
        }
        else{
        }
        $sql="DELETE FROM san_pham 
            WHERE id='$id_sp'
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
        if(isset($_REQUEST['id_sp']) AND !empty($_REQUEST['id_sp']))
        {
            $id_sp=$_REQUEST['id_sp'];
        }
        else{
            return_err("Điền id sản phẩm");
        }
        if(isset($_REQUEST['masanpham']) AND !empty($_REQUEST['masanpham']))
        {
            $masanpham=$_REQUEST['masanpham'];
        }
        else{
            return_err("Điền mã sản phẩm");
        }

        if(isset($_REQUEST['tensanpham']) AND !empty($_REQUEST['tensanpham']))
        {
            $tensanpham=$_REQUEST['tensanpham'];
        }
        else{
            return_err("Điền tên sản phẩm");
        }

        if(isset($_REQUEST['gia']) AND !empty($_REQUEST['gia']))
        {
            $gia=$_REQUEST['gia'];
        }
        else{
            return_err("Điền giá sản phẩm");
        }

        if(isset($_REQUEST['chat_lieu']) AND !empty($_REQUEST['chat_lieu']))
        {
            $chat_lieu=$_REQUEST['chat_lieu'];
        }
        else{
            return_err("Điền chất liệu sản phẩm");
        }
        if(isset($_FILES['hinh_sanpham']))
        {
            $link_hinhmoithem=them_hinhanh("hinh_sanpham","images/sanpham/");
        }
        else{
            return_err("Thêm hình vào ");
        }

        $sql="UPDATE san_pham
            SET
            masanpham='$masanpham',
            tensanpham='$tensanpham',
            gia='$gia',
            chat_lieu='$chat_lieu',
            img_sp='$link_hinhmoithem'
            WHERE id = '$id_sp'
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
    case "list_sp":{
        $sql="select * from san_pham WHERE 1=1";
        if(isset($_REQUEST['id_sp']) AND !empty($_REQUEST['id_sp']))
        {
            $id_sp=$_REQUEST['id_sp'];
            $sql=" AND id='$id_sp'";
        }

        $result = db_qr($sql);
        $num= db_nums($result);
        $arr=[];
        if($num>0)
        {   
            while($row= db_assoc($result))
            {
                $item=[
                    "id_sp"=>$row['id'],
                    "masanpham"=>$row['masanpham'],
                    "tensanpham"=>$row['tensanpham'],
                    "gia"=>$row['gia'],
                    "chat_lieu"=>$row['chat_lieu'],
                    "img_sp"=>$row['img_sp']
                
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

