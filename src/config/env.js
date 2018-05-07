/**
 * 配置编译环境和线上环境之间的切换
 * 
 * baseUrl: 域名地址
 * routerMode: 路由模式
 * 
 */

let baseUrl = ''
let productUrl = ''


if(process.env.NODE_ENV == 'production'){
	baseUrl = 'kodosale.fosunfinancial.com'
}

export {
	baseUrl,
	productUrl
}