// 1.在主入口文件main.js里引用并应用
// import vueWaves from "@/directives//wave"
// Vue.use(vueWaves)
/**
 * 1.在主入口文件main.js里引用并应用
 *   import vueWaves from "@/directives//wave"
 *   Vue.use(vueWaves)
 *
 * 2. 在组件内部挂载-如在登录页的内部组件中挂载
 *   <div class="login-container" v-waves>
 */

const vueWaves = {}
vueWaves.install = (Vue, options = {}) => {
  Vue.directive('waves', {
    bind(el, binding) {
      // 注意，这个id必须有个父节点，且去节点需要设定宽高
      let body = document.getElementsByTagName('body')[0]
      var canvas = document.createElement('canvas')
      body.appendChild(canvas)

      canvas.classList.add('myCanvas')
      canvas.style.display = 'block'
      canvas.style.position = 'absolute'
      canvas.style.left = '0px'
      canvas.style.top = '0px'
      canvas.style.zIndex = '-1'
      canvas.width = canvas.parentNode.offsetWidth
      canvas.height = canvas.parentNode.offsetHeight
      var ctx = canvas.getContext('2d')
      //如果浏览器支持requestAnimFrame则使用requestAnimFrame否则使用setTimeout
      window.requestAnimFrame = (function () {
        return (
          window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          function (callback) {
            window.setTimeout(callback, 1000 / 60)
          }
        )
      })()
      // 波浪大小
      // var boHeight = canvas.height / 10;
      var boHeight = canvas.height / 20
      var posHeight = canvas.height / 1.09
      //初始角度为0
      var step = 0
      //定义三条不同波浪的颜色
      var lines = [
        'rgba(103,177,255, 1)',
        'rgba(157,192,249, 0.5)',
        'rgba(0,168,255, 0.3)'
      ]

      function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        step++
        //画3个不同颜色的矩形
        for (var j = lines.length - 1; j >= 0; j--) {
          ctx.fillStyle = lines[j]
          //每个矩形的角度都不同，每个之间相差45度
          var angle = ((step + j * 50) * Math.PI) / 180
          var deltaHeight = Math.sin(angle) * boHeight
          var deltaHeightRight = Math.cos(angle) * boHeight
          ctx.beginPath()
          ctx.moveTo(0, posHeight + deltaHeight)
          ctx.bezierCurveTo(
            canvas.width / 2,
            posHeight + deltaHeight - boHeight,
            canvas.width / 2,
            posHeight + deltaHeightRight - boHeight,
            canvas.width,
            posHeight + deltaHeightRight
          )
          ctx.lineTo(canvas.width, canvas.height)
          ctx.lineTo(0, canvas.height)
          ctx.lineTo(0, posHeight + deltaHeight)
          ctx.closePath()
          ctx.fill()
        }
        requestAnimFrame(loop)
      }
      loop()
    }
  })
}

export default vueWaves
