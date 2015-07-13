$(function(){
  if ($(".sessions.profile").length == 0) return;
  Chart.defaults.global.responsive = true;
  var Line = {}
  var linedata = {
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
  var piedata = [
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
  var radardata = {
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

  /** testing for profile page **/
    var ctx5 = $("#myPie4").get(0).getContext("2d");
    var myDoughnutChart = new Chart(ctx5).Doughnut(piedata, {animateScale: true});

    var ctx6 = $("#myPie6").get(0).getContext("2d");
    var myRadarChart = new Chart(ctx6).Radar(radardata, {animateScale: true});

    var ctx7 = $("#myPie7").get(0).getContext("2d");
    var myLineChart = new Chart(ctx7).Line(linedata);

    var ctx8 = $("#myPie8").get(0).getContext("2d");
    var myLineChart = new Chart(ctx8).Line(linedata);
})
