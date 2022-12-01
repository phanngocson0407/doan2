let link_web="http://localhost/doan2/";
var _id_sp="";
function select_img(id,item) {
    var fileInput = document.getElementById(id);
    var filePath = fileInput.value; //lấy giá trị input theo id
    var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i; //các tập tin cho phép
    //Kiểm tra định dạng
    if (!allowedExtensions.exec(filePath)) {
        alert('Vui lòng thêm các icon có định dạng: .jpeg/.jpg/.png/.gif only.');
        fileInput.value = '';
        return false;
    } else {
        //Image preview
        if (fileInput.files && fileInput.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                document.getElementById(item).innerHTML = '<img style="width:100%;height:120px;" src="' + e.target.result + '"/>';
            };
            reader.readAsDataURL(fileInput.files[0]);

            // $('#'+info).html((fileInput.files[0].length > 1) ? fileInput.files[0].length + ' files' : fileInput.files[0].name)
        }
    }

}
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
                    <td><img style="width:100%;height:120px;" src="${link_web+item.img_sp}"/></td>
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
    var formData = new FormData();
    formData.append("loaiquanly", "create");
    formData.append("masanpham", $("#masanpham").val());
    formData.append("tensanpham", $("#tensanpham").val());
    formData.append("gia", $("#gia").val());
    formData.append("chat_lieu", $("#chat_lieu").val());

    var hinh_sanpham = $('#hinh_sanpham').prop('files')[0]??"";  // lay img ra tu file id
    formData.append("hinh_sanpham",hinh_sanpham); // truyen img vao formdata
    $.ajax({
        url: "../PHP/sp_controller.php",
        type: 'POST',
        data: formData,
        contentType: false,
        cache: false,
        processData: false,
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


function hien_thongtin_suasanpham(id_sp,ma,ten,gia,chat_lieu,img_sp){
    $("#btn_suasp").click();
    $("#edit_masanpham").val(ma);
    $("#edit_tensanpham").val(ten);
    $("#edit_gia").val(gia);
    $("#edit_chat_lieu").val(chat_lieu);
    $("#edit_hinh_sanpham").val(img_sp);

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



