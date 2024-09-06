import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { EmployeeModel } from 'employee.model';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  allEmployee:EmployeeModel[]=[]
constructor(private api:ApiService){}

ngOnInit(): void {
  this.getAllEmployee()
}

searchKey:any=""
p: number = 1;

getAllEmployee(){
  this.api.getAllEmployeeApi().subscribe({
    next:(res:any)=>{
      this.allEmployee=res
      console.log(this.allEmployee);  
    }, 
    error:(err:any)=>{
      console.log(err);  
    }
  })
}

deleteEmployee(id:any){
  this.api.removeEmployeeApi(id).subscribe({
    next:(res:any)=>{
      console.log(res);
      this.getAllEmployee()
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

sortId(){
  this.allEmployee.sort((a:any,b:any)=>a.id-b.id)
}
sortName(){
  this.allEmployee.sort((a:any,b:any)=>a.name.localeCompare(b.name))
}

generatePdf(){
  //1) create object for jsPDF() class
  const pdf = new jsPDF()

  let head = [['UserID', 'Username', 'Email', 'Status']]

  let body:any=[]

  this.allEmployee.forEach((item)=>{
   if(item.id!=1){
    if(item.status=='1'){
      body.push([item.id, item.name, item.email,'Active'])
    }else{
      body.push([item.id, item.name,item.email,'Inactive'])
    }
    
   }
  })

  //FONTSIZE
  pdf.setFontSize(16)
  //heading
  pdf.text('Employee List', 10,10)

  //opwn in new window
 
  //2)call autotable method
  autoTable(pdf,{head, body})

  pdf.output('dataurlnewwindow')

  //3)save
  pdf.save('employee_table.pdf')
}

time:any = new Date()
}
