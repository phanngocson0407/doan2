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
                <li>
                <div class="product-item" >
                  <div class="product-top">
                    <a href="" class="product-thumb">
                      <img class="img-fist" src="../PICTURE/KL5228.jpg" alt="" />
                      <img src="../PICTURE/kl5228-1.jpg" alt="" class="img-after" />
                    </a>
                    <a href="" class="buynow">XEM NHANH</a>
                  </div>
                  <div class="product-info">
                    <a href="" class="product-name">${item.tensanpham}– ${item.masanpham}</a>
                    <div>
                      <p class="product-price">${item.gia}</p>
                      <a href="" class="product-more">LỰA CHỌN CÁC TÙY CHỌN</a>
                    </div>
                  </div>
                </div>
              </li>
                `;
            });
            $("#content_sanpham").html(output)
        }
    })
}
$(document).ready(function() {
    show_sanpham();
});
