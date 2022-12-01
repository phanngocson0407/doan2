<?php
//dịch từ sql sang mảng php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Methods: GET");
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');

function them_hinhanh($myfile, $dir_save)
{    // myfile = file nhập vào, $max_size = kích thước lớn nhất của file, 
    // $allow_file_type = các đuôi file cho phép, $dir_save = thư mục lưu trữ
    if ($_FILES[$myfile]['error'] == 0) {
        $target_dir = $dir_save;
        $target_dir_4_upload = '../' . $dir_save;
        $target_file = $target_dir . basename($_FILES[$myfile]['name']);
        $target_save_file = $target_dir_4_upload . basename($_FILES[$myfile]['name']);


        $allow_file_type = array('jpg', 'jpeg', 'png');
        $max_file_size = 5242880;
        $img_file_type = pathinfo($target_file, PATHINFO_EXTENSION);

        // kiem tra co phai file anh
        $check = getimagesize($_FILES[$myfile]['tmp_name']);
        if ($check !== false) {
            $img_info = pathinfo($_FILES[$myfile]['name']);
            if (file_exists($target_save_file)) {
                $k = 0;
                $name_copy = $img_info['filename'] . "_Copy_" . $k;
                $target_file = $target_dir . $name_copy . "." . $img_info['extension'];
                $target_save_file = $target_dir_4_upload . $name_copy . "." . $img_info['extension'];
                while (file_exists($target_save_file)) {
                    $k++;
                    $name_copy = $img_info['filename'] . "_Copy_" . $k;
                    $target_file = $target_dir . $name_copy . "." . $img_info['extension'];
                    $target_save_file = $target_dir_4_upload . $name_copy . "." . $img_info['extension'];
                }
            }

            if ($_FILES[$myfile]['size'] > $max_file_size) {
                return_error("file size is greater than {$max_file_size}");
            }

            if (!in_array(strtolower($img_file_type), $allow_file_type)) {
                return_error("file type is not allow, {$allow_file_type}");
            }

            move_uploaded_file($_FILES[$myfile]['tmp_name'], $target_save_file);
            // return_success($target_file);
            return $target_file;
        } else {
            return_error("Không phải ảnh");
        }
    } else {
        return_error("Lỗi dữ liệu");
    }
}


function return_err($message)
{
    $arr['success']="false";
    $arr['message']=$message;
    echo json_encode($arr);
    exit();
}
function return_successs($message)
{
    $arr['success']="true";
    $arr['message']=$message;
    echo json_encode($arr);
    exit();
}
function db_assoc($result)
{
    return mysqli_fetch_assoc($result);
    
}
//xuất ra số dòng lấy đc
function db_nums($result)
{
    $nums = mysqli_num_rows($result);
    return $nums;
}
//lấy query(dữ liệu truy vấn)
function db_qr($sql)
{
    global $conn;
    $result = mysqli_query($conn, $sql);
    if (!empty($result)) {
        return $result;
    }
    return false;
}
function db_connect() {
    
    
}
$db["hostname"] = "localhost";
$db["username"] = "root";
$db["password"] = "";
$db["database"] = "do_an";

global $conn;
$conn = mysqli_connect($db['hostname'], $db['username'], $db['password'], $db['database']);
if (!$conn) {
    die("Kết nối không thành công ".mysqli_connect_error());
}
mysqli_set_charset($conn, "utf8");

date_default_timezone_set('Asia/Ho_Chi_Minh'); 
?>