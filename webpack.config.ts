import path from 'path';
import { Configuration } from 'webpack';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import MiniCSSExtractPlugin from 'mini-css-extract-plugin';
import 'webpack-dev-server';

interface EnvVariables {
  port: number;
  mode: 'production' | 'development';
}

export default ({ port, mode }: EnvVariables): Configuration => {
  const isDev = mode === 'development';
  const isProd = mode === 'production';

  return {
    mode: mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].[contenthash].js',
      clean: true,
      assetModuleFilename: 'assets/[hash][ext]',
    },
    devtool: isDev && 'inline-source-map',
    plugins: [
      new HTMLWebpackPlugin({
        template: path.resolve(__dirname, 'public', 'index.html'),
        favicon: path.resolve(__dirname, 'public', 'favicon.svg'),
      }),
      isProd &&
        new MiniCSSExtractPlugin({
          chunkFilename: 'css/[name].[contenthash].css',
          filename: 'css/[name].[contenthash].css',
        }),
    ].filter(Boolean),
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            isDev ? 'style-loader' : MiniCSSExtractPlugin.loader,
            'css-loader',
            'sass-loader',
          ],
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [{ loader: '@svgr/webpack', options: { icon: true } }],
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.jsx', '.js'],
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@/components': path.resolve(__dirname, 'src', 'components'),
        '@/pages': path.resolve(__dirname, 'src', 'pages'),
        '@/constants': path.resolve(__dirname, 'src', 'constants'),
        '@/assets': path.resolve(__dirname, 'src', 'assets'),
        '@/types': path.resolve(__dirname, 'src', 'types'),
        '@/store': path.resolve(__dirname, 'src', 'store'),
      },
    },
    devServer: isDev
      ? { port: port || 3000, compress: true, historyApiFallback: true }
      : undefined,
  };
};
