module.exports = {
	enable: true,
	mode: 'random',
	refreshClassConversionJson: false,
	allowExtensions: ['.jsx', '.tsx', '.js', '.ts', '.html', '.rsc'],
	generatorSeed: 'nextjs-template',
	blackListedFolderPaths: ['./.next/cache', /\.next\/server\/pages\/api/, /_document..*js/, /_app-.*/, /__.*/],
};
