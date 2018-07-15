var path = require('path')  //node系统模块
const VueLoaderPlugin = require('vue-loader/lib/plugin'); //vue-loader 伴生插件 
module.exports = {  //暴露
	entry: {   //入口文件
		main: './src/main.js'
	},
	mode: 'development',  //开发模式 可使用production生产模式进行替换
	plugins: [
		new VueLoaderPlugin()   //vue-loader的VueLoaderPlugin
	],
	output: {      //输出
		filename: '[name].js',   //输出时文件名
		path: path.resolve(__dirname, '../dist'),   //commonJs提供 文件名    -》输出路径
		publicPath: '/'     //   html中的引入文件路径
	},
	devServer: {    //热跟新
		contentBase: 'dist',    //服务器指向文件名。类似node中的静态资源加载
		overlay:true //报错显示到浏览器
	},
	resolve: {    //引入vue.js
		alias: {
			'vue$': 'vue/dist/vue.js'
		}
	}, 
	module: { //loader配置
		rules: [{
				test: /\.css$/,   // 正则css
				use: [{
						loader: "style-loader"   //渲染
					},
					{
						loader: "css-loader"    //压缩
					}
				]
			},
			{
				test: /\.html$/,  //正则 所有的html
				use: [{
						loader: "file-loader",  //文件输出
						options: {  //名字
							name: "[name].html"
						}
					},
					{
						loader: "extract-loader"  //与main.js分离，打包成一个独立的文件
					},
					{
						loader: "html-loader",  //渲染，压缩
						options: {
							attrs: ["img:src"]
						}
					}
				]
			},
			{
				test: /\.(jpg|git|png)$/,   //图片
				use: [{
					loader: "file-loader",
					options: {
						name: "[name]-[hash:8].[ext]"  //压缩为一个名字8位哈希值的图片
					}
				}]
			},
			{
				test: /\.vue$/,   //压缩vue
				use: [{
					loader: "vue-loader"  //压缩vue的loader
				}],
				exclude: '/node_modules/'    // 排除压缩的文件
			}
		]
	}
}