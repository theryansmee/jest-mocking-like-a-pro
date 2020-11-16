import { WalletListComponent } from './wallet-list.component';
import { of } from 'rxjs';
import { WalletModel } from './models/wallet.model';
import { WalletsResponseModel } from './models/wallets-response.model';


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
			let wallet1: WalletModel;
			let wallet2: WalletModel;
			let wallet3: WalletModel;
			let walletResponse: WalletsResponseModel;

			beforeEach( () => {
				wallet1 = {
					id: 'wallet1',
					alias: 'My wallet B'
				} as WalletModel;
				wallet2 = {
					id: 'wallet2',
					alias: 'My wallet A'
				} as WalletModel;
				wallet3 = {
					id: 'wallet3',
					alias: 'My wallet C'
				} as WalletModel;
				walletResponse = {
					data: {
						wallets: [
							wallet1,
							wallet2,
							wallet3
						],
						lastUpdated: new Date()
					}
				};

				walletListServiceMock
					.getWallets
					.mockReturnValue(
						of( walletResponse )
					);
			});

			it( 'should call handleGetWalletsSuccess with walletsResponse', () => {
				const filteredWallets: WalletModel[] = [
					wallet1,
					wallet3
				];
				jest.spyOn( fixture, 'separateNegativeBalanceWallets' )
					.mockReturnValue( filteredWallets );
				fixture.negativeWallets = undefined;

				fixture.getWallets();

				expect( fixture.negativeWallets ).toEqual( filteredWallets );
			});

			it( 'should call separateNegativeBalanceWallets with piped value', () => {
				const handleGetWalletsSuccessSpy =
					jest.spyOn( fixture, 'handleGetWalletsSuccess' )
						.mockImplementation( () => {} );
				fixture.getWallets();

				expect( handleGetWalletsSuccessSpy ).toBeCalledWith( walletResponse );
			});
		});
	});

	describe( 'handleGetWalletsSuccess', () => {
		let wallet1: WalletModel;
		let wallet2: WalletModel;
		let wallet3: WalletModel;
		let walletResponse: WalletsResponseModel;

		beforeEach( () => {
			wallet1 = {
				id: 'wallet1',
			} as WalletModel;
			wallet2 = {
				id: 'wallet2',
			} as WalletModel;
			wallet3 = {
				id: 'wallet3',
			} as WalletModel;
			walletResponse = {
				data: {
					wallets: [
						wallet1,
						wallet2,
						wallet3
					],
					lastUpdated: new Date()
				}
			};
		});

		describe( 'set totalActualBalance', () => {
			it( 'should call calculateTotalBalance with walletsResponse.wallets', () => {
				const calculateTotalBalanceSpy =
					jest.spyOn( fixture, 'calculateTotalBalance' )
						.mockImplementation( () => 0.99 );

				fixture.handleGetWalletsSuccess( walletResponse );

				expect( calculateTotalBalanceSpy ).toBeCalledWith( walletResponse.data.wallets );
			});

			it( 'should set totalActualBalance to response from calculateTotalBalance', () => {
				jest.spyOn( fixture, 'calculateTotalBalance' )
					.mockImplementation(
						() => 0.99
					);
				fixture.totalActualBalance = undefined;

				fixture.handleGetWalletsSuccess( walletResponse );

				expect( fixture.totalActualBalance ).toEqual( 0.99 );
			});
		});

		describe( 'set wallets', () => {
			let orderedWallets: WalletModel[];

			beforeEach( () => {
				orderedWallets = [
					wallet2,
					wallet1,
					wallet3
				];
			});

			it( 'should call orderWallets with walletsResponse.wallets', () => {
				const orderWalletsSpy =
					jest.spyOn( fixture, 'orderWallets' )
						.mockImplementation(
							() => orderedWallets
						);

				fixture.handleGetWalletsSuccess( walletResponse );

				expect( orderWalletsSpy ).toBeCalledWith( walletResponse.data.wallets );
			});

			it( 'should set wallets to response from orderWallets', () => {
				jest.spyOn( fixture, 'orderWallets' )
					.mockImplementation(
						() => orderedWallets
					);
				fixture.wallets = undefined;

				fixture.handleGetWalletsSuccess( walletResponse );

				expect( fixture.wallets ).toEqual( orderedWallets );
			});
		});

		describe( 'set lastUpdated', () => {
			it( 'should set lastUpdated with walletResponse.lastUpdated', () => {
				fixture.lastUpdated = undefined;

				fixture.handleGetWalletsSuccess( walletResponse );

				expect( fixture.lastUpdated ).toEqual( walletResponse.data.lastUpdated );
			});
		});
	});

	describe( 'separateNegativeBalanceWallets', () => {
		let positiveWallet1: WalletModel;
		let positiveWallet2: WalletModel;
		let negativeWallet1: WalletModel;
		let negativeWallet2: WalletModel;
		let zeroWallet1: WalletModel;

		beforeEach( () => {
			positiveWallet1 = {
				id: 'wallet1',
				balanceInBaseCurrency: {
					actualBalance: 1007.88
				}
			} as WalletModel;
			positiveWallet2 = {
				id: 'wallet2',
				balanceInBaseCurrency: {
					actualBalance: 0.001
				}
			} as WalletModel;
			negativeWallet1 = {
				id: 'wallet3',
				balanceInBaseCurrency: {
					actualBalance: -0.01
				}
			} as WalletModel;
			negativeWallet2 = {
				id: 'wallet4',
				balanceInBaseCurrency: {
					actualBalance: -20202020.00
				}
			} as WalletModel;
			zeroWallet1 = {
				id: 'wallet5',
				balanceInBaseCurrency: {
					actualBalance: 0
				}
			} as WalletModel;
		});

		it( 'should return blank array if NO negative wallets are passed', () => {
			const wallets: WalletModel[] = [
				positiveWallet1,
				positiveWallet2,
				zeroWallet1
			];
			const expectedResult: WalletModel[] = [];

			const result: WalletModel[] =
				fixture.separateNegativeBalanceWallets( wallets );

			expect( result ).toEqual( expectedResult );
		});

		it( 'should return array with only passed negative wallets', () => {
			const wallets: WalletModel[] = [
				negativeWallet1,
				negativeWallet2,
				zeroWallet1
			];
			const expectedResult: WalletModel[] = [
				negativeWallet1,
				negativeWallet2
			];

			const result: WalletModel[] =
				fixture.separateNegativeBalanceWallets( wallets );

			expect( result ).toEqual( expectedResult );
		});
	});
});
