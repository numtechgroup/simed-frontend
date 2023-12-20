import { Component, OnInit } from '@angular/core';
import { chartExample1, chartExample2, chartOptions, parseOptions } from 'src/app/variables/charts';
import Chart from 'chart.js';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-dashboard-doctor',
  templateUrl: './dashboard-doctor.component.html',
  styleUrls: ['./dashboard-doctor.component.scss']
})
export class DashboardDoctorComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;
  fetchedStats: any;
  constructor(private doctorService : DoctorService){

  }

  ngOnInit() {

    this.fetchedStatsPatients();

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];


    var chartOrders = document.getElementById('chart-orders');

    parseOptions(Chart, chartOptions());


    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: chartExample2.data
    });

    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: chartExample1.data
		});
  }


  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.data;
    this.salesChart.update();
  }

  fetchedStatsPatients(){
    this.doctorService.getStatisticsPatients().subscribe({
      next: (response) => {
        if (response !== null) {
          this.fetchedStats = response;
        } else {
          console.log('error :', response)
        }
      },
      error: (errors) => {
        console.log(errors);
      },
  })
  }

}
