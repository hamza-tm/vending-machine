import { Component, OnInit } from '@angular/core';
import { VendingFacadeService } from '../services/vending-facade.service';
import { Product, Identifiable } from 'src/models';
import { Observable } from 'rxjs';
import { DenominationsService } from '../services/denominations.service';
import { reloadableProducts } from 'src/assets/reloadable-products';
import { reloadableCoins } from 'src/assets/reloadable-coins';

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

    onProductsTaken() {
        this.vendingService.productsTaken();
    }

    onChangeTaken() {
        this.vendingService.changeTaken();
    }

    reloadProducts() {
        this.vendingService.reloadProducts(reloadableProducts);
    }

    reloadCoins() {
        this.vendingService.reloadCoins(reloadableCoins);
    }
}
