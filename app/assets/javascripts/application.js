// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or any plugin's vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require foundation
//= require Chart
//= require legend
//= require_tree .

$(function() {
    $(document).foundation();

    $('#leaderboard').dataTable( {
        responsive: true,
        "lengthMenu": [ [25, 50, 100, 250, -1], [25, 50, 100, 250, "All"] ],

        "oLanguage": {
        "sLengthMenu": '_MENU_',
        "sSearch": "_INPUT_"
        }
    });

    $('.dataTables_filter input').attr("placeholder", "Search");
    
    $('.sign-in').on('click', '.btn, .login', function(){
        $(this).closest('.popup').find('.btn').hide();
        $(this).closest('.popup').find('.title').hide();
        $(this).closest('.popup').find('.disable').show();
    });
    $('.signin-btn').on('click', function(){
        $('.popup').find('.btn, .title, .popup-logo').hide();
        $('.popup').find('.title').hide();
        $('.popup').find('.disable').show();
        window.location.replace("/signin");
    });

    var windowWidth = $(window).width();
    $('.profile-menu').on('click', function(){
        $(this).toggleClass('active');
        $('.offset-profile-menu').slideToggle();
    });

    $(window).resize(function() {
        windowWidth = $(window).width();
        socialProfileLabelBalancer();
    });

    function socialProfileLabelBalancer(){
        if (windowWidth < 640){
            $('.analytic-view-options .stackoverflow-btn').text("STACK");
        }else{
            $('.analytic-view-options .stackoverflow-btn').text("STACKOVERFLOW");
        }
    }

    var stringWithShorterURLs = getReplacementString($(".profile-extra-info span.profile-blog-url a").text());

    function getReplacementString(str){
        return str.replace(/https?\:\/\/([^\s]*)/gi,function(match){
            return match.substring(0,25) + "..."
        });
    }

    $('.profile-extra-info span.profile-blog-url a').text(stringWithShorterURLs);


});
