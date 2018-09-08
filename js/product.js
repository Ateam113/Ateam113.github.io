$(document).ready(function () {
    BindProductDetails(GetSessionProduct());
    $('.addcart-button').click(function () {
        var quantity = $('#quantity').val();
        AddCart(GetSessionProduct(),quantity);
        alert('Đã thêm vào giỏ hàng')
    })
})
function BindProductDetails(product) {
    $('.img-big img').attr("src",'picture/Products/' + product.img);
    $('.product-name-details').text(product.name);
    $('.product-id-details').text(product.id);
    $('.product-price-details').text(accounting.formatNumber(product.price)+' VND');
    $('.box-color').css('background-color',product.colorpicker);
    $('.img-small img')['0'].setAttribute("src",'picture/Products/Anhchitiet/' + product.imgdetail['1']);
    $('.img-small img')['1'].setAttribute("src",'picture/Products/Anhchitiet/' + product.imgdetail['2']);
    $('.addcart-button').data('id',product.id);
}
function GetSessionProduct() {
    var sess = sessionStorage.product;
    return sess!=='undefined'?JSON.parse(sess)[0]:null;
}
function SetSessionProduct(product) {
    sessionStorage.product = JSON.stringify(product);
}

function GetProduct(id){
    var data = GetData(UrlJson());
    var product = data.products.filter(dt=>dt.id===id);
    SetSessionProduct(product);
    console.log(UrlJson());
}

