export class TestingUtilities {

	// This method is lifted straight from stackoverflow
	// Credit Broofa (https://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid)
	static generateId () {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			const r = Math.random() * 16 | 0, v = c == 'x' ? r : ( r & 0x3 | 0x8 );
			return v.toString(16);
		});
	}
}
