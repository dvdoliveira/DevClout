$(function(){
  if ($(".users.profile").length == 0) return;

// Function called in AJAX request below
  initialize = function(user) {
    console.log(user);
    console.log(user.github_repos[1])
    var stack_user = user.stack_user;
    var github_user = user.github_user;
    var average = user.average[0];
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

    // Calculate total watchers and forks across all repos for user
    var total_watchers = 0;
    var total_forks = 0;
    var total_stars = 0;
    for (i>0;i<user.github_repos.length;i++) {
      var current_repo = user.github_repos[i];
      total_watchers += current_repo.watchers_count
      total_forks += current_repo.forks_count
      total_stars =+ current_repo.stars_count
    }

    // Graphs for Github
    var gh_bardata = {
        labels: last_six_months,
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,0.8)",
                highlightFill: "rgba(151,187,205,0.75)",
                highlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27]
            }
        ]
    };
    var gh_linedata = {
      labels: last_six_months,
      datasets: [
        {
            label: "This User",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55]
        },
        {
            label: "User Average",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27]
        }
      ]
    };
    var gh_piedata = [
      {
          value: 300,
          color:"#F7464A",
          highlight: "#FF5A5E",
          label: "Red"
      },
      {
          value: 50,
          color: "#46BFBD",
          highlight: "#5AD3D1",
          label: "Green"
      },
      {
          value: 100,
          color: "#FDB45C",
          highlight: "#FFC870",
          label: "Yellow"
      },
      {
          value: 100,
          color: "#2ec81b",
          highlight: "#3dbf1c",
          label: "Green"
      }
    ]
    var gh_radardata = {
      labels: ["Score", "Following", "Followers", "Forks", "Stars"],
      datasets: [
          {
              label: user.full_name,
              fillColor: "rgba(250,164,58,0.2)",
              strokeColor: "rgba(250,164,58,1)",
              pointColor: "rgba(250,164,58,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(250,164,58,1)",
              data: [user.user.user_score, github_user.following, github_user.followers, total_forks, total_stars]
          },
          {
              label: "Average All Users",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: [user.avg_user_score, average.gh_users_following, average.gh_users_followers, average.gh_users_forks, average.gh_users_stars]
          }
      ]
    };

// Data set for StackOverflow
    var so_bardata = {
        labels: last_six_months,
        datasets: [
            {
                label: "My First dataset",
                fillColor: "rgba(220,220,220,0.5)",
                strokeColor: "rgba(220,220,220,0.8)",
                highlightFill: "rgba(220,220,220,0.75)",
                highlightStroke: "rgba(220,220,220,1)",
                data: [65, 59, 80, 81, 56, 55]
            },
            {
                label: "My Second dataset",
                fillColor: "rgba(151,187,205,0.5)",
                strokeColor: "rgba(151,187,205,0.8)",
                highlightFill: "rgba(151,187,205,0.75)",
                highlightStroke: "rgba(151,187,205,1)",
                data: [28, 48, 40, 19, 86, 27]
            }
        ]
    };
    var so_linedata = {
      labels: last_six_months,
      datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27]
        }
      ]
    };
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
    var so_radardata = {
      labels: ["Answers", "Questions", "Up-Votes", "Down-Votes"],
      datasets: [
          {
              label: user.full_name,
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: [stack_user.answer_count, stack_user.question_count, stack_user.up_vote_count, stack_user.down_vote_count]
          },
          {
              label: "Average all users",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: [average.so_users_answers, average.so_users_questions, average.so_users_up_votes, average.so_users_down_votes]
          }
      ]
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

      if ($(".github-btn").hasClass('active')) {
        if ($("myPie4").length < 1){
          $(".replace-so-pie").replaceWith("<canvas id='myPie4' class='chartset3'>")
        };
        ctx5 = $("#myPie4").get(0).getContext("2d");
        myDoughnutChart = new Chart(ctx5).Doughnut(piedata, {animateScale: true});
      } else if (stack_user.bc_bronze + stack_user.bc_silver + stack_user.bc_gold > 0) {
        ctx5 = $("#myPie4").get(0).getContext("2d");
        myDoughnutChart = new Chart(ctx5).Doughnut(piedata, {animateScale: true});
      } else {
        $("#myPie4").replaceWith("<div class='replace-so-pie chartset3'><h4>Achieve at least 1 badge to see this graph</h4></div>");
        $('.replace-so-pie').css('min-height', $('#myPie6').height());
      }

      ctx7 = $("#myPie7").get(0).getContext("2d");
      myLineChart = new Chart(ctx7).Line(linedata);

      ctx8 = $("#myPie8").get(0).getContext("2d");
      myBarChart = new Chart(ctx8).Bar(bardata);
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

    // Button to switch from GitHub to StackOverflow
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
      $(".graph3 h3").text("Repositories");
      $(".graph4 h3").text("Followers");

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
