var TypedocWebpackPlugin = require('typedoc-webpack-plugin');

module.exports = {
  webpack: (config, options, webpack) => {
    config.entry.main = ['./server/index.ts'];

    config.resolve = {
      extensions: ['.ts', '.js', '.json']
    };

    config.module.rules.push({
      test: /\.ts$/,
      exclude: /(node_modules)/,
      loader: 'awesome-typescript-loader'
    });

    config.module.rules.push({
      test: /\.graphql?$/,
      loader: 'webpack-graphql-loader'
    });

    if (options.env === 'production') {
      config.plugins = [
        ...config.plugins,
        new TypedocWebpackPlugin(
          {
            out: './docs',
            target: 'es6',
            module: 'commonjs',
            moduleResolution: 'node',
            experimentalDecorators: true,
            emitDecoratorMetadata: true,
            exclude: '**/node_modules/**/*.*',
            excludeExternals: true,
            includeDeclarations: false,
            ignoreCompilerErrors: true,
            excludePrivate: true,
            lib: ['lib.esnext.full.d.ts', 'lib.esnext.asynciterable.d.ts']
          },
          ['./server']
        )
      ];
    }
    return config;
  }
};
