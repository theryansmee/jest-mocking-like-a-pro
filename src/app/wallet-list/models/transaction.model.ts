import { AmountModel } from './amount.model';


export class TransactionModel {
	id: string;
	type: 'credit' | 'debit';
	amount: AmountModel;
}
