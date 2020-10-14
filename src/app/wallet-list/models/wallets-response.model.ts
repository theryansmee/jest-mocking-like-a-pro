import { WalletModel } from './wallet.model';


export interface WalletsResponseModel {
	data: {
		wallets: WalletModel[];
		lastUpdated: Date;
	};
}
