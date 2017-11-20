/**
 * @file
 */
Vue.component('vue-chartjs-top', {
  props: ['chartTop'],
  template: '<div v-if="chartTop != \'\' " class="bg-0082ba max-height-32 color-fff padding-10">{{chartTop}}</div>'
})

/**
 * @
 */
Vue.component('vue-chartjs-pie', {
  props: ['chartData', 'chartOptions', 'chartTop', 'chartType', 'chartTopClass'],
  methods: {
    drawChart: function(canvas, type, chartData, chartOptions) {
      console.log("2222");
      let chart = new Chart(canvas, {
        type: type,
        data: chartData,
        options: chartOptions,
      })
    }
  },
  watch: {
    chartData: function () {
      this.drawChart(this.$refs.canvas, this.chartType, this.chartData, this.chartOptions);
    },
  },
  template:`
    <div class="vue-chart-block">
      <div class="col-md-12 pppppleft" v-bind:class="chartTopClass">
        <div class="margin-left-20 margin-top-16">
          <div class="border-1-e7e7e7">
            <vue-chartjs-top v-bind:chartTop="chartTop"></vue-chartjs-top>
             <div class="margin-50 max-height-480">
              <canvas ref="canvas"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>`
});

/**
 * @
 */
var app = new Vue({
  el: "#page-wrapper",
  data: {
    blockData: "",
    chartData: [],
    chartOptions: [],
    pieChartType: "pie",
    doughnutChartType: "doughnut",
    lineChartType: "line",
    barChartType: "bar",
    chartTop: [],
    chartTopClass: [],
    topClass: "",
    chart: [
      {
        chartData: {},
        chartOptions: {},
        chartTop: {},
        chartTopClass: {},
      },
      {
        chartData: {},
        chartOptions: {},
        chartTop: {},
        chartTopClass: {},
      },
    ]

  },
  created: function () {
    var self = this;
    var countChart = 0;
    axios.get('jsonData.json').then((response) => {
      countChart = response.data.contentSection.length;

      console.log(self.chart);


      // for(var i = 0; i < countChart; i++) {
        self.chart[0].chartData = response.data.contentSection[0].middle.middleMiddle.middleMiddleMiddle.chartData;
        self.chart[0].chartOptions = response.data.contentSection[0].middle.middleMiddle.middleMiddleMiddle.chartOptions;
        self.chart[0].chartTop = response.data.contentSection[0].top.value;
        self.chart[0].chartTopClass = response.data.contentSection[0].top.class;


        self.chart[1].chartData = response.data.contentSection[1].middle.middleMiddle.middleMiddleMiddle.chartData;
        self.chart[1].chartOptions = response.data.contentSection[1].middle.middleMiddle.middleMiddleMiddle.chartOptions;
        self.chart[1].chartTop = response.data.contentSection[1].top.value;
        self.chart[1].chartTopClass = response.data.contentSection[1].top.class;

        // self.chartData[i] = response.data.contentSection[i].middle.middleMiddle.middleMiddleMiddle.chartData;
        // self.chartOptions[i] = response.data.contentSection[i].middle.middleMiddle.middleMiddleMiddle.chartOptions;
        // self.chartTop[i] = response.data.contentSection[i].top.value;
        // self.chartTopClass[i] = response.data.contentSection[i].top.class;
      // }

      console.log(self.chart);
      console.log(98);


      self.topClass = self.chart[0].chartTopClass;
      })
      .catch((error) => {
      console.log(error);
    });
  },
  template:`
    <div>
      <vue-chartjs-pie v-bind:chartData=chart[0].chartData v-bind:chartOptions=chart[0].chartOptions v-bind:chartTop=chart[0].chartTop v-bind:chartType="doughnutChartType" v-bind:chartTopClass=chart[0].chartTopClass></vue-chartjs-pie>
      <vue-chartjs-pie v-bind:chartData=chart[0].chartData v-bind:chartOptions=chart[0].chartOptions v-bind:chartTop=chart[0].chartTop v-bind:chartType="pieChartType" v-bind:chartTopClass=chart[0].chartTopClass></vue-chartjs-pie>
      <vue-chartjs-pie v-bind:chartData=chart[1].chartData v-bind:chartOptions=chart[1].chartOptions v-bind:chartTop=chart[1].chartTop v-bind:chartType="barChartType" v-bind:chartTopClass=chart[0].chartTopClass></vue-chartjs-pie>
    </div>`
});
