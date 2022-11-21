function show_user()
{
    $.ajax({
        url: "../PHP/customer_controller.php",
        type: 'POST',
        data: {
            loaiquanly:"list_user"
        },
        dataType: 'json',
        headers: {
        "Authorization": "Basic "
        },
        success: function(response) {
            let output=""; 
            $.each(response, function(k, item) {
                output += `
                <tr>
                    <th>${k+1}</th>
                    <th>${item.tenkhachhang}</th>  
                    <th>${item.phone}</th>
                    <th>${item.username}</th>
                    <th>${item.password}</th>
                    <th>${item.email}</th>
                    <th>
                        <button onclick="xoauser('${item.id_user}')" type="button" class="btn btn-warning">XÓA</button>
                        <button onclick="hien_thongtin_sua_user('${item.id_user}','${item.tenkhachhang}','${item.phone}','${item.username}','${item.password}','${item.email}')" type="button" class="btn btn-info">SỬA</button>
                    </th>
                    
                </tr>
                `;
            });
            $("#user_content").html(output)
        }
    })
}
function themuser(){
    $.ajax({
        url: "../PHP/customer_controller.php",
        type: 'POST',
        data: {
            loaiquanly:"create",
            tenkhachhang:$("#tenkhachhang").val(),
            phone:$("#phone").val(),
            username:$("#username").val(),
            password:$("#password").val(),
            email:$("#email").val(),
        },
        dataType: 'json',
        headers: {
        "Authorization": "Basic "
        },
        success: function(response) {
            if(response.success=="true")
            {
                alert(response.message);
                $("#dong_themuser").click();
                show_user();
            }else{
                alert(response.message);
            }
        }
    })
}
function xoauser(id_user){
    $.ajax({
        url: "../PHP/customer_controller.php",
        type: 'POST',
        data: {
            loaiquanly:"delete",
            id_user:id_user
        },
        dataType: 'json',
        headers: {
        "Authorization": "Basic "
        },
        success: function(response) {
            if(response.success=="true")
            {
                alert('XÓA THÀNH CÔNG');
                show_user();
            }else{
                alert('THẤT BẠI');
            }
        }
    })
}

function hien_thongtin_sua_user(id_user,tenkhachhang,phone,username,password,email){
    $("#btn_suauser").click();
    $("#edit_tenkhachhang").val(tenkhachhang);
    $("#edit_phone").val(phone);
    $("#edit_username").val(username);
    $("#edit_password").val(password);
    $("#edit_email").val(email);
    _id_user=id_user;

}

function suauser(){
    $.ajax({
        url: "../PHP/customer_controller.php",
        type: 'POST',
        data: {
            loaiquanly:"update",
            tenkhachhang:$("#edit_tenkhachhang").val(),
            phone:$("#edit_phone").val(),
            username:$("#edit_username").val(),
            password:$("#edit_password").val(),
            email:$("#edit_email").val(),
            id_user:_id_user
        },
        dataType: 'json',
        headers: {
        "Authorization": "Basic "
        },
        success: function(response) {
            if(response.success=="true")
            {
                alert(response.message);
                $("#dong_suauser").click();
                show_user();
            }else{
                alert(response.message);
            }
        }
    })
}

$(document).ready(function() {
    show_user();
});