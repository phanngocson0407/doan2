var _id_sp="";
function show_sanpham()
{
    $.ajax({
        url: "../PHP/sp_controller.php",
        type: 'POST',
        data: {
            loaiquanly:"list_sp"
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
                    <td>${k+1}</td>
                    <td>${item.masanpham}</td>
                    <td>${item.tensanpham}</td>
                    <td>${item.gia}</td>
                    <td>${item.chat_lieu}</td>
                    <td>
                        <button onclick="xoasanpham('${item.id_sp}')" type="button" class="btn btn-warning">XÓA</button>
                        <button onclick="hien_thongtin_suasanpham('${item.id_sp}','${item.masanpham}','${item.tensanpham}','${item.gia}','${item.chat_lieu}')" type="button" class="btn btn-info">SỬA</button>
                    </td> 
                    
                </tr>
                `;
            });
            $("#sanpham_content").html(output)
        }
    })
}

function themsanpham(){
    $.ajax({
        url: "../PHP/sp_controller.php",
        type: 'POST',
        data: {
            loaiquanly:"create",
            masanpham:$("#masanpham").val(),
            tensanpham:$("#tensanpham").val(),
            gia:$("#gia").val(),
            chat_lieu:$("#chat_lieu").val()
        },
        dataType: 'json',
        headers: {
        "Authorization": "Basic "
        },
        success: function(response) {
            if(response.success=="true")
            {
                alert(response.message);
                $("#dong_themsp").click();
                show_sanpham();
            }else{
                alert(response.message);
            }
        }
    })
}

function xoasanpham(id_sp){
    $.ajax({
        url: "../PHP/sp_controller.php",
        type: 'POST',
        data: {
            loaiquanly:"delete",
            id_sp:id_sp
        },
        dataType: 'json',
        headers: {
        "Authorization": "Basic "
        },
        success: function(response) {
            if(response.success=="true")
            {
                alert('XÓA THÀNH CÔNG');
                show_sanpham();
            }else{
                alert('THẤT BẠI');
            }
        }
    })
}


function hien_thongtin_suasanpham(id_sp,ma,ten,gia,chat_lieu){
    $("#btn_suasp").click();
    $("#edit_masanpham").val(ma);
    $("#edit_tensanpham").val(ten);
    $("#edit_gia").val(gia);
    $("#edit_chat_lieu").val(chat_lieu);
    _id_sp=id_sp;

}

function suasanpham(){
    $.ajax({
        url: "../PHP/sp_controller.php",
        type: 'POST',
        data: {
            loaiquanly:"update",
            masanpham:$("#edit_masanpham").val(),
            tensanpham:$("#edit_tensanpham").val(),
            gia:$("#edit_gia").val(),
            chat_lieu:$("#edit_chat_lieu").val(),
            id_sp:_id_sp
        },
        dataType: 'json',
        headers: {
        "Authorization": "Basic "
        },
        success: function(response) {
            if(response.success=="true")
            {
                alert(response.message);
                $("#dong_suasp").click();
                show_sanpham();
            }else{
                alert(response.message);
            }
        }
    })
}

$(document).ready(function() {
    show_sanpham();
});



