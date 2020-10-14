import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WalletListService } from './service/wallet-list.service';
import { WalletsResponseModel } from './models/wallets-response.model';
import { HttpErrorResponse } from '@angular/common/http';
import { WalletModel } from './models/wallet.model';


@Component({
	selector: 'app-wallet-list',
	templateUrl: './wallet-list.component.html',
	styleUrls: ['./wallet-list.component.scss']
})
export class WalletListComponent implements OnInit, OnChanges {


	public totalActualBalance: number;

	public wallets: WalletModel[];

	public negativeWallets: WalletModel[];

	public lastUpdated: Date;


	constructor ( private walletListService: WalletListService ) { }


	ngOnInit (): void {
		this.getWallets();
	}

	ngOnChanges( changes: SimpleChanges ): void {
		if ( changes.wallets.currentValue !== changes.wallets.previousValue ) {
			const wallets: WalletModel[] =
				changes.wallets.currentValue;

			this.negativeWallets =
				this.separateNegativeBalanceWallets ( wallets );
		}
	}


	public getWallets (): void {
		this.walletListService
			.getWallets()
			.subscribe(
				( walletsResponse: WalletsResponseModel ) => this.handleGetWalletsSuccess( walletsResponse ),
				( error: HttpErrorResponse ) => this.handleGetWalletsError( error )
			);
	}

	public handleGetWalletsSuccess ( walletsResponse: WalletsResponseModel ): void {
		const {
			wallets,
			lastUpdated
		} = walletsResponse.data;

		this.totalActualBalance =
			this.calculateTotalBalance( wallets );
		this.wallets =
			this.orderWallets( wallets );

		this.lastUpdated = lastUpdated;
	}

	public handleGetWalletsError ( error: HttpErrorResponse ): void {
		// ...Do some error stuff here
		console.log( { error } );
	}

	public orderWallets ( wallets: WalletModel[] ): WalletModel[] {
		return wallets
			.sort(
				(
					walletA: WalletModel,
					walletB: WalletModel
				) => this.walletSorter(
					walletA,
					walletB
				)
			);
	}

	public calculateTotalBalance ( wallets: WalletModel[] ): number {
		return wallets
			.reduce(
				(
					startValue: number,
					wallet: WalletModel
				) => wallet.balance.actualBalance + startValue, 0
			);
	}

	public separateNegativeBalanceWallets ( wallets: WalletModel[] ): WalletModel[] {
		return wallets
			.filter(
				( wallet: WalletModel ) => wallet.balanceInBaseCurrency.actualBalance < 0
			);
	}

	public walletSorter (
		walletA: WalletModel,
		walletB: WalletModel
	): number {
		if ( walletA.alias > walletB.alias ) {
			return 1;
		}
		else if ( walletA.alias < walletB.alias ) {
			return -1;
		}

		return 0;
	}

}
