$(document).ready(function () {
})
function ProductClick(product) {
    var id = $(product).data('id');
    GetProduct(id);
    window.location.href = "productdetails.html"
}
function UrlJson() {
    return 'https://api.myjson.com/bins/11z97y';
}
const filter = {
    IsNew: 'isnew',
    IsSale: 'issale',
    Category: 'category',
    Price: 'price',
    BestSell: 'bestsell',
    Color: 'color'
}
const priceFilter = {
    1: { min: 0, max: 300000 },
    2: { min: 300000, max: 500000 },
    3: { min: 500000, max: 1000000 },
    4: { min: 1300000, max: 99999999 }
}
function GetData(json) {
    var value = $.ajax({
        contentType: "application/json",
        url: json,
        async: false
    }).responseText;
    return JSON.parse(value);
}

function GetProducts(json) {
    var data = GetData(json);
    console.log(data);
    var page_number = 0;
    var page_size = 8;
    var quantityPr = 0;
    var dataHome = Filter(data.products).slice(page_number * page_size, (page_number + 1) * page_size);
    var toH = toHtmlByFilter(dataHome);
    $('.products-content-row').html(toH.htmlout);
    page_number++;
    quantityPr += dataHome.length;
    quantity(dataHome.length, data.products.length);
    $('.tab-all').click(function () {
        var dataHome = Filter(data.products).slice(page_number * page_size, (page_number + 1) * page_size);
        var toH = toHtmlByFilter(dataHome);
        $('.products-content-row').html(toH.htmlout);
        quantity(quantityPr, data.products.length);
    })
    $('.btn-all').click(function () {
        var home = $('.products-content-row').html();
        var dataHome = Filter(data.products).slice(page_number * page_size, (page_number + 1) * page_size);
        var toH = toHtmlByFilter(dataHome);
        home += toH.htmlout;
        $('.products-content-row').html(home);
        page_number++;
        quantityPr += dataHome.length;
        quantity(quantityPr, data.products.length);
        if (quantityPr == data.products.length) {
            $('.btn-all').css('display', 'none');
        }
    });
    $('.tab-1').click(function () {
        quantity(BindDataClick(data.products, '#menu1', {
            bestsell: '1'
        }), data.products.length);
    });
    $('.tab-2').click(function () {
        quantity(BindDataClick(data.products, '#menu2', {
            isnew: "1"
        }), data.products.length);
    });
    $('.tab-3').click(function () {
        quantity(BindDataClick(data.products, '#menu3', {
            issale: '1'
        }), data.products.length);
    });
    $('.products-content ul li').click(function () {
        $('.products-content ul li').removeClass('active');
        $(this).addClass('active');
    })
    $('.filter-button').click(function () {
        var cate = $('select[name=product_cat]').val();
        var color = $('select[name=filter_color]').val();
        var price = $('select[name=filter_price]').val();
        quantity(BindDataClick(data.products, '#home', {
            category: cate,
            color: color,
            price: price
        }), data.products.length);
    })
}

function Filter(data, filters) {
    data = typeof filters !== 'undefined' ? data.filter(d => (typeof filters[filter.IsNew] !== 'undefined' ? (filters[filter.IsNew] !== "" ? d[filter.IsNew] == filters[filter.IsNew] : data) : data) &&
        (typeof filters[filter.IsSale] == 'undefined' ? data : d[filter.IsSale] == filters[filter.IsSale]) &&
        (typeof filters[filter.Category] !== 'undefined' ? (filters[filter.Category] !== "" ? d[filter.Category] == filters[filter.Category] : data) : data) &&
        (typeof filters[filter.BestSell] !== 'undefined' ? (filters[filter.BestSell] !== "" ? d[filter.BestSell] == filters[filter.BestSell] : data) : data) &&
        (typeof filters[filter.Color] !== 'undefined' ? (filters[filter.Color] !== "" ? d[filter.Color] == filters[filter.Color] : data) : data)
        && (typeof filters[filter.Price] !== 'undefined' ? (filters[filter.Price] !== "" ? parseInt(d[filter.Price]) >= priceFilter[filters[filter.Price]]['min'] && parseInt(d[filter.Price]) < priceFilter[filters[filter.Price]]['max'] : data) : data)
    ) : data;
    return data;
}

function BindDataClick(data, panel, filters) {
    data = typeof filters !== 'undefined' ? Filter(data, filters) : data;
    var html = $(panel).html();
    var toH = toHtmlByFilter(data);
    $(panel).html(toH.htmlout);
    return data.length;
}

function quantity(num1, num2) {
    $('#quan').text(num1 + ' trong ' + num2 + ' sản phẩm    |');
}

function toHtmlByFilter(data) {
    var html = "";
    var quan = 0;
    $.each(data, function (index, value) {
        html += bindProduct(value);
        quan++;
    });
    return {
        htmlout: html,
        quanout: quan
    };
}

function bindProduct(product) {
    var htmlPr = '<div class="col-lg-3">';
    htmlPr += '<ul style="padding-left: 0" class="item-product">';
    htmlPr += '<li class="">';
    htmlPr += '<a>';
    htmlPr += '<img onclick="ProductClick(this)" value="' + product.id + '" class="product-img" data-id="' + product.id + '" class="img-product" src="picture/Products/' + product.img + '" alt="">';
    htmlPr += '</a>';
    htmlPr += '</li>';
    htmlPr += '<br>';
    htmlPr += '<li>';
    htmlPr += '<a onclick="ProductClick(this)" value="' + product.id + '"  style="font-weight: bold;text-transform: uppercase">' + product.id + ' - ' + product.name + '</a>'
    htmlPr += '</li>'
    var sale = product.issale == "1" ? " > " + accounting.formatNumber(product.saleprice) + " VND" : "";
    var price = product.issale == "1" ? '<del style="font-weight: bold; color:black">' + accounting.formatNumber(product.price) + ' VND</del>' : accounting.formatNumber(product.price) + ' VND';
    htmlPr += '<li class="item-price">' + price + sale + '</li>'
    htmlPr += '</ul>'
    htmlPr += '</div>'
    return htmlPr;
}