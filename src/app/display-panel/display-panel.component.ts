import { Component, OnInit } from '@angular/core';
import { VendingFacadeService } from '../services/vending-facade.service';
import { Observable } from 'rxjs';
import { Product, Coin } from 'src/models';

@Component({
    selector: 'app-display-panel',
    templateUrl: './display-panel.component.html',
    styleUrls: ['./display-panel.component.scss'],
})
export class DisplayPanelComponent implements OnInit {
    public credit$: Observable<number>;
    public messages$: Observable<string[]>;
    public moneyBox$: Observable<Coin[]>;
    public productBox$: Observable<Product[]>;

    constructor(private vendingService: VendingFacadeService) {
        this.credit$ = this.vendingService.credit$;
        this.messages$ = this.vendingService.messages$;
        this.moneyBox$ = this.vendingService.moneyBox$;
        this.productBox$ = this.vendingService.productBox$;
    }

    ngOnInit(): void {}

    onProductsTaken() {
        this.vendingService.productsTaken();
    }

    onChangeTaken() {
        this.vendingService.changeTaken();
    }
}
