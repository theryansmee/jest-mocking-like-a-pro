import { PermissionsModel } from './permissions.model';


export class PermissionsMock {


	// Set default values
	private _data: PermissionsModel = {
		canEdit: false,
		canDisable: false
	};


	// Updated any values
	public withCanEdit( canEdit: boolean ): PermissionsMock {
		this._data.canEdit = canEdit;

		return this;
	}

	public withCanDisable ( canDisable: boolean ): PermissionsMock {
		this._data.canDisable = canDisable;

		return this;
	}


	// Return data
	public model (): PermissionsModel {
		return this._data;
	}

}
