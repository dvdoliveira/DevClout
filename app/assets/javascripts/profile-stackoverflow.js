$(function(){
      /** HACK **/
      $.ajax({
          url: '/profile',
          type: 'get',
          dataType: 'json',
          data: {},
          contentType: 'application/json; charset=UTF-8',
          success: function(data){
            stack_user = data.stack_user
          }
        })

      function changedNumber(number){
        if (number === 0) return 0;

        if(number > 0){
          return '+ '+number+' <i class="fa fa-long-arrow-up">';
        }else{
          return number+' <i class="fa fa-long-arrow-down">';
        }
      }

      /** HACK **/
      $(".stackoverflow-btn").on('click', function(){
            if ($(this).hasClass('active')) return;
            $(this).addClass("active");
            $(".github-btn").removeClass("active");
            // Change first stat to reputation
            $(".ap-1 h3").text("Reputation");
            $(".ap-1 .current_total").text(stack_user.reputation);
            $(".ap-1 .current_changed").text('');
            $(".ap-1 .current_changed").append(changedNumber(120-2));
            // Change second stat to views
            $(".ap-2 h3").text("Answers");
            $(".ap-2 .current_total").text(stack_user.answer_count);
            $(".ap-2 .current_changed").text('');
            $(".ap-2 .current_changed").append(changedNumber(9+2));
            // Change third stat to answers
            $(".ap-3 h3").text("Questions");
            $(".ap-3 .current_total").text(stack_user.question_count);
            $(".ap-3 .current_changed").text('');
            $(".ap-3 .current_changed").append(changedNumber(2-2));
            // Change Chart 1
            
            changedataset('so');
      })
});