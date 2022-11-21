
function show_account_sale() {  
     var outputx =`<option value="">Tất cả</option>`;
     $.ajax({
         type: "post",
         url: urlapi,
         data: { detect: "account_manager", type_manager: "list_account",id_type: 2, limit: 2000 },
         dataType: "json",
          headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(response) {
            console.log(response);
            if(response.success=="true")
            {
                $.each(response.data, function(k, v) {
                     if (v.status_employee == 'Y') {
                         outputx += `<option value="${v.id}">${v.username}</option>`;
                     }


                 });
               
    
                    $("#id_account_sale_filter").html(outputx)
    
            }
             

         }
     });
 }
function show_bank()
{
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: { detect: 'list_bank_hoantien'}, 
        dataType: 'json',
        headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(response) {
            console.log(response);
            var output = ``;
            if(response.success=="true")
            {
                response.data.forEach(function(item) {
                output += `
                    <option value="${item.bank_name}">${item.bank_name} (${item.bank_full_name})</option>
                `;
                });

                $('#bank_name').html(output);
            }
            else
            {
                $('#bank_name').html("");
            }
            
        }
    });
}
function create_hoantien()
{
    amount = parseInt(Number($('#amount').val().replaceAll(',', '')));

    if($('#amount').val()!="" && amount<=0)
    {
        alert(length.error_hoantien_value);
    }
    else
    {
        $.ajax({
            url: urlapi,
            type: 'POST',
            data: { 
                    detect: 'hoantientructiep',
                    type_manager:'create',
                    id_account:$("#id_account").val(),
                    amount:amount,
                    bank_name:$("#bank_name").val(),
                    bank_owner_name:$("#bank_owner_name").val(),
                    bank_card_number:$("#bank_card_number").val(),
                    bank_card_account:$("#bank_card_account").val()
                }, 
            dataType: 'json',
            headers: {
            "Authorization": "Basic " +xtk
            },
            success: function(response) {
               
                alert(response.message);
                
            }
        });     
    }
    
}

var page_next=1;
function next_page(type)
{
    if(type=="back")
    {
        if(page_next!=1)
        {
            page_next=page_next-1;
            show_hoantien(page_next);
            if(page_next==1)
            {
                $("#page_back").css('color','#303030')
            }
            else
            {
                $("#page_back").css('color','rgb(60, 141, 188)')
            }
        }
    }
    else
    {
        page_next=page_next+1;
        show_hoantien(page_next);
        $("#page_back").css('color','rgb(60, 141, 188)')
    }
}
function show_hoantien(page) {
    var param={};
    ngaybatdau=$("#ngaybatdau").val();
    ngayketthuc=$("#ngayketthuc").val();
    if(ngaybatdau && ngayketthuc)
    {
        param={ 
                 detect: 'hoantientructiep', 
                type_manager: 'list',
                limit: '10',
                page:page,
                date_begin:ngaybatdau,
                date_end:ngayketthuc,
                status:$("#status").val(),
                filter:$("#key_seach").val()
            }
    }
    else
    {
        param={ 
                 detect: 'hoantientructiep', 
                type_manager: 'list',
                limit: '10',
                page:page,
                status:$("#status").val(),
                filter:$("#key_seach").val()
            }
    }
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: param,
        dataType: 'json',
        headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(response) {
            var output = ``;
            let type = "";
            if(response.success=="true")
            {
                $.each(response.data, function(k, item) {
                output += `
                <tr>
                    <td style="width:5%">${page*10-9+k}</td>
                    <td>${item.platform_number}</td>
                    <td>${item.account_username}</td>
                    <td>${item.bank_name}</td>
                    <td>${item.bank_owner_name}</td>
                    <td>${item.bank_card_number}</td>
                    <td>${item.bank_card_account}</td>
                    <td>${money(item.amount)} VND</td>
                    <td>${item.create_at}</td>
                    <td>${return_status_payment(item.status)}</td>
                    
                </tr> `;
                });
                total_money=`${leng.payment_total} : `+formatNumber(response.total_money_online??'0')+"  VND";
                $("#total_money").html(total_money);
                $('#content-hoantien').html(output);
            }
            else
            {
                total_money=`${leng.payment_total} : 0 VND`;
                $("#total_money").html(total_money);
                $('#content-hoantien').html("");
            }
            
        }
    });
}
function show_balance()
{
    $.ajax({
        url: urlapi,
        type: 'POST',
        data: { 
                detect: 'hoantientructiep', 
                type_manager: 'check_balance'

                },
        dataType: 'json',
        headers: {
        "Authorization": "Basic " +xtk
        },
        success: function(response) {
            console.log(response);
            var output = ``;
            let type = "";
            if(response.success=="true")
            {
                output=`${leng.balance_payment} : ${money(response.data.balance)} VND`;
                 $("#balance").html(output);
            }
            else 
            {
                $("#balance").html(`${leng.balance_payment} : 0 VND`);
            }
            
        }
    });
}
$(document).ready(function() {
    show_hoantien(1);
    show_bank();
    show_balance();
     
    $("#txt_tite_hoantientructiep").html(leng.txt_module_payment_online_hoantien);
    $("#txt_btn_seach").html(leng.txt_seach);
    $("#key_seach").attr('placeholder',leng.placeholder_seach_payment_online_thanhtoan);

    $("#txt_date_begin").html(leng.txt_date_begin);
    $("#txt_date_end").html(leng.txt_date_end);
    $("#txt_status").html(leng.txt_status);

    $("#status").html(`
        <option value="">${leng.txt_all}</option>
        <option value="1">${leng.txt_processing}</option>
        <option value="2">${leng.txt_success}</option>
        <option value="3">${leng.txt_fail}</option>
    `);

    $("#title_table_hoantien").html(`
        <th style="width:5%">${leng.txt_stt}</th>
        <th>${leng.code}</th>
        <th>${leng.user_create}</th>  
        <th>${leng.txt_bank_name}</th> 
        <th>${leng.txt_bank_holder}</th>
        <th>${leng.txt_bank_number}</th>
        <th>${leng.txt_bank_account}</th>
        <th>${leng.payment}</th>
        <th>${leng.date_create}</th>
        <th>${leng.txt_status}
            <a  data-toggle="modal" data-target="#create_hoantien_Modal"><img src="../backend/icon_trading/plus.svg" ></a>
        </th> 
    `);
    $("#txt_page_before").html(leng.txt_page_before);
    $("#txt_page_after").html(leng.txt_page_after);

    $("#title_create_hoantien").html(leng.title_create_hoantien);
    $("#txt_bank_name").html(leng.txt_bank_name);
    $("#txt_bank_holder").html(leng.txt_bank_holder);
    $("#txt_bank_number").html(leng.txt_bank_number);
    $("#txt_bank_account").html(leng.txt_bank_account);
    $("#hoantien_value").html(leng.hoantien_value);

    $("#btn_add").val(leng.txt_create);
    $(".btn-default").html(leng.txt_close);
});