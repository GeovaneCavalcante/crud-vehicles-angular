import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  isLoading: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(private spinner: NgxSpinnerService) {}

  state(): boolean {
    return this.isLoading.value;
  }

  show(): void{
    this.spinner.show();
    this.isLoading.next(true);
  }

  hide(): void{
    this.spinner.hide();
    this.isLoading.next(false);
  }
}
