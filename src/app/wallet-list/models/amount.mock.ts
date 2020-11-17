import { AmountModel } from './amount.model';


export class AmountMock {


	private _data: AmountModel = {
		actualBalance: 0.00,
		availableBalance: 0.00
	};


	public withActualBalance ( actualBalance: AmountModel[ 'actualBalance' ] ): AmountMock {
		this._data.actualBalance = actualBalance;

		return this;
	}

	public withAvailableBalance ( availableBalance: AmountModel[ 'availableBalance' ] ): AmountMock {
		this._data.availableBalance = availableBalance;

		return this;
	}


	public model (): AmountModel {
		return this._data;
	}

}
