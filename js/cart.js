$(document).ready(function () {
    $('.shipping-type input').on('change', function () {
        var data = GetCartSession();
        var ship = $('input[name=shipping]:checked', '.shipping-type').val();
        $('.total-price').text(data.length > 0 ? (parseInt(TotalAmount(data)) + parseInt(ship)) + ' VND' : 0);
    });
})

function TotalAmount(orders) {
    var total = 0;
    for (i in orders) {
        if (orders[i]['product']['issale'] == 0) {
            total += CaculProductAmount(orders[i]['product']['price'], orders[i]['quantity']);
        } else {
            total += CaculProductAmount(orders[i]['product']['saleprice'], orders[i]['quantity']);
        }
    };
    return total;
}
function SetCartSession(cart) {
    sessionStorage.cart = JSON.stringify(cart);
}
function GetCartSession() {
    if (sessionStorage.cart === undefined) {
        sessionStorage.cart = JSON.stringify([]);
    }
    return JSON.parse(sessionStorage.cart);
}

function AddCart(product, quantity) {
    var order = { product: product, quantity: quantity }
    var cart = GetCartSession();
    var productExist = cart.filter(pr => pr.product.id === product.id);
    if (productExist.length == 1) {
        var pr = productExist[0];
        var index = cart.indexOf(pr);
        pr.quantity = parseInt(pr.quantity) + parseInt(quantity);
        cart[index] = pr;
    } else {
        cart.push(order);
    }
    SetCartSession(cart);
}
function DeleteCart() {
    sessionStorage.removeItem('cart');
}
function BindCartItem(item) {
    var html = "";
    html += '<div class="infor-order-1" style="">'
    html += '<p class="infor-order-name">' + item.product + '</p>'
    html += '<p class="infor-order-qt">x' + item.quantity + '</p>'
    html += '<p class="infor-order-price">' + formatNumber(item.product.price) + '</p>'
    html += '</div>'
    return html;
}
function CaculProductAmount(price, quantity) {
    return parseInt(price) * parseInt(quantity);
}
function BindCart(item) {
    var html = "";
    html += '<div class="row row-2 list-pd" style="padding: 20px 0 20px 0">'
    html += '<img class="img-sp" src="picture/Products/' + item.product.img + '">'
    html += '<div class="name-price-sp">'
    html += '<p class="name-sp">' + item.product.name + '</p>'
    html += '<p class="price-sp" style="">' + item.product.price + ' VND</p>'
    html += '</div>'
    html += '<div class="inputQuantity list-inline">'
    html += '<p class="list-inline-item">Số lượng</p>'
    html += '<a class="plusQuantity" type = "button" data - func="minus" data - field="field1" >-</a >'
    html += '<input style="" id="quantity" value="' + item.quantity + '" class="tc item-quantity"><a class="plusQuantity" type="button" data-func="plus" data-field="field1">+</a></div>'
    html += '<p class="tttoal-sp">' + CaculProductAmount(item.product.price, item.quantity) + '</p></div>'
    return html;
}
function BindForGioHang() {
    var data = GetCartSession();
    if (data.length > 0) {
        var html = "";
        for (i in data) {
            html += BindCart(data[i]);
        }
        $('.cart-item').html(html);
        $('.total-price').text(data.length > 0 ? TotalAmount(data) + ' VND' : 0);
        $('.thanhtien-price').text(data.length > 0 ? TotalAmount(data) + ' VND' : 0);
    }
}
