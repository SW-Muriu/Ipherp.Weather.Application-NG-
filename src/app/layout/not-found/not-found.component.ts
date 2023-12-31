import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  //selection of the cities 
  city: any; 

  constructor(
    route: ActivatedRoute) {
      route.queryParams.subscribe((params)=>{
        this.city = params['city'];
      });
    }

    

}
