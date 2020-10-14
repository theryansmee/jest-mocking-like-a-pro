import { WalletListComponent } from './wallet-list.component';


describe('WalletListComponent', () => {
	let fixture: WalletListComponent;

	let walletListServiceMock;

	beforeEach( () => {
		walletListServiceMock = {
			getWallets: jest.fn()
		};

		fixture = new WalletListComponent(
			walletListServiceMock
		);
	});

	describe( 'getWallets', () => {
		describe( 'Success', () => {
			// it( 'should call handleGetWalletsSuccess with walletsResponse', () => {
			//
			// });
		});
	});

	describe( 'handleGetWalletsSuccess', () => {
		describe( 'set totalActualBalance', () => {
			// it( 'should call calculateTotalBalance with walletsResponse.wallets', () => {
			//
			// });
			//
			// it( 'should set totalActualBalance to response from calculateTotalBalance', () => {
			//
			// });
		});

		describe( 'set wallets', () => {
			// it( 'should call orderWallets with walletsResponse.wallets', () => {
			//
			// });
			//
			// it( 'should set wallets to response from orderWallets', () => {
			//
			// });
		});

		describe( 'set lastUpdated', () => {
			// it( 'should set lastUpdated with walletResponse.lastUpdated', () => {
			//
			// });
		});
	});

	describe( 'separateNegativeBalanceWallets', () => {
		// it( 'should return blank array if NO negative wallets are passed', () => {
		//
		// });
		//
		// it( 'should return array with only passed negative wallets', () => {
		//
		// });
	});
});
