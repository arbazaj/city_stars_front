import { Injectable, Output,EventEmitter } from '@angular/core';

@Injectable({
	providedIn: 'root',
})

export class SpinnerService {

    showSpinner = false;

    @Output() change: EventEmitter<boolean> = new EventEmitter();
    constructor() { }
    show() {
        this.showSpinner = true;
        this.change.emit(this.showSpinner);
  	}

  	hide() {
        this.showSpinner = false;
        this.change.emit(this.showSpinner);
  	}

}