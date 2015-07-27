$(function(){
  if ($(".static_pages.home").length == 0) return;
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

  var colors =["rgb(168,194,194)","rgb(86,144,193)","rgb(217,157,135)","rgb(242,199,172)","rgb(239,212,155)","rgb(232,221,197)","rgb(188,171,161)","rgb(153,188,217)","rgb(148,170,192)","rgb(194,163,189)","rgb(135,136,138)"];
  var lighter_colors = [];

  function lighten(color, percent) {
    var f=color.split(","),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=parseInt(f[0].slice(4)),G=parseInt(f[1]),B=parseInt(f[2]);
    return "rgb("+(Math.round((t-R)*p)+R)+","+(Math.round((t-G)*p)+G)+","+(Math.round((t-B)*p)+B)+")";
  };

  function rgb_to_rgba(rgb, percent){
    var new_rgba = rgb.replace(/rgb/i, "rgba");
    new_rgba = new_rgba.replace(/\)/i, ',' + percent + ')');
    return new_rgba;
  };

  function color_scheme() {
    for (i=0;i<colors.length;i++) {
      // random_color = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
      var color = colors[i];
      lighter_colors.push(lighten(color, 0.2));
    };
  };
  color_scheme();

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
  var sopiedata = [
    {
        value: 9,
        color:"#CD7F32",
        highlight: "#D7995B",
        label: "Bronze"
    },
    {
        value: 3,
        color: "#C0C0C0 ",
        highlight: "#DADADA",
        label: "Silver"
    },
    {
        value: 1,
        color: "#FFD700",
        highlight: "#FFDF33",
        label: "Gold"
    }
  ]

  var piedata = [
    {
      value: 2,
      color: colors[0],
      highlight: lighter_colors[0],
      label: "HTML"
    },
    {
      value: 5,
      color: colors[1],
      highlight: lighter_colors[1],
      label: "Ruby"
    },
    {
      value: 4,
      color: colors[2],
      highlight: lighter_colors[2],
      label: "Python"
    },
    {
      value: 1,
      color: colors[3],
      highlight: lighter_colors[3],
      label: "PHP"
    },
    {
      value: 3,
      color: colors[4],
      highlight: lighter_colors[4],
      label: "Javascript"
    }
  ]
  
  var radardata = {
    labels: ["Score", "Following", "Followers", "Forks", "Stars"],
    datasets: [
        {
          label: "Bob",
          fillColor: rgb_to_rgba(colors[0], 0.2),
          strokeColor: rgb_to_rgba(colors[0], 1),
          pointColor: rgb_to_rgba(colors[0], 1),
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: rgb_to_rgba(colors[0], 1),
          data: [48, 27, 30, 67, 23]
        },
        {
          label: "Average All Users",
          fillColor: rgb_to_rgba(colors[1], 0.2),
          strokeColor: rgb_to_rgba(colors[1], 1),
          pointColor: rgb_to_rgba(colors[1], 1),
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: rgb_to_rgba(colors[1], 1),
          data: [31, 20, 28, 16, 10]
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
            var myPieChart = new Chart(ctx2).Pie(sopiedata, {animateScale: true});
            var ctx3 = $("#myPie3").get(0).getContext("2d");
            var myRadarChart = new Chart(ctx3).Radar(radardata, {animateScale: true});
            $('.chartset2-animation-column').animate({
                left: 0
            }, 1000);
    }
  });
})