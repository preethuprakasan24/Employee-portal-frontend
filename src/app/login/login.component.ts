import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email:string=""
  password:string=""

  constructor(private api:ApiService, private router:Router){}

 
  login(){
    if(!this.email || !this.password){
      Swal.fire({
        title: "Oops",
        text: "Please fill the form completely",
        icon: "info"
      });
    }else{
      this.api.loginApi().subscribe({
        next:(res:any)=>{
          console.log(res);
          const{email, password} = res
          if(email == this.email && password== this.password){
            // alert('login successful')
            Swal.fire({
              title: "Wow",
              text: "login successful",
              icon: "success"
            });
            this.api.changeBehave(true)
            this.router.navigateByUrl('/dashboard')
          }else{
            // alert('Invalid password or username')
            Swal.fire({
              title: "Oops",
              text: "Invalid password or username",
              icon: "error"
            });
          }
        },
        error:(err:any)=>{
          console.log(err);
          Swal.fire({
            title: "Oops",
            text: "Something went wrong",
            icon: "question"
          });
        }
      })
    }
    
  }
}
