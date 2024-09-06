import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeModel } from 'employee.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit{

  Employee:EmployeeModel={}

  constructor(private api:ApiService, private Aroute:ActivatedRoute, private router:Router){}

  ngOnInit(): void {
    this.Aroute.params.subscribe((res:any)=>{
      console.log(res);
      const{id} = res
      this.getEmployee(id)
    })
  }
  getEmployee(id:any){
    this.api.getAEmployeeApi(id).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.Employee = res
      },
      error:(err:any)=>{
        console.log(err);
        
      }
    })
  }

  cancel(id:any){
    this.getEmployee(id)
  }

  edit(id:any){
    this.api.updateEmployeeApi(id, this.Employee).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire({
          title: "Wow",
          text: "Updated successful",
          icon: "success"
        });
        this.router.navigateByUrl('/employee')
        
      }, error:(err:any)=>{
        console.log(err);
        Swal.fire({
          title: "Oops",
          text: "Something went wrong",
          icon: "error"
        });
        
      }
    })
  }
}
