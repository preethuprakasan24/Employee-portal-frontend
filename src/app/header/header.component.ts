import { Component } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isLogged:boolean=false

constructor(private api:ApiService, private router:Router){
  api.log.subscribe((res:any)=>{
    this.isLogged=res
  })
}

logout(){
  this.api.changeBehave(false)
  this.router.navigateByUrl('/')
  
}
}
