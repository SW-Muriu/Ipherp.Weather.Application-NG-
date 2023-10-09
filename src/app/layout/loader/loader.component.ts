import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoaderService } from './loader.service';
import { LoaderState } from './loader';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent {

  show: boolean = false;

  subscription: Subscription = new Subscription;

  constructor(
    private loaderService: LoaderService
  ){  }

  ngOnInit(){
    this.subscription = this.loaderService.loaderState.subscribe((state: LoaderState)=>{
      this.show = state.show
    })
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

}
