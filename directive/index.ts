// 导入指令定义文件
// import drop from './drop'
import tableLoadmore from './tableLoadmore'
import checkPhone from './checkPhone'
import clickOutside from './clickoutside'

// 集成一起
const directives = {
  'loadmore': tableLoadmore,
  'phone': checkPhone,
  'clickoutside': clickOutside
}
//批量注册
directives.install = function (app) {
  Object.keys(directives).forEach((key) => {
    app.directive(key, directives[key])
  })
}

export default directives
