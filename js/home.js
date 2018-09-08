$(document).ready(function () {
    $(document).mouseup(function (e) {
        var container = $("#mobile-menu");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.removeClass('open');
        }
    });
    $('.menu-item-mega .toggle').click(function () {
        $(this).parent().toggleClass("open");
        if ($(this).parent().hasClass('open')) {
            $(this).parent().find('.sub-menu').css('display', 'block');
        } else { $(this).parent().find('.sub-menu').css('display', 'none'); }

    })


    $(".nav_bar").hover(function () {
        $(".menu_item a").toggleClass("hover_menu_a");
        $(".nav_bar").toggleClass("hover_menu");
        $('.search-box input[type="text"]+span').toggleClass("hover_menu_search-box");
        $('.search-box input[type="text"]').toggleClass("hover_menu_search-box_focus");
        if ($(this).is(":hover")) {
            setTimeout(function () {
                $(".header-icon img").attr('src', 'picture/img_HomePage/Menu_hover.png').fadeIn(1000);
                $(".logo_menu img").attr('src', 'picture/img_HomePage/Logo_hover.png').fadeIn(1000);
                $(".user_item img").attr('src', 'picture/img_HomePage/User_black.png').fadeIn(1000);
                $(".cart_item img").attr('src', 'picture/img_HomePage/Shoppingcart_black.png').fadeIn(1000);
            }, 100);
        } else {
            setTimeout(function () {
                $(".header-icon img").attr('src', 'picture/img_HomePage/Menu.png').fadeIn(1000);
                $(".logo_menu img").attr('src', 'picture/img_HomePage/Logo_white.png').fadeIn(1000);
                $(".user_item img").attr('src', 'picture/img_HomePage/user-shape.png').fadeIn(1000);
                $(".cart_item img").attr('src', 'picture/img_HomePage/shopping-cart.png').fadeIn(1000);
            }, 100);
        }
    })
    var index;
    $(".menu_item>a").hover(function () {
        index = $(this).parent().index();
        RemoveSubMenu();
        $(".menu_item").eq(index).find(".sub-menu-nav").addClass("display-sub-menu-nav");
    })
    $(".main_menu>ul").mouseleave(function () {
        RemoveSubMenu();
    })
});
function RemoveSubMenu(params) {
    $(".sub-menu-nav").removeClass("display-sub-menu-nav");
}
function OpenNavMobile() {
    if (!$('#mobile-menu').hasClass()) {
        $('#mobile-menu').addClass('open');
    }

}
