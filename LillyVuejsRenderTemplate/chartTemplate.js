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
  props: ['pieChartData', 'pieChartOptions', 'chartTop', 'chartType', 'chartTopClass'],
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
    pieChartData: function () {
      this.drawChart(this.$refs.canvas, this.chartType, this.pieChartData, this.pieChartOptions);
    },
  },
  template:`
    <div class="vue-chart-block">
      <div v-bind:class="chartTopClass">
        <div class="margin-left-20 margin-top-16">
          <div class="border-1-e7e7e7">
            <vue-chartjs-top v-bind:chartTop="chartTop"></vue-chartjs-top>
             <div class="margin-50">
              <canvas ref="canvas" class="max-height-580"></canvas>
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
    pieChartData: "",
    pieChartOptions: "",
    barChartData: "",
    barChartOptions: "",
    pieChartType: "pie",
    doughnutChartType: "doughnut",
    lineChartType: "line",
    barChartType: "bar",
    pieChartTop: "",
    barChartTop: "",
    pieChartTopClass: "",
    barChartTopClass: ""
  },
  created: function () {
     var self = this;
     axios.get('jsonData.json').then((response) => {
       console.log("3333");
       self.pieChartData = response.data.contentSection[0].middle.middleMiddle.middleMiddleMiddle.chartData;
       self.pieChartOptions = response.data.contentSection[0].middle.middleMiddle.middleMiddleMiddle.chartOptions;
       self.pieChartTop = response.data.contentSection[0].top.value;
       self.pieChartTopClass = response.data.contentSection[0].top.class;

       self.barChartTopClass = response.data.contentSection[1].top.class;
       self.barChartTop = response.data.contentSection[1].top.value;
       self.barChartData = response.data.contentSection[1].middle.middleMiddle.middleMiddleMiddle.chartData;
       self.barChartOptions = response.data.contentSection[1].middle.middleMiddle.middleMiddleMiddle.chartOptions;
       console.log(self.pieChartOptions);
       console.log(self.barChartOptions);
     })
     .catch((error) => {
       console.log(error);
     });
  },
  template:`
    <div>
      <vue-chartjs-pie v-bind:pieChartData="pieChartData" v-bind:pieChartOptions="pieChartOptions" v-bind:chartTop="pieChartTop" v-bind:chartType="pieChartType" v-bind:chartTopClass="pieChartTopClass"></vue-chartjs-pie>
      <vue-chartjs-pie v-bind:pieChartData="pieChartData" v-bind:pieChartOptions="pieChartOptions" v-bind:chartTop="pieChartTop" v-bind:chartType="doughnutChartType" v-bind:chartTopClass="pieChartTopClass"></vue-chartjs-pie>
      <vue-chartjs-pie v-bind:pieChartData="barChartData" v-bind:pieChartOptions="barChartOptions" v-bind:chartTop="barChartTop" v-bind:chartType="barChartType" v-bind:chartTopClass="barChartTopClass"></vue-chartjs-pie>
      <vue-chartjs-pie v-bind:pieChartData="barChartData" v-bind:pieChartOptions="barChartOptions" v-bind:chartTop="barChartTop" v-bind:chartType="lineChartType" v-bind:chartTopClass="barChartTopClass"></vue-chartjs-pie>
    </div>`
});
