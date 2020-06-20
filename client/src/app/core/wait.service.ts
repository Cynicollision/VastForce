import { Injectable } from '@angular/core';
import { DialogService } from './dialog.service';
import { WaitSpinnerComponent } from './wait-spinner/wait-spinner.component';

@Injectable({
  providedIn: 'root'
})
export class WaitService {
  
  // threshold in milliseconds to wait before showing the "wait" spinner
  private readonly WaitThreshold = 500;

  constructor(private dialogService: DialogService) {
  }

  wait<T>(waitingOn: Promise<T>): Promise<T> {
    
    return new Promise((resolve, reject) => {
      let waitingOnComplete = false;
      let wrappingPromise = Promise.resolve<any>(null);
      let spinnerShown = false;
      
      setTimeout(() => {
        if (!waitingOnComplete) {
          wrappingPromise = this.dialogService.popDialog(WaitSpinnerComponent, { preventClose: true });
          spinnerShown = true;
        }
      }, this.WaitThreshold);

      return waitingOn.then(result => {
        waitingOnComplete = true;
        if (spinnerShown) {
          this.dialogService.closeCurrentDialog(WaitSpinnerComponent);
        }
        return wrappingPromise.then(() => resolve(result));
      });
    });
  }
}
