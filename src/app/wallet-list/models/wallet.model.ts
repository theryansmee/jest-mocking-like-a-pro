import { CurrencyEnum } from './currency.enum';
import { AmountModel } from './amount.model';
import { TransactionModel } from './transaction.model';


export interface WalletModel {
	id: string;
	alias?: string;
	currency: CurrencyEnum;
	baseCurrency: CurrencyEnum;
	balance: AmountModel;
	balanceInBaseCurrency: AmountModel;
	isDisabled: boolean;
	latestTransactions?: TransactionModel[];
}
