$(function(){
function charactersLeftFullName(){
	var name_limit = 40;
	var name_length = $(".update-full-name").val().length;
	var name_strokesLeft =  name_limit - name_length;
	var bio_limit = 140;
	var bio_length = $(".update-bio").val().length;
	var bio_strokesLeft =  bio_limit - bio_length;
	$('.full-name-label').html('Full Name ('+name_strokesLeft+'/40)');
	$('.bio-label').html('Bio Description ('+bio_strokesLeft+'/140)');
}

$('.edit-profile').on('click', function(e){
	charactersLeftFullName();
});

$('.update-full-name, .update-bio').on('keyup', function(e){
	charactersLeftFullName();
});

$('.update_profile').on('submit', function(e){
	$('#profile-update').foundation('reveal', 'close');
	var full_name = $(".update-full-name").val();
	var user_bio = $(".update-bio").val();
	var email = $(".update-email").val();
	var profile_image_url = $(".update-profile-photo").val();
	var blog = $(".update-blog-url").val();

	$('.profile-image-name h3').text(full_name);
	$('.profile-extra-info p.user-bio').text(user_bio);
	$('.profile-image-container').html('<img alt="profile-image" src="'+profile_image_url+'">');
	$('.profile-extra-info span.email-address').html('<a class="black" href="mailto:'+email+'">'+email+'</a>');
	$('.profile-extra-info span.profile-blog-url').html('<a class="black" href="'+blog+'" target="_blank">'+blog+'</a>');
	});
});