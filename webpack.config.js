const HtmlWebPackPlugin = require( 'html-webpack-plugin' );
const path = require( 'path' );

module.exports = {
   context: __dirname,
   entry: './src/index.js',
   output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'bundle.js',
      publicPath: '/',
   },
   devServer: {
      historyApiFallback: true
   },
   module: {
      rules: [
         {
            test: /\.jsx?$/,
            use: 'babel-loader',
         },
         {
            test: /\.s[ac]ss$/i,
            use: ['style-loader', 'css-loader', 'sass-loader'],
         },
         {
            test: /\.(png|j?g|svg|gif)?$/,
            use: 'file-loader'
         }
      ]
   },
   resolve: {
      extensions: ['.js', '.jsx']
   },
   plugins: [
      new HtmlWebPackPlugin({
         template: path.resolve( __dirname, 'src/index.html' ),
         filename: 'index.html'
      })
   ]
};
