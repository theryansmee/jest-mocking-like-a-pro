import { WalletsResponseModel } from './wallets-response.model';
import { WalletMock } from './wallet.mock';

export class WalletResponseMock {

	private _data: WalletsResponseModel = {
		data: {
			wallets: [
				new WalletMock()
					.model()
			],
			lastUpdated: new Date()
		}
	};


	public withWallets ( wallets: WalletsResponseModel[ 'data' ][ 'wallets' ] ): WalletResponseMock {
		this._data.data.wallets = wallets;

		return this;
	}
	public withLastUpdated ( lastUpdated: WalletsResponseModel[ 'data' ][ 'lastUpdated' ] ): WalletResponseMock {
		this._data.data.lastUpdated = lastUpdated;

		return this;
	}


	public model (): WalletsResponseModel {
		return this._data;
	}

}
