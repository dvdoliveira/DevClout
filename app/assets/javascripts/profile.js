$(function(){
  if ($(".users.profile").length == 0) return;

// Function called in AJAX request below
  initialize = function(user) {
    console.log(user);
    var stack_user = user.stack_user;
    var github_user = user.github_user;
    var average = user.average;
    var github_repos = user.github_repos
    Chart.defaults.global.responsive = true;

    // Initializing variables for charts and data
    var Line = {};
    var ctx5;
    var myDoughnutChart;

    var ctx6;
    var myRadarChart;

    var ctx7;
    var myLineChart;

    var ctx8;
    var myBarChart;

    var piedata, radardata, linedata, bardata;

    var colors =[];
    var lighter_colors = [];

    // Figures out the last 6 months in string form for the graph labels

    function addMonths(date, months) {
      date.setMonth(date.getMonth() + months);
      return date;
    }

    var last_six_months = [];
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December", "January", "February", "March", "April", "May", "June"];
    var d = addMonths(new Date(), -5);
    var six_month_ago =  d.getMonth();

    for (i = six_month_ago;i < (six_month_ago + 6);i++) {
      last_six_months.push(monthNames[i]);
    }

    // Calculate total watchers and forks across all repos for user and the repos forks
    var total_watchers = 0;
    var total_forks = 0;
    var total_stars = 0;
    var repos_names = [];
    var repos_forks = [];
    var repos_watchers = [];
    var repos_stars = [];
    var languages_associative = {};
    for (i = 0;i < github_repos.length; i++) {
      var current_repo = user.github_repos[i];
      repos_names.push(current_repo.name);
      total_watchers += current_repo.watchers_count
      total_forks += current_repo.forks_count
      total_stars =+ current_repo.stars_count
      repos_forks.push(current_repo.forks_count);
      repos_stars.push(current_repo.stars_count);
      repos_watchers.push(current_repo.watchers_count);
      if(languages_associative[current_repo.language]==undefined){
        languages_associative[current_repo.language]=1;
      }else{
        languages_associative[current_repo.language] +=1;
      }
    }

    // This is for creating 10 random colors in RGB and finding their highlighted version
    function lighten(color, percent) {
      var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
      return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
    };

    function rgb_to_rgba(rgb, percent){
      new_rgba = rgb.replace(/rgb/i, "rgba");
      new_rgba = new_rgba.replace(/\)/i, ',' + percent + ')');
      return new_rgba;
    };

    function random_color_creator() {
      colors =[];
      lighter_colors = [];
      for (i=0;i<10;i++) {
        random_color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
        colors.push(random_color);
        lighter_colors.push(lighten(random_color, 0.2));
      };
    };
    random_color_creator();

    // This makes the data for each users language for the GitHub pie graph 
    var languages_data = [];
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

    // Graphs for Github
    var gh_bardata = {
        labels: repos_names,
        datasets: [
            {
              label: "Forks",
              fillColor: rgb_to_rgba(colors[0], 0.5),
              strokeColor: rgb_to_rgba(colors[0], 0.8),
              highlightFill: rgb_to_rgba(colors[0], 0.75),
              highlightStroke: rgb_to_rgba(colors[0], 1),
              data: repos_forks
            },
            {
              label: "Stars",
              fillColor: rgb_to_rgba(colors[1], 0.5),
              strokeColor: rgb_to_rgba(colors[1], 0.8),
              highlightFill: rgb_to_rgba(colors[1], 0.75),
              highlightStroke: rgb_to_rgba(colors[1], 1),
              data: repos_stars
            },
            {
              label: "Watchers",
              fillColor: rgb_to_rgba(colors[2], 0.5),
              strokeColor: rgb_to_rgba(colors[2], 0.8),
              highlightFill: rgb_to_rgba(colors[2], 0.75),
              highlightStroke: rgb_to_rgba(colors[2], 1),
              data: repos_watchers
            }
        ]
    };
    var gh_linedata = {
      labels: last_six_months,
      datasets: [
        {
          label: user.user.full_name,
          fillColor: rgb_to_rgba(colors[0], 0.2),
          strokeColor: rgb_to_rgba(colors[0], 1),
          pointColor: rgb_to_rgba(colors[0], 1),
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: rgb_to_rgba(colors[0], 1),
          data: [65, 59, 80, 81, 56, 55]
        },
        {
          label: "Average All Users",
          fillColor: rgb_to_rgba(colors[1], 0.2),
          strokeColor: rgb_to_rgba(colors[1], 1),
          pointColor: rgb_to_rgba(colors[1], 1),
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: rgb_to_rgba(colors[1], 1),
          data: [28, 48, 40, 19, 86, 27]
        }
      ]
    };
    var gh_piedata = languages_data;

    var gh_radardata = {
      labels: ["Score", "Following", "Followers", "Forks", "Stars"],
      datasets: [
          {
            label: user.user.full_name,
            fillColor: rgb_to_rgba(colors[0], 0.2),
            strokeColor: rgb_to_rgba(colors[0], 1),
            pointColor: rgb_to_rgba(colors[0], 1),
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: rgb_to_rgba(colors[0], 1),
            data: [user.user.user_score, github_user.following, github_user.followers, total_forks, total_stars]
          },
          {
            label: "Average All Users",
            fillColor: rgb_to_rgba(colors[1], 0.2),
            strokeColor: rgb_to_rgba(colors[1], 1),
            pointColor: rgb_to_rgba(colors[1], 1),
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: rgb_to_rgba(colors[1], 1),
            data: [user.avg_user_score, average.gh_users_following, average.gh_users_followers, average.gh_users_forks, average.gh_users_stars]
          }
      ]
    };

// Data set for StackOverflow
    if (stack_user) {
      var so_bardata = {
          labels: last_six_months,
          datasets: [
              {
                label: "My First dataset",
                fillColor: rgb_to_rgba(colors[0], 0.5),
                strokeColor: rgb_to_rgba(colors[0], 0.8),
                highlightFill: rgb_to_rgba(colors[0], 0.75),
                highlightStroke: rgb_to_rgba(colors[0], 1),
                data: [65, 59, 80, 81, 56, 55]
              },
              {
                label: "My Second dataset",
                fillColor: rgb_to_rgba(colors[1], 0.5),
                strokeColor: rgb_to_rgba(colors[1], 0.8),
                highlightFill: rgb_to_rgba(colors[1], 0.75),
                highlightStroke: rgb_to_rgba(colors[1], 1),
                data: [28, 48, 40, 19, 86, 27]
              }
          ]
      };
      var so_linedata = {
        labels: last_six_months,
        datasets: [
          {
            label: "My First dataset",
            fillColor: rgb_to_rgba(colors[0], 0.2),
            strokeColor: rgb_to_rgba(colors[0], 1),
            pointColor: rgb_to_rgba(colors[0], 1),
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: rgb_to_rgba(colors[0], 1),
            data: [65, 59, 80, 81, 56, 55]
          },
          {
            label: "My Second dataset",
            fillColor: rgb_to_rgba(colors[1], 0.2),
            strokeColor: rgb_to_rgba(colors[1], 1),
            pointColor: rgb_to_rgba(colors[1], 1),
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: rgb_to_rgba(colors[1], 1),
            data: [28, 48, 40, 19, 86, 27]
          }
        ]
      };

      if (stack_user.bc_bronze + stack_user.bc_silver + stack_user.bc_gold > 0) {
        var so_piedata = [
          {
              value: stack_user.bc_bronze,
              color:"#CD7F32",
              highlight: "#D7995B",
              label: "Bronze"
          },
          {
              value: stack_user.bc_silver,
              color: "#C0C0C0 ",
              highlight: "#DADADA",
              label: "Silver"
          },
          {
              value: stack_user.bc_gold,
              color: "#FFD700",
              highlight: "#FFDF33",
              label: "Gold"
          }
        ]
      }else{
        var so_piedata = [
          {
              value: 1,
              color:"#f1f1f1",
              highlight: "#D8D8D8",
              label: "No Badges"
          }
        ]
      }

      var so_radardata = {
        labels: ["Answers", "Questions", "Up-Votes", "Down-Votes"],
        datasets: [
            {
              label: user.user.full_name,
              fillColor: rgb_to_rgba(colors[0], 0.2),
              strokeColor: rgb_to_rgba(colors[0], 1),
              pointColor: rgb_to_rgba(colors[0], 1),
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: rgb_to_rgba(colors[0], 1),
              data: [stack_user.answer_count, stack_user.question_count, stack_user.up_vote_count, stack_user.down_vote_count]
            },
            {
              label: "Average All Users",
              fillColor: rgb_to_rgba(colors[1], 0.2),
              strokeColor: rgb_to_rgba(colors[1], 1),
              pointColor: rgb_to_rgba(colors[1], 1),
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: rgb_to_rgba(colors[1], 1),
              data: [average.so_users_answers, average.so_users_questions, average.so_users_up_votes, average.so_users_down_votes]
            }
        ]
      };
    };

// Changes graphs between GH and SO
    function changedataset() {
      if ($(".github-btn").hasClass('active')) {
        piedata = gh_piedata;
        radardata = gh_radardata;
        linedata = gh_linedata;
        bardata = gh_bardata;
      } else if ($(".stackoverflow-btn").hasClass('active')) {
        piedata = so_piedata;
        radardata = so_radardata;
        linedata = so_linedata;
        bardata = so_bardata;
      }
    }
    changedataset();

    creategraphs = function() {
      // First checks if the user has any stackoverflow badges to display the badges pie graph
      ctx6 = $("#myPie6").get(0).getContext("2d");
      myRadarChart = new Chart(ctx6).Radar(radardata, {animateScale: true});
      legend(document.getElementById('radar-legend'), radardata, myRadarChart);

      ctx5 = $("#myPie4").get(0).getContext("2d");
      myDoughnutChart = new Chart(ctx5).Doughnut(piedata, {animateScale: true});
      legend(document.getElementById('pie-legend'), piedata, myDoughnutChart);
     
      ctx7 = $("#myPie7").get(0).getContext("2d");
      myLineChart = new Chart(ctx7).Line(linedata);
      legend(document.getElementById('line-legend'), linedata, myLineChart);

      ctx8 = $("#myPie8").get(0).getContext("2d");
      myBarChart = new Chart(ctx8).Bar(bardata, {
        labelLength: 4,
        animation: true,
        barValueSpacing : 5,
        barDatasetSpacing : 1,
        tooltipFillColor: "rgba(0,0,0,0.8)",                
        multiTooltipTemplate: "<%= datasetLabel %> = <%= value %>",
      });
      legend(document.getElementById('bar-legend'), bardata, myBarChart);
    };
    creategraphs();

    function updategraphs(){
      changedataset();

      myBarChart.destroy();
      myLineChart.destroy();
      myDoughnutChart.destroy();
      myRadarChart.destroy();

      creategraphs();
    };

    // Button to switch from GitHub to StackOverflow'=
    if (stack_user) {
      $(".stackoverflow-btn").on('click', function(){
        if ($(this).hasClass('active')) return;
        $(this).addClass("active");
        $(".github-btn").removeClass("active");
        // Change first stat to reputation
        $(".ap-1 h3").text("Reputation ");
        $(".ap-1 .current_total").text(stack_user.reputation);
        $(".ap-1 .current_changed").text();
        // Change second stat to views
        $(".ap-2 h3").text("Views ");
        $(".ap-2 .current_total").text(stack_user.view_count);
        $(".ap-2 .current_changed").text();
        // Change third stat to answers
        $(".ap-3 h3").text("Answers ");
        $(".ap-3 .current_total").text(stack_user.answer_count);
        $(".ap-3 .current_changed").text();
         // Change 4 graph titles
        $(".graph1 h3").text("General");
        $(".graph2 h3").text("Badges");
        $(".graph3 h3").text("Reputation");
        $(".graph4 h3").text("Influence");

        updategraphs();
      }); 
    } else {
      
    }

    function ff_ratio() { 
      if (github_user.following > 0) {
        github_user.followers / github_user.following
      } else {0};
    }

    $(".github-btn").on('click', function(){
      if ($(this).hasClass('active')) return;
      $(this).addClass("active");
      $(".stackoverflow-btn").removeClass("active");
      // Change first stat to followers
      $(".ap-1 h3").text("Followers ");
      $(".ap-1 .current_total").text(github_user.followers);
      $(".ap-1 .current_changed").text();
      // Change second stat to pub repos
      $(".ap-2 h3").text("Public Repositories ");
      $(".ap-2 .current_total").text(github_user.public_repos);
      $(".ap-2 .current_changed").text();
      // Change third stat to f.f ratio
      $(".ap-3 h3").text("F.F Ratio ");
      $(".ap-3 .current_total").text(ff_ratio);
      $(".ap-3 .current_changed").text();
      // Change 4 graph titles
      $(".graph1 h3").text("General");
      $(".graph2 h3").text("Languages");
      $(".graph3 h3").text("DUNNO");
      $(".graph4 h3").text("Repositories");
      // Change second graph persons
      
      updategraphs();
    });
  };

// Makes AJAX request then creates graphs
  $.ajax({
    url: '/profile',
    type: 'get',
    dataType: 'json',
    data: { format: 'json' },
    contentType: 'application/json; charset=UTF-8',
    success: initialize
  })
})
