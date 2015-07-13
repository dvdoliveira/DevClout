$(".static_pages.home").ready(function(){
  $(".down-arrow").click(function() {
        $('html, body').animate({
            scrollTop: $("#main").offset().top
        }, 1500);
  });
  $('.reviews').slick({
      dots: true,
      infinite: true,
      autoplay: true,
      autoplaySpeed: 6000,
      speed: 800,
      slidesToShow: 1,
      adaptiveHeight: true
  });

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
  var myChartinView = false
  var inView = false;

  function isScrolledIntoView(elem){
    var $elem = $(elem);
    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
  }

  $(window).scroll(function() {
    if (isScrolledIntoView('.chartset1')) {
        if (myChartinView) { return; }
        myChartinView = true;
        var ctx = $("#myChart").get(0).getContext("2d");
        var myLineChart = new Chart(ctx).Line(linedata);
    }
    if (isScrolledIntoView('.chartset-scroll')) {
        if (inView) { return; }
            inView = true;
            var ctx4 = $("#myPie1").get(0).getContext("2d");
            var myDoughnutChart = new Chart(ctx4).Doughnut(piedata, {animateScale: true});
            var ctx2 = $("#myPie2").get(0).getContext("2d");
            var myPieChart = new Chart(ctx2).Pie(piedata, {animateScale: true});
            var ctx3 = $("#myPie3").get(0).getContext("2d");
            var myRadarChart = new Chart(ctx3).Radar(radardata, {animateScale: true});
            $('.chartset2-animation-column').animate({
                left: 0
            }, 1000);
    }
  });
})