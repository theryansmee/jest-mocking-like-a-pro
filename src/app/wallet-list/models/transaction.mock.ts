import { TransactionModel } from './transaction.model';
import { TestingUtilities } from '../../shared/testing.utilities';
import { AmountMock } from './amount.mock';


export class TransactionMock {


	private _data: TransactionModel = {
		id: TestingUtilities.generateId(),
		type: 'credit',
		amount:
			new AmountMock()
				.model()
	};


	public withId ( id: TransactionModel[ 'id' ] ): TransactionMock {
		this._data.id = id;

		return this;
	}

	public withType ( type: TransactionModel[ 'type' ] ): TransactionMock {
		this._data.type = type;

		return this;
	}

	public withAmount ( amount: TransactionModel[ 'amount' ] ): TransactionMock {
		this._data.amount = amount;

		return this;
	}


	public model (): TransactionModel {
		return this._data;
	}


}
