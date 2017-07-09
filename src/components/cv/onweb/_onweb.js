/* global TalkChat:false, baffle:false, cvProjects: false, Util:false */
/* exported currentText */
/* global currentText */

var OnWeb = function() {
    var $onWebLink,
        chatContent = TalkChat.conversation,
        contOnWeb = chatContent.onWeb,
        intro = contOnWeb.intro,
        dd = contOnWeb.dd,
        baffleWebSite,
        baffleWebDd;

    function ascii() {

        var i,
            scrolled,
            // $ascii = $('.cv-ascii'),
            $mee = $('.cv-ascii').find('.mee'),
            $meeLength = $mee.length;

        $(window).on('scroll',function(){

            // $ascii.css('bottom', $('#cv').offset().top + $(window).scrollTop()*0.9 * -1);
            $mee.css('display','block');
            scrolled = $(window).scrollTop();

            if (scrolled % 3 == 0) {
                i = scrolled%$meeLength;
                $mee.css('opacity', 0);
                $('.myself'+i).css('opacity', 1);
            }
        });
    }

    ascii();

    function cvShowing() {

        // show Titles
        $('.js-cvShowTitle, .js-cvShow').each(function(){
            var $t = $(this),
                shut = false,
                windowHeight = window.innerHeight*0.7,
                thisOffset = $t.offset().top;


            $t.addClass('is-js');

            $(document).scroll(function(){
                if($(this).scrollTop() + windowHeight > thisOffset) {
                    if (!shut) {
                        $t.addClass('is-active');
                        shut = true;
                    }
                }
            });
        });
    }

    function init() {
        $onWebLink = $('.js-onWeb-site').parent(),
        baffleWebSite = baffle('.js-onWeb-site'),
        baffleWebDd = baffle('.js-onWeb-dd');

        /* eslint-disable no-unused-vars */
        $(document).on('mouseenter focus', '.js-onWeb-link', function(){
            baffleWebSite
                .start()
                .text(currentText => $(this).data('site'))
                .reveal(150, 150);

            baffleWebDd
                .start()
                .text(currentText => $(this).data('dd'))
                .reveal(150, 150);

            $onWebLink.attr('href', $(this).attr('href')).attr('target', '_blank');
        }).on('mouseleave blur', '.js-onWeb-link', function(){
            baffleWebSite
                .start()
                .text(currentText => intro)
                .reveal(150, 150);

            baffleWebDd
                .start()
                .text(currentText => dd)
                .reveal(150, 150);
            $onWebLink.removeAttr('href');
        });
        /* eslint-enable no-unused-vars */
    }

    return {
        init,
        cvShowing
    };
}();


$(function lookIntoOnWww(){
    var $cv = $('#cv'),
        offsetCv,
        windowHeight = window.innerHeight,
        triggerOnWebInit = true;

    $(window).scroll(function() {
        offsetCv = $cv.offset().top;

        if(triggerOnWebInit && $(window).scrollTop() + windowHeight - 45 > offsetCv) {
            triggerOnWebInit = false;

            $('.navCV').remove();
            cvProjects.setProjLoop(true);

            if (!Util.hasTouchEvents) {
                OnWeb.init();
            }

            OnWeb.cvShowing();
        }
    });
});
