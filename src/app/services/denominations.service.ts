import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { initialDenominations } from 'src/assets/denominations';

@Injectable({
    providedIn: 'root',
})
export class DenominationsService {
    public denominations$: Observable<Array<number>>;

    private denominationSubject: BehaviorSubject<Array<number>>;

    constructor() {
        this.denominationSubject = new BehaviorSubject<Array<number>>(
            initialDenominations
        );
        this.denominations$ = this.denominationSubject.asObservable();
    }
}
