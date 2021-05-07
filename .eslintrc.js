module.exports = {
	'env': {
		'commonjs': true,
		'es2021': true,
		'node': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 12
	},
	'rules': {
		indent: [
			'error',
			'tab',
		],
		// eslint-disable-next-line no-bitwise
		'no-tabs': ['error', { allowIndentationTabs: true }],
		'linebreak-style': [
			'error',
			'unix',
		],
		'func-names': 0,
		quotes: [
			'error',
			'single',
		],
		semi: [
			'error',
			'never',
		],
		'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 0 }],
		'space-before-function-paren': 'off',
	}
}
