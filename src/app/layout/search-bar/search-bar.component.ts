import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  searchText = 'string';

  constructor(
    private router: Router
  ){ }

  onClickCleanBtn(){
    this.searchText = '';
  }

  //Searches for the selected sent sent over as a querry param 
  onKeyPress(e: any){
    if (e.keyCode === 13 && e.target.value) {
      const city = e.target.value;

      this.router.navigate(['/${city}']);
      //      console.log('Search for ', city);
      this.searchText = '';
    }
  }
}
