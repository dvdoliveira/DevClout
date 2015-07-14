$(function(){
  if ($(".users.profile").length == 0) return;

  // Function called in AJAX request below
  initialize = function() {
    console.log(user)
    Chart.defaults.global.responsive = true;
    // Data set for Github
    var Line = {}
    var gh_linedata = {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
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
      labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
      datasets: [
          {
              label: "My First dataset",
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: [65, 59, 90, 81, 56, 55, 40]
          },
          {
              label: "My Second dataset",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: [28, 48, 40, 19, 96, 27, 100]
          }
      ]
    };

    // Data set for StackOverflow
    var so_linedata = {
      labels: ["Stack", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [65, 59, 80, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            fillColor: "rgba(151,187,205,0.2)",
            strokeColor: "rgba(151,187,205,1)",
            pointColor: "rgba(151,187,205,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(151,187,205,1)",
            data: [28, 48, 40, 19, 86, 27, 90]
        }
      ]
    };
    var so_piedata = [
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
    var so_radardata = {
      labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
      datasets: [
          {
              label: "My First dataset",
              fillColor: "rgba(220,220,220,0.2)",
              strokeColor: "rgba(220,220,220,1)",
              pointColor: "rgba(220,220,220,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(220,220,220,1)",
              data: [65, 59, 90, 81, 56, 55, 40]
          },
          {
              label: "My Second dataset",
              fillColor: "rgba(151,187,205,0.2)",
              strokeColor: "rgba(151,187,205,1)",
              pointColor: "rgba(151,187,205,1)",
              pointStrokeColor: "#fff",
              pointHighlightFill: "#fff",
              pointHighlightStroke: "rgba(151,187,205,1)",
              data: [28, 48, 40, 19, 96, 27, 100]
          }
      ]
    };

    // Changes graphs between GH and SO
    changedataset = function(service){
      if (service == 'gh') {
        piedata = gh_piedata
        radardata = gh_radardata
        linedata = gh_linedata
      } else if (service == 'so') {
        piedata = so_piedata
        radardata = so_radardata
        linedata = so_linedata
      }
      var ctx5 = $("#myPie4").get(0).getContext("2d");
      var myDoughnutChart = new Chart(ctx5).Doughnut(piedata, {animateScale: true});

      var ctx6 = $("#myPie6").get(0).getContext("2d");
      var myRadarChart = new Chart(ctx6).Radar(radardata, {animateScale: true});

      var ctx7 = $("#myPie7").get(0).getContext("2d");
      var myLineChart = new Chart(ctx7).Line(linedata);

      var ctx8 = $("#myPie8").get(0).getContext("2d");
      var myLineChart = new Chart(ctx8).Line(linedata);
    }

    // Button to switch from GitHub to StackOverflow
    $(".stackoverflow-btn").on('click', function(){
      if ($(this).hasClass('active')) return;
      $(this).addClass("active")
      $(".github-btn").removeClass("active")
      changedataset('so')
    })

    $(".github-btn").on('click', function(){
      if ($(this).hasClass('active')) return;
      $(this).addClass("active")
      $(".stackoverflow-btn").removeClass("active")
      changedataset('gh')
    })
    // Default page to Github stats
    changedataset('gh')
  };

  // Makes AJAX request then creates graphs
  var user
  var user_data = $.ajax({
    url: '/profile',
    type: 'get',
    dataType: 'json',
    data: {},
    contentType: 'application/json; charset=UTF-8',
    success: function(data){
      user = data
      initialize();
    }
  })

})
