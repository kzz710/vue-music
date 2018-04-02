/**
 * Created by kuangz on 2018/4/2.
 */
import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'

export function getRecommend() {

  const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

  const data = Object.assign({}, commonParams, {
    platform: 'h5',
    uin: 0,
    needNewCode: 1,
    notice: 0
  })

  return jsonp(url, data, options)
}
