import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

  constructor(private _matSnackbar: MatSnackBar) { }


  public openSuccessSnackbar(message="Success !") {
    this._matSnackbar.open(message, '', {
      duration: 3000,
      panelClass: ['snackbar-success']
    })

  }

  public openErrorSnackbar(message="Error !") {
    this._matSnackbar.open(message, '', {
      duration: 3000,
      panelClass: ['snackbar-error']
    })
  }
}
