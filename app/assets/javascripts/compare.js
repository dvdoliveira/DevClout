$(function(){
  if (window.location.pathname.match(/compare/)) {
    var user;
    var user2;
    var both_ajax_done = 0;
    var current_user_id = $(".user_id").text()
    
    var ctx5, ctx6;
    var piedata, pieoptions;
    var gh_piedata;
    var so_piedata;
    var myDoughnutChart;
    var myDoughnutChart2;
    var some_num = 0;

    $.ajax({
      url: '/compare' + window.location.search,
      type: 'get',
      dataType: 'json',
      data: { format: 'json' },
      contentType: 'application/json; charset=UTF-8',
      success: function(data) {
        user2 = data;
        add_user_col(user2);
        both_ajax_done += 1;
        if (both_ajax_done == 2) {
          update_gh_stats();
        }
      }
    })

    $.ajax({
      url: '/compare?id=' + current_user_id,
      type: 'get',
      dataType: 'json',
      data: { format: 'json' },
      contentType: 'application/json; charset=UTF-8',
      success: function(data) {
        user = data;
        both_ajax_done += 1;
        if (both_ajax_done == 2) {
          update_gh_stats();
        }
      }
    })

    function add_user_col(user) {
      $(".user-table").append('<td id="td2"> \
        <div class="analytics-pane"> \
          <div style="clear:both;"></div> \
          <!-- Main Analytics --> \
          <div class="main-analytics"> \
            <!-- 1st level --> \
            <div class="row centered-text"> \
              <div class="medium-12 large-12 columns"> \
                <div class="analytic-panel"> \
                  <h3>'+ user.user.full_name +'</h3> \
                  <div class="compare-image-container"> \
                    <img src="' + user.user.profile_image_url + '"> \
                  </div> \
                  <h4>' + user.user.user_level + '</h4> \
                </div> \
              </div> \
              <div class="medium-12 large-12 columns"> \
                <div class="analytic-panel ap-1"> \
                  <h3>Followers <!-- <span data-tooltip aria-haspopup="true" class="has-tip" title="Followers: Put Some Text Here..."><i class="fa fa-question-circle"></i></span> --></h3> \
                  <span class="current_total">' + user.github_user.followers + '</span> \
                  <span class="current_changed"><i class="fa fa-minus"></i></span> \
                </div> \
              </div> \
              <div class="medium-12 large-12 columns"> \
                <div class="analytic-panel ap-2"> \
                  <h3>Public Repositories <!-- <span data-tooltip aria-haspopup="true" class="has-tip" title="Followers: Put Some Text Here..."><i class="fa fa-question-circle"></i></span> --></h3> \
                  <span class="current_total">' + user.github_user.public_repos + '</span> \
                  <span class="current_changed"><i class="fa fa-minus"></i></span> \
                </div> \
              </div> \
              <div class="medium-12 large-12 columns"> \
                <div class="analytic-panel ap-3"> \
                  <h3>Leaderboard Rank <!-- <span data-tooltip aria-haspopup="true" class="has-tip" title="Followers: Put Some Text Here..."><i class="fa fa-question-circle"></i></span> --></h3> \
                  <span class="current_total">' + user.current_rank + '</span> \
                  <span class="current_changed"><i class="fa fa-minus"></i></span> \
                </div> \
              </div> \
            </div> \
            <!-- #/end of 1st level --> \
            <!-- 2nd level --> \
            <div class="row centered-text"> \
              <div class="medium-12 large-12 columns"> \
                <div class="analytic-panel graph2"> \
                  <h3>Languages</h3> \
                  <canvas class="myPie4" class="chartset3"></canvas> \
                  <!-- comparing with --> \
                  <div class="comparing-with"> \
                    <div id="pie-legend2"></div> \
                  </div> \
                  <!-- #/End of comparing with --> \
                </div> \
              </div> \
            </div> \
          </div> \
          <!-- #/End of Main Analytics --> \
        </div> \
      </td>')
    }
    function update_graphs(user) {
      var colors =["rgb(168,194,194)","rgb(86,144,193)","rgb(217,157,135)","rgb(242,199,172)","rgb(239,212,155)","rgb(232,221,197)","rgb(188,171,161)","rgb(153,188,217)","rgb(148,170,192)","rgb(194,163,189)","rgb(135,136,138)"];
      var lighter_colors = [];

      var languages_data = [];
      var languages_associative = {};
      for (i = 0;i < 5; i++) {
        var current_repo = user.github_repos[i];
        if(languages_associative[current_repo.language]==undefined){
          languages_associative[current_repo.language]=1;
        }else{
          languages_associative[current_repo.language] +=1;
        }
      }

      var count = 0;
      for(var index in languages_associative) {
        languages_data.push({
          value: languages_associative[index],
          color: colors[count],
          highlight: lighter_colors[count],
          label: index
        });
        if (count < 10){
          count += 1;
        } else{
          count = 0;
        };
      };

      gh_piedata = languages_data;

      if (user.stack_user && user.stack_user.bc_bronze + user.stack_user.bc_silver + user.stack_user.bc_gold > 0) {
        so_piedata = [
          {
              value: user.stack_user.bc_bronze,
              color:"#CD7F32",
              highlight: "#D7995B",
              label: "Bronze"
          },
          {
              value: user.stack_user.bc_silver,
              color: "#C0C0C0 ",
              highlight: "#DADADA",
              label: "Silver"
          },
          {
              value: user.stack_user.bc_gold,
              color: "#FFD700",
              highlight: "#FFDF33",
              label: "Gold"
          }
        ]
      }else{
        so_piedata = [
          {
              value: 1,
              color:"#f1f1f1",
              highlight: "#D8D8D8",
              label: "No Badges"
          }
        ]
      }

      if ($('.github-btn').hasClass('active')) {
        piedata = gh_piedata;
        pieoptions = {animateScale: true};
      } else {
        piedata = so_piedata;
        if (user.stack_user && user.stack_user.bc_bronze + user.stack_user.bc_silver + user.stack_user.bc_gold > 0){
          pieoptions = {animateScale: true}
        } else {
          pieoptions = {animateScale: true, tooltipTemplate: "No Badges"};
        }
      }

      if (user.user.id == current_user_id) {
        ctx5 = $("#td1 .myPie4").get(0).getContext("2d");
        myDoughnutChart = new Chart(ctx5).Doughnut(piedata, pieoptions);
        legend(document.getElementById('pie-legend1'), piedata, myDoughnutChart);
      } else {
        ctx6 = $("#td2 .myPie4").get(0).getContext("2d");
        myDoughnutChart2 = new Chart(ctx6).Doughnut(piedata, pieoptions);
        legend(document.getElementById('pie-legend2'), piedata, myDoughnutChart2);
      }

    }
    $(".stackoverflow-btn").on('click', function(){
      if ($(this).hasClass('active')) return;
      if (!user.stack_user || !user2.stack_user) return;
      $(this).addClass("active");
      $(".github-btn").removeClass("active");
      // Change first stat to reputation
      $("#td1 .ap-1 h3").text("Reputation ");
      $("#td1 .ap-1 .current_total").text(user.stack_user.reputation);
      $("#td1 .ap-1 .current_changed").html(change_in(user.stack_user.reputation, "so_reputation_count", user));
      // Change second stat to views
      $("#td1 .ap-2 h3").text("Up/Down Ratio ");
      $("#td1 .ap-2 .current_total").text(user.stack_user.view_count);
      $("#td1 .ap-2 .current_changed").html(change_in(up_down_ratio(user), "so_up_down_ratio", user));
      // Change third stat to answers
      $("#td1 .ap-3 h3").text("Answers ");
      $("#td1 .ap-3 .current_total").text(user.stack_user.answer_count);
      $("#td1 .ap-3 .current_changed").html(change_in(user.stack_user.answer_count, "so_answer_count", user));
       // Change 4 graph titles
      $("#td1 .graph2 h3").text("Badges");

      // Change first stat to reputation
      $("#td2 .ap-1 h3").text("Reputation ");
      $("#td2 .ap-1 .current_total").text(user2.stack_user.reputation);
      $("#td2 .ap-1 .current_changed").html(change_in(user2.stack_user.reputation, "so_reputation_count", user2));
      // Change second stat to views
      $("#td2 .ap-2 h3").text("Up/Down Ratio ");
      $("#td2 .ap-2 .current_total").text(user2.stack_user.view_count);
      $("#td2 .ap-2 .current_changed").html(change_in(up_down_ratio(user2), "so_up_down_ratio", user2));
      // Change third stat to answers
      $("#td2 .ap-3 h3").text("Answers ");
      $("#td2 .ap-3 .current_total").text(user2.stack_user.answer_count);
      $("#td2 .ap-3 .current_changed").html(change_in(user2.stack_user.answer_count, "so_answer_count", user2));
       // Change 4 graph titles
      $("#td2 .graph2 h3").text("Badges");

      myDoughnutChart.destroy();
      myDoughnutChart2.destroy();
      update_graphs(user);
      update_graphs(user2);
    });
    $(".github-btn").on('click', function(){
      if ($(this).hasClass('active')) return;
      $(this).addClass("active");
      $(".stackoverflow-btn").removeClass("active");
      update_gh_stats();
        
    });
    function update_gh_stats() {
      // Change first stat to followers
      $("#td1 .ap-1 h3").html("Followers ");
      $("#td1 .ap-1 .current_total").text(user.github_user.followers);
      $("#td1 .ap-1 .current_changed").html(change_in(user.github_user.followers, "gh_followers", user));
      // Change second stat to pub repos
      $("#td1 .ap-2 h3").text("Public Repositories ");
      $("#td1 .ap-2 .current_total").text(user.github_user.public_repos);
      $("#td1 .ap-2 .current_changed").html(change_in(user.github_user.public_repos, "gh_repo_count", user));
      // Change third stat to f.f ratio
      $("#td1 .ap-3 h3").text("Leaderboard Rank ");
      $("#td1 .ap-3 .current_total").text(user.current_rank);
      $("#td1 .ap-3 .current_changed").html(change_in(user.current_rank, "leaderboard_rank", user));
      // Change 4 graph titles
      $("#td1 .graph2 h3").text("Languages");

      // Change first stat to followers
      $("#td2 .ap-1 h3").html("Followers ");
      $("#td2 .ap-1 .current_total").text(user2.github_user.followers);
      $("#td2 .ap-1 .current_changed").html(change_in(user2.github_user.followers, "gh_followers", user2));
      // Change second stat to pub repos
      $("#td2 .ap-2 h3").text("Public Repositories ");
      $("#td2 .ap-2 .current_total").text(user2.github_user.public_repos);
      $("#td2 .ap-2 .current_changed").html(change_in(user2.github_user.public_repos, "gh_repo_count", user2));
      // Change third stat to f.f ratio
      $("#td2 .ap-3 h3").text("Leaderboard Rank ");
      $("#td2 .ap-3 .current_total").text(user2.current_rank);
      $("#td2 .ap-3 .current_changed").html(change_in(user2.current_rank, "leaderboard_rank", user2));
      // Change 4 graph titles
      $("#td2 .graph2 h3").text("Languages");
      if (some_num > 0){
        myDoughnutChart.destroy();
        myDoughnutChart2.destroy();
      }
      console.log(some_num);
      update_graphs(user);
      update_graphs(user2);
      some_num += 1;
    }
    function update_total_score() {
      $("#td1 .total-score-changed").html(change_in(user.user.user_score, "gh_total_score", user))
      $("#td2 .total-score-changed").html(change_in(user2.user.user_score, "gh_total_score", user2))
    }
    function up_down_ratio(user) {
      if (user.stack_user.down_vote_count > 0) {
        return(user.stack_user.up_vote_count / user.stack_user.down_vote_count);
      } else {return(user.stack_user.up_vote_count / 1);};
    }
    function change_in(new_stat, stat_field, user) {
      var old_stat;
      var change;

      if (stat_field === "so_up_down_ratio") {
        var old_up;
        var old_down;
        for (i=0; i<user.newest_stats.length; i++) {
          if (user.newest_stats[i].score_type === "so_up_vote") {
            old_up = user.newest_stats[i].score;
            break;
          }
        }
        for (i=0; i<user.newest_stats.length; i++) {
          if (user.newest_stats[i].score_type === "so_down_vote") {
            old_down = user.newest_stats[i].score;
            break;
          }
        }
        if (old_down > 0) {
          old_stat = (old_up / old_down);
        } else {old_stat = (old_up / 1);};

      } else {

        for (i=0; i<user.newest_stats.length; i++) {
          if (user.newest_stats[i].score_type === stat_field) {
            old_stat = user.newest_stats[i].score;
            break;
          }
        }
      }
      if (stat_field === "leaderboard_rank") {
        change = parseFloat((old_stat - new_stat).toFixed(2));
      } else {
        change = parseFloat((new_stat - old_stat).toFixed(2));
      }
      
      if (change > 0) {
        return('+' + change + ' <i class="fa fa-long-arrow-up"></i>');
      } else if (change < 0) {
        return(change + ' <i class="fa fa-long-arrow-down"></i>');
      } else if (change == 0) {
        return('<i class="fa fa-minus"></i>');
      }
    }
  }
})
// Number("id11".replace( /^\D+/g, ''))

