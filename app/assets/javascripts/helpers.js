$(function(){
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
	socialProfileLabelBalancer();
	
	$('.profile-menu').on('click', function(){
	    $(this).toggleClass('active');
	    $('.offset-profile-menu').slideToggle().toggleClass('active');
	    $('body').unbind('click');
		  $('.offset-profile-menu').unbind('mouseleave');
		  $('.offset-profile-menu, .profile-menu').unbind('mouseenter');



	    $('.offset-profile-menu').mouseleave(function() {
				$('body').on('click',function(){
					$('.profile-menu').removeClass('active');
				  $('.offset-profile-menu').slideToggle().removeClass('active');
				  $('body').unbind('click');
				  $('.offset-profile-menu').unbind('mouseleave');
				  $('.offset-profile-menu, .profile-menu').unbind('mouseenter');
				});
			});

	    $('.offset-profile-menu, .profile-menu').mouseenter(function() {
				$('body').unbind('click');
			});
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
	//when over on persons face, there should be a popup
	$('img.pop-up-profile-init').on('mouseover', function() {
		$('.pop-up-profile').fadeOut('fast');
		$(this).closest('.pop-up-profile-container').find('.pop-up-profile').fadeIn('fast');
		$(this).closest('.pop-up-profile-container').find('.pop-up-profile').on('mouseenter', function(){
			$(this).closest('.pop-up-profile-container').find('.pop-up-profile').on('mouseleave', function(){
				$(this).fadeOut('fast');
			});
		});
	});

// Follow and Unfollow Buttons
follow();
unfollow();
function follow(){
	$('.pop-up-follow-btn').on('click', function(){
		var twitID = $(this).data('twid');
		$(this).closest('.pop-up-follow-unfollow-btn-container').append('<a data-twid="'+twitID+'" href="#" href="/unfollow/<%= user.tw_id %>" class="pop-up-unfollow-btn">unfollow</a>');
		$(this).remove();
		unfollow();

		$(this).removeClass('pop-up-follow-btn').addClass('pop-up-unfollow-btn').text('unfollow');
	  $.ajax(
	    {
	      url: "./follow/" + $(this).data('twid'),
	      method: "get",
	      success: function(result){
	      	console.log('success');
	      },
	      error: function(result){
	        console.log ('fail');
	      },
	    }
	  );
	});
}

function unfollow(){
		$('.pop-up-unfollow-btn').on('click', function(){
		var twitID = $(this).data('twid');
		$(this).closest('.pop-up-follow-unfollow-btn-container').append('<a data-twid="'+twitID+'" href="#" href="/follow/<%= user.tw_id %>" class="pop-up-follow-btn">follow</a>');
		$(this).remove();
		follow();

	  $.ajax(
	    {
	      url: "./unfollow/" + $(this).data('twid'),
	      method: "get",
	      success: function(result){
	        console.log('success')
	      },
	      error: function(result){
	        console.log ('fails');
	      },
	    }
	  );
	});
}

});