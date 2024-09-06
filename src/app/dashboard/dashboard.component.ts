import { Component, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  selected: Date | null = new Date()
  Highcharts: typeof Highcharts = Highcharts;
  chartOptions={}
    editStatus:boolean=true
    adminDetails:any={}
    profileImg:string="https://static-00.iconduck.com/assets.00/profile-circle-icon-2048x2048-cqe5466q.png"

  constructor(private api:ApiService){
    this.chartOptions={
        chart: {
            type: 'pie'
        },
        title: {
            text: 'Project Completion'
        },
        tooltip: {
            valueSuffix: '%'
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: [{
                    enabled: true,
                    distance: 20
                }, {
                    enabled: true,
                    distance: -40,
                    format: '{point.percentage:.1f}%',
                    style: {
                        fontSize: '1.2em',
                        textOutline: 'none',
                        opacity: 0.7
                    },
                    filter: {
                        operator: '>',
                        property: 'percentage',
                        value: 10
                    }
                }]
            }
        },
        credits:{
          enabled:false
        },
        series: [
            {
                name: 'Project',
                colorByPoint: true,
                data: [
                    {
                        name: 'Mozilla',
                        y: 55.02
                    },
                    {
                        name: 'Chrome',
                        y: 26.71
                    },
                    {
                        name: 'Microsoft',
                        y: 1.09
                    },
                    {
                        name: 'Safari',
                        y: 15.5
                    },
                    {
                        name: 'Opera',
                        y: 1.68
                    }
                ]
            }
        ]
    }
    HC_exporting(Highcharts);

    api.changeBehave(true)
    }

    ngOnInit():void {
        this.getAdminDetails() 
    }

    getAdminDetails(){
        this.api.loginApi().subscribe({
            next:(res:any)=>{
                this.adminDetails = res
                if(res.image){
                    this.profileImg=res.image
                }
            },
            error:(err:any)=>{
                console.log(err);    
            }
        })
    }

    statusChange(){
        this.getAdminDetails()
        this.editStatus=!this.editStatus
    }

    getFile(event:any){
        console.log(event.target.files[0]);
        let file = event.target.files[0]

        //convert file to url - using class FileReader()
        //create object 
        let fr = new FileReader()

        //convert to url
        fr.readAsDataURL(file)

        //get
        fr.onload=(event:any)=>{
            console.log(event.target.result);
            this.profileImg=event.target.result
            this.adminDetails.image = event.target.result
            
        }
    }

    updateAdmin(){
        this.api.updateAdminApi(this.adminDetails).subscribe({
            next:(res:any)=>{
                console.log(res);
                Swal.fire({
                    title:"Wow",
                    text:"Updated successfully",
                    icon:"success"
                })        
                this.getAdminDetails()
            },
            error:(err:any)=>{
                console.log(err);
                
            }
        })
    }


    
}
