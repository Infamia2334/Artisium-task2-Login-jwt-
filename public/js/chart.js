// First Line Chart

new Chart("myChart", {
    type: 'line',
    data: {
        labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
        datasets: [{
            label: 'Series 1',
            data: [10, 20, 30, 40, 60, 70, 88, 90,100], // Specify the data values array
            fill: false,
            borderColor: '#2196f3', // Add custom color border (Line)
            backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
         // Specify bar border width
        },
                  {
            label: 'Series 2', // Name the series
            data: [30,40,50,60,70,80,100,120,90], // Specify the data values array
            fill: false,
            borderColor: '#4CAF50', // Add custom color border (Line)
            backgroundColor: '#4CAF50', // Add custom color background (Points and Fill)
         // Specify bar border width
        },
        {
            label: 'Series 3', // Name the series
            data: [100, 80, 60, 80, 50, 80, 20, 30, 150], // Specify the data values array
            fill: false,
            borderColor: 'red', // Add custom color border (Line)
            backgroundColor: 'red', // Add custom color background (Points and Fill)
         // Specify bar border width
        },
    ]
    },
    options: {
        legend: {
            display: false
        },
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
    }
});

var colors = ['#007bff','#28a745','#333333','#c3e6cb','#dc3545','#6c757d'];

var donutOptions = {
  cutoutPercentage: 85,
  elements: {
      center: {
      text: '99%',
      color: 'black', // Default is #000000
      fontStyle: 'Arial', // Default is Arial
      sidePadding: 40, // Default is 20 (as a percentage)
      minFontSize: 10, // Default is 20 (in px), set to false and text will not wrap.
      lineHeight: 25 // Default is 25 (in px), used for when text wraps
      }
  },
  tooltips: {
  displayColors: true,
  callbacks:{
      mode: 'x',
  },
  },
  scales: {
      xAxes: [{
          stacked: true,
          ticks: {
              display:false,
          },
          gridLines: {
          display: false,
          }
      }],
      yAxes: [{
          stacked: true,
              ticks: {
                  display:false,
              },        
          type: 'linear',
          gridLines: {
          display: false,
          }
      }]
  },
      responsive: true,
      maintainAspectRatio: false,
      legend: { display: false},
};

// donut 1
var chDonutData1 = {
    datasets: [
      {
        label: 'My First Dataset',
        borderWidth: 0,
        data: [300, 50, 100],
        backgroundColor: [
          '#007bff',
          '#28a745',
          '#c3e6cb'
        ],
        hoverOffset: 4
      }
    ]
  };
  var chDonut1 = document.getElementById("chDonut1");
  if (chDonut1) {
  new Chart(chDonut1, {
      type: 'doughnut',
      data: chDonutData1,
      options: donutOptions
  });
  }
  
  // donut 2
  var chDonutData2 = {
    datasets: [
      {
        label: 'My First Dataset',
        borderWidth: 0,
        data: [300, 50, 100],
        backgroundColor: [
          '#007bff',
          '#28a745',
          '#c3e6cb'
        ],
        hoverOffset: 4
      }
    ]
  };
  var chDonut2 = document.getElementById("chDonut2");
  if (chDonut2) {
  new Chart(chDonut2, {
      type: 'doughnut',
      data: chDonutData2,
      options: donutOptions
  });
  }
  
  // donut 3
  var chDonutData3 = {
    datasets: [
      {
        label: 'My First Dataset',
        borderWidth: 0,
        data: [300, 50, 100],
        backgroundColor: [
          '#007bff',
          '#28a745',
          '#c3e6cb'
        ],
        hoverOffset: 4
      }
    ]
  };
  var chDonut3 = document.getElementById("chDonut3");
  if (chDonut3) {
  new Chart(chDonut3, {
      type: 'doughnut',
      data: chDonutData3,
      options: donutOptions
  });
  }
  
  // donut 4
  var chDonutData4 = {
    datasets: [
      {
        label: 'My First Dataset',
        borderWidth: 0,
        data: [300, 50, 100],
        backgroundColor: [
          '#007bff',
          '#28a745',
          '#c3e6cb'
        ],
        hoverOffset: 4
      }
    ]
  };
  var chDonut4 = document.getElementById("chDonut4");
  if (chDonut4) {
  new Chart(chDonut4, {
      type: 'doughnut',
      data: chDonutData4,
      options: donutOptions
  });
  }
  


  // Code to put text in middle of chart
Chart.pluginService.register({
    beforeDraw: function(chart) {
      if (chart.config.options.elements.center) {
        // Get ctx from string
        var ctx = chart.chart.ctx;
  
        // Get options from the center object in options
        var centerConfig = chart.config.options.elements.center;
        var fontStyle = centerConfig.fontStyle || 'Arial';
        var txt = centerConfig.text;
        var color = centerConfig.color || '#000';
        var maxFontSize = centerConfig.maxFontSize || 75;
        var sidePadding = centerConfig.sidePadding || 20;
        var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
        // Start with a base font of 30px
        ctx.font = "30px " + fontStyle;
  
        // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
        var stringWidth = ctx.measureText(txt).width;
        var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;
  
        // Find out how much the font can grow in width.
        var widthRatio = elementWidth / stringWidth;
        var newFontSize = Math.floor(30 * widthRatio);
        var elementHeight = (chart.innerRadius * 2);
  
        // Pick a new font size so it will not be larger than the height of label.
        var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
        var minFontSize = centerConfig.minFontSize;
        var lineHeight = centerConfig.lineHeight || 25;
        var wrapText = false;
  
        if (minFontSize === undefined) {
          minFontSize = 20;
        }
  
        if (minFontSize && fontSizeToUse < minFontSize) {
          fontSizeToUse = minFontSize;
          wrapText = true;
        }
  
        // Set font settings to draw it correctly.
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
        var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
        ctx.font = fontSizeToUse + "px " + fontStyle;
        ctx.fillStyle = color;
  
        if (!wrapText) {
          ctx.fillText(txt, centerX, centerY);
          return;
        }
  
        var words = txt.split(' ');
        var line = '';
        var lines = [];
  
        // Break words up into multiple lines if necessary
        for (var n = 0; n < words.length; n++) {
          var testLine = line + words[n] + ' ';
          var metrics = ctx.measureText(testLine);
          var testWidth = metrics.width;
          if (testWidth > elementWidth && n > 0) {
            lines.push(line);
            line = words[n] + ' ';
          } else {
            line = testLine;
          }
        }
  
        // Move the center up depending on line height and number of lines
        centerY -= (lines.length / 2) * lineHeight;
  
        for (var n = 0; n < lines.length; n++) {
          ctx.fillText(lines[n], centerX, centerY);
          centerY += lineHeight;
        }
        //Draw text in center
        ctx.fillText(line, centerX, centerY);
      }
    }
  });
  