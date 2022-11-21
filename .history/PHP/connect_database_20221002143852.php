<?php
//dịch từ sql sang mảng php
header('Access-Control-Allow-Origin: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Methods: POST');
header("Access-Control-Allow-Methods: GET");
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-Methods, Authorization, X-Requested-With');
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