/**
 * Created by kuangz on 2018/4/2.
 */
module.exports = {
  proxy: {
    '/apis': {    //将www.exaple.com印射为/apis
      target: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?g_tk=5381&uin=0&format=json&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&_=1522652600363',  // 接口域名
      changeOrigin: true,  //是否跨域
    }
  }
}
