import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WalletsResponseModel } from '../models/wallets-response.model';


@Injectable({
	providedIn: 'root'
})
export class WalletListService {


	constructor ( private http: HttpClient ) { }


	public getWallets (): Observable<WalletsResponseModel> {
		const url: string = 'fakeBankApi.com/api/wallets';

		return this.http.get<WalletsResponseModel>( url );
	}

}
