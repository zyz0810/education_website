export default function MapLoader () {
  return new Promise((resolve, reject) => {
    if (window.AMap) {
      resolve(window.AMap)
    } else {
      var url = 'https://webapi.amap.com/maps?v=1.4.4&key=[8a4791f6010f719bcf548c8907980d2c]&callback=onLoad'
      var script = document.createElement('script')
      script.charset = 'utf-8'
      script.src = url
      script.onerror = reject
      document.head.appendChild(script)
    }
    window.onLoad = () => {
      resolve(window.AMap)
    }
  })
}