import { WalletListComponent } from './wallet-list.component';
import { of } from 'rxjs';
import { WalletModel } from './models/wallet.model';
import { WalletsResponseModel } from './models/wallets-response.model';
import { WalletMock } from './models/wallet.mock';
import { AmountMock } from './models/amount.mock';
import { WalletResponseMock } from './models/wallet-response.mock';


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
				wallet1 =
					new WalletMock()
						.withAlias( 'My wallet B' )
						.model();
				wallet2 =
					new WalletMock()
						.withAlias( 'My wallet A' )
						.model();
				wallet3 =
					new WalletMock()
						.withAlias( 'My wallet C' )
						.model();
				walletResponse =
					new WalletResponseMock()
						.withWallets(
							[
								wallet1,
								wallet2,
								wallet3
							]
						)
						.model();

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
			wallet1 =
				new WalletMock()
					.model();
			wallet2 =
				new WalletMock()
					.model();
			wallet3 =
				new WalletMock()
					.model();
			walletResponse =
				new WalletResponseMock()
					.withWallets(
						[
							wallet1,
							wallet2,
							wallet3
						]
					)
					.model();
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
			positiveWallet1 =
				new WalletMock()
					.withBalanceInBaseCurrency(
						new AmountMock()
							.withActualBalance( 1007.88 )
							.model()
					)
					.model();
			positiveWallet2 =
				new WalletMock()
					.withBalanceInBaseCurrency(
						new AmountMock()
							.withActualBalance( 0.001 )
							.model()
					)
					.model();
			negativeWallet1 =
				new WalletMock()
					.withBalanceInBaseCurrency(
						new AmountMock()
							.withActualBalance( -0.01 )
							.model()
					)
					.model();
			negativeWallet2 =
				new WalletMock()
					.withBalanceInBaseCurrency(
						new AmountMock()
							.withActualBalance( -20202020.00 )
							.model()
					)
					.model();
			zeroWallet1 =
				new WalletMock()
					.withBalanceInBaseCurrency(
						new AmountMock()
							.withActualBalance( 0.00 )
							.model()
					)
					.model();
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
