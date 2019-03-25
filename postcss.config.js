const autoprefixer = require('autoprefixer');

module.exports = {
	plugins: [
		autoprefixer({ grid: true,
			browsers: ['> 1%', 'last 3 versions', 'Firefox >= 20', 'iOS >=7'] })
	]
  }