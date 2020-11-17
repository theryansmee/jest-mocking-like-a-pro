import { WalletModel } from './wallet.model';
import { TestingUtilities } from '../../shared/testing.utilities';
import { CurrencyEnum } from './currency.enum';
import { AmountMock } from './amount.mock';
import { PermissionsMock } from './permissions.mock';

export class WalletMock {

	private _data: WalletModel = {
		id: TestingUtilities.generateId(),
		alias: 'My wallet',
		currency: CurrencyEnum.usd,
		baseCurrency: CurrencyEnum.jpy,
		balance:
			new AmountMock()
				.model(),
		balanceInBaseCurrency:
			new AmountMock()
				.model(),
		isDisabled: false,
		permissions:
			new PermissionsMock()
				.model()
	};


	public withId ( id: WalletModel[ 'id' ] ): WalletMock {
		this._data.id = id;

		return this;
	}

	public withAlias ( alias: WalletModel[ 'alias' ] ): WalletMock {
		this._data.alias = alias;

		return this;
	}

	public withCurrency ( currency: WalletModel[ 'currency' ] ): WalletMock {
		this._data.currency = currency;

		return this;
	}

	public withBaseCurrency ( baseCurrency: WalletModel[ 'baseCurrency' ] ): WalletMock {
		this._data.baseCurrency = baseCurrency;

		return this;
	}
	public withBalance ( balance: WalletModel[ 'balance' ] ): WalletMock {
		this._data.balance = balance;

		return this;
	}

	public withBalanceInBaseCurrency ( balanceInBaseCurrency: WalletModel[ 'balanceInBaseCurrency' ] ): WalletMock {
		this._data.balanceInBaseCurrency = balanceInBaseCurrency;

		return this;
	}

	public withIsDisabled ( isDisabled: WalletModel[ 'isDisabled' ] ): WalletMock {
		this._data.isDisabled = isDisabled;

		return this;
	}

	public withLatestTransactions ( latestTransactions: WalletModel[ 'latestTransactions' ] ): WalletMock {
		this._data.latestTransactions = latestTransactions;

		return this;
	}

	public withPermissions ( permissions: WalletModel[ 'permissions' ] ): WalletMock {
		this._data.permissions = permissions;

		return this;
	}


	public model (): WalletModel {
		return this._data;
	}

}
