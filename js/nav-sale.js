$(document).ready(function () {
    $(document).mouseup(function (e) {
        var container = $("#mobile-menu");
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.removeClass('open');
        }
    });
    $(".nav_bar").hover(function () {
        $(".menu_item a").toggleClass("hover_menu_a");
        $(".nav_bar").toggleClass("hover_menu");
        $('.search-box input[type="text"]+span').toggleClass("hover_menu_search-box");
        $('.search-box input[type="text"]').toggleClass("hover_menu_search-box_focus");
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
