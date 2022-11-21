<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    <link rel="stylesheet" href="../CSS/dangki.css" />
  </head>
  <body>
    <header>
      <a href="../HTML/Project_CN_BanHang.php"
        ><img src="../PICTURE/Logo-1.png" alt=""
      /></a>
    </header>
    <nav id="container">
      <div class="name_form">
        <h1>ĐĂNG KÍ</h1>
      </div>
      <div id="form_dangki">
        <form action="../PHP/dangki_controller.php" method="post">
          <input
            type="text"
            placeholder="Usename"
            name="username"
            class="margin-top20"
          />
          <input
            type="text"
            placeholder="Password"
            name="password"
            class="margin-top20"
          />
          <input type="text" placeholder="Re-Password" class="margin-top20" />
          <input
            type="email"
            placeholder="Email"
            name="email"
            class="margin-top20"
          />
          <button type="submit" class="margin-top20">Đăng Ký Ngay</button>
        </form>
      </div>
      <div class="other margin-top20">
        <p id="rules">
          Bằng cách nhấn Đăng Ký Ngay, bạn đồng ý với
          <span><a href="">Điều Khoản Dịch Vụ</a></span> và
          <span><a href="">Chính Sách Bảo Mật</a></span>
        </p>
      </div>
    </nav>
   
  </body>
</html>
