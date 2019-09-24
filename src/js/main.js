jQuery(document).ready(function() {
  
  //////////////////////////////////
  // $("#selectYes").click(() => {
  //   $("#selectExam").fadeIn();
  // });
  // $(document).mouseup(function(e) {
  //   if ($(e.target).closest("#selectYes").length === 0) {
  //     $("#selectExam").fadeOut();
  //   }
  // });
  $("#openSideMenu").click(() => {
    $("aside").css({ right: 0 });
  });
  $("#closeSideMenu").click(() => {
    $("aside").css({ right: -350 });
  });
  $("#datepicker").datepicker();
  // $('body').click(() => {
  //     $('#selectExam').fadeOut();
  // });
  // Scrollbar for The Left Side if it needed
  $('.nice-scroll').niceScroll({
    railalign: document.dir === "rtl" ? 'left' : 'right',
    rtlmode: document.dir === "rtl" ? true : false,
    hwacceleration: document.dir === "rtl" ? false : true,
    cursoropacitymax: 0.5,
    cursorwidth: "5px"
  });
  ////////////////////////////////
  var video = document.getElementById('mainVideo');
  var play = $('#play');
  if(video){
    play.click(function () {
      video.play();
      $('#overlay').fadeOut();
    })
    video.addEventListener('pause', function () {
      $('#overlay').fadeIn();
    })
    video.addEventListener('play', function () {
      $('#overlay').fadeOut();
    })
  }
});
var el = document.getElementById("graph"), // get canvas
  questionContainer = document.getElementById("question-form"); // get canvas
if (el) {
  var options = {
    percent: el.getAttribute("data-percent") || 0,
    size: el.getAttribute("data-size") || 300,
    lineWidth: el.getAttribute("data-line") || 5,
    rotate: el.getAttribute("data-rotate") || 0,
    color: el.getAttribute("data-color") || '#0e8efd'
  };
  if (questionContainer) {
    var questionCount = parseInt(questionContainer.getAttribute("data-value")),
      currentNumber = parseInt(questionContainer.getAttribute("data-view")),
      nextValuePercent = Math.round((100 / questionCount)),
      currentValuePercent = nextValuePercent * currentNumber;
    if (currentNumber > 0) {
      options.percent = currentValuePercent;
    } else {
      options.percent = parseInt(options.percent);
    }
  }
  $("#next").click(function (e) {
    e.preventDefault();
    updateGraph();
  });
  var canvas = document.createElement("canvas");
  var span = document.createElement("span");
  span.textContent = options.percent;

  var ctx = canvas.getContext("2d");
  canvas.width = canvas.height = options.size;

  el.appendChild(span);
  el.appendChild(canvas);

  ctx.translate(options.size / 2, options.size / 2); // change center
  ctx.rotate((-1 / 2 + options.rotate / 180) * Math.PI); // rotate -90 deg

  //imd = ctx.getImageData(0, 0, 240, 240);
  var radius = (options.size - options.lineWidth) / 4;

  var drawCircle = function (color, lineWidth, percent) {
    percent = Math.min(Math.max(0, percent), 1);
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, Math.PI * 2 * percent, false);
    ctx.strokeStyle = color;
    ctx.lineCap = "round"; // butt, round or square
    ctx.lineWidth = lineWidth;
    ctx.stroke();
  };

  drawCircle("#eee", options.lineWidth, 100 / 100);
  drawCircle(options.color, options.lineWidth, options.percent / 100);
}
var updateGraph = function () {
  $("#question-form")
    .fadeOut()
    .fadeIn();
  options.percent = nextValuePercent + parseInt(options.percent);
  if (options.percent <= 100) {
    span.textContent = options.percent;
    drawCircle("#eee", options.lineWidth, 100 / 100);
    drawCircle(options.color, options.lineWidth, options.percent / 100);
  }
}