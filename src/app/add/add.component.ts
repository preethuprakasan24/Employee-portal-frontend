import { Component } from '@angular/core';
import { EmployeeModel } from 'employee.model';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {
  empDetails: EmployeeModel={}

  constructor(private api:ApiService , private router:Router){}

  cancel(){
    this.empDetails={}
  }
  add(){
    console.log(this.empDetails);
    this.api.addEmpApi(this.empDetails).subscribe({
      next:(res:any)=>{
        console.log(res);
        Swal.fire({
          title: "Wow",
          text: "Employee added successful",
          icon: "success"
        });
        this.empDetails={}
        this.router.navigateByUrl('/employee')
      },
      error:(err:any)=>{
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
