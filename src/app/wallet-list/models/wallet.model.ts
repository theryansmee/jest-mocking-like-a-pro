import { CurrencyEnum } from './currency.enum';

export interface AmountModel {
	actualBalance: number;
	availableBalance: number;
}

export interface WalletModel {
	id: string;
	alias?: string;
	currency: CurrencyEnum;
	baseCurrency: CurrencyEnum;
	balance: AmountModel;
	balanceInBaseCurrency: AmountModel;
	isDisabled: boolean;
}
