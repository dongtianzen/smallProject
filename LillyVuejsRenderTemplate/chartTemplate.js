/**
 * @file
 */
Vue.component('vue-chartjs-top', {
  template: '<div class="bg-0082ba max-height-32 color-fff padding-10">this is top</div>'
})

/**
 * @
 */
Vue.component('vue-chartjs-pie', {
  props: ['pieChartData', 'pieChartOptions', 'chartType'],
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
    <div>
      <div class="col-sm-12 col-md-6 col-lg-6">
        <div class="margin-left-20 margin-top-16">
          <div class="border-1-e7e7e7">
            <vue-chartjs-top></vue-chartjs-top>
             <div class="margin-50">
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
      pieChartData: "",
      pieChartOptions: "",
      barChartData: "",
      barChartOptions: "",
      pieChartType: "pie",
      doughnutChartType: "doughnut",
      lineChartType: "line",
      barChartType: "bar",
    },
    created: function () {
       var self = this;
       axios.get('jsonData.json').then((response) => {
         console.log("3333");
         self.pieChartData = response.data.contentSection[0].middle.middleMiddle.middleMiddleMiddle.chartData;
         self.pieChartOptions = response.data.contentSection[0].middle.middleMiddle.middleMiddleMiddle.chartOptions;
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
        <vue-chartjs-pie v-bind:pieChartData="pieChartData" v-bind:pieChartOptions="pieChartOptions" v-bind:chartType="pieChartType"></vue-chartjs-pie>
        <vue-chartjs-pie v-bind:pieChartData="pieChartData" v-bind:pieChartOptions="pieChartOptions" v-bind:chartType="doughnutChartType"></vue-chartjs-pie>
        <vue-chartjs-pie v-bind:pieChartData="barChartData" v-bind:pieChartOptions="barChartOptions" v-bind:chartType="barChartType"></vue-chartjs-pie>
        <vue-chartjs-pie v-bind:pieChartData="barChartData" v-bind:pieChartOptions="barChartOptions" v-bind:chartType="lineChartType"></vue-chartjs-pie>
      </div>`
  });
