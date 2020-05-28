import { Component, OnInit } from '@angular/core';
import { VendingFacadeService } from '../services/vending-facade.service';
import { Product, Identifiable } from 'src/models';
import { Observable } from 'rxjs';
import { DenominationsService } from '../services/denominations.service';

@Component({
    selector: 'app-command-panel',
    templateUrl: './command-panel.component.html',
    styleUrls: ['./command-panel.component.scss'],
})
export class CommandPanelComponent implements OnInit {
    public products$: Observable<Array<Product & Identifiable>>;
    public denominations$: Observable<Array<number>>;

    constructor(
        private vendingService: VendingFacadeService,
        private denominationsService: DenominationsService
    ) {
        this.products$ = this.vendingService.identifiableProducts$;
        this.denominations$ = this.denominationsService.denominations$;
    }

    ngOnInit(): void {}

    onProductSelected(id: string) {
        this.vendingService.productSelected(Number(id));
    }

    onCoinInserted(value: number) {
        this.vendingService.coinInserted(value);
    }
}
