module.exports = {
	"preset": "jest-preset-angular",
	"setupFilesAfterEnv": [
		"<rootDir>/setup-jest.ts"
	],
	"transform": {
		"^.+\\.(ts|js|html)$": "ts-jest"
	},
	"testPathIgnorePatterns": [
		"<rootDir>/node_modules/",
		"<rootDir>/dist/",
		"<rootDir>/cypress/",
		"<rootDir>/src/test.ts",
	]
};
