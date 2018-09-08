$(document).ready(function () {
    if (sessionStorage.accounts === undefined) {
        var userDefault = [{ username: 'admin@admin.com', password: 'admin' }];
        sessionStorage.accounts = JSON.stringify(userDefault);
    }
    if(sessionStorage.logon!==undefined){
        var user = JSON.parse(sessionStorage.logon).account.username;
        var html = '<h4>Xin chào, '+user+'</h4>'
        $('.cart_bar ul').html(html)
    }
    $('.btn-login').click(function () {
        var email = $('input[name=email]').val();
        var password = $('input[name=password]').val();
            if (Login(email, password)) {
                alert("Đăng Nhập Thành Công")
                closeLoginForm();
            } else {
                alert("Đăng nhập không thành công")
            }
    })
    $('.btn-register').click(function () {
        var email = $('input[name=res-email]').val();
        var password = $('input[name=res-password]').val();
        var account = { username: email, password: password }
        if (CheckValid()) {
            if (RegisterAccount(account) == false) {
                alert("Đăng Ký không Thành Công")
            } else {
                alert("Đăng Ký Thành Công")
            }
        }      
    })
})

function CheckValid() {
    var email = $('input[name=res-email]').val().trim();
    var password = $('input[name=res-password]').val().trim();
    var repassword = $('input[name=repassword]').val().trim();
    if (email === "") {
        alert("Email không được để trống");
        return false
    }
    if (password === "") {
        alert("Mật khẩu không được để trống");
        return false
    }
    if (repassword !== password) {
        alert("Xác nhận mật khẩu không đúng");
        return false
    }
    return true;
}

function Login(username, password) {
    var existAccount = GetAccount(username);
    if (existAccount != null) {
        if (existAccount['password'] == password) {
            sessionStorage.logon = JSON.stringify({account:existAccount,status:'true'});
            return true;
        }
    }
    return false;
}

function RegisterAccount(account) {
    if (GetAccount(account['username']) !== null) {
        return false;
    }
    var accounts = JSON.parse(sessionStorage.accounts);
    accounts.push(account);
    sessionStorage.accounts = JSON.stringify(accounts);
}

function GetAccount(username) {
    var accounts = JSON.parse(sessionStorage.accounts);
    for (i in accounts) {
        if (accounts[i]['username'] == username) {
            return accounts[i];
        }
    }
    return null;
}


