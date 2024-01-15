
import {
 MessageBox
} from 'element-ui'
import store from '../store'

// 点击显示图片
const  showImage={
 bind:()=>{},
 inserted:(el,binding)=>{
  el.onclick=()=>{
   const{value}=binding
   MessageBox({
      title: "确认提示",
      dangerouslyUseHTMLString: true,
      message: `<img src=${value}><img/>`,
      confirmButtonText: "确定",
      beforeClose: (action, instance, done) => {
       done()
      },
    });
  }
 },
 updated:()=>{},
}

// 点击展示不通过原因
const showText={
 bind:()=>{},
 inserted:(el,binding)=>{
  el.onclick=()=>{
   const{value}=binding
   MessageBox({
      title: "不通过原因",
      message: value,
      type:'warning',
      confirmButtonText: "确定",
      beforeClose: (action, instance, done) => {
       done()
      },
    });
  }
 },
 updated:()=>{},
}

// input输入框自动精确到小数点两位
const toFixed={
 bind:()=>{},
 inserted:(el,binding)=>{
  const {value}=binding
  el.onchange=(element)=>{
   element.target.value= Number(element.target.value).toFixed(2)
  }
 },
 updated:(el,binding)=>{},
}

// 权限过滤
const rules ={
 bind: (el, binding) => {},
 inserted: (el, binding) => {
   const permissions = store.getters.permissions
   const { value } = binding
   if (
     !permissions.includes(value.admin) &&
     !permissions.includes(value.ordinary)
   ) {
     el.parentNode.removeChild(el)
   }
 },
 updated: el => {}
}

// 判断小数点正整数  v-inputLimit='0'  0位  v-inputLimit='1'  1位   v-inputLimit='2'  2位
const inputLimit = {
  bind(el, binding) {
    var wins_0 = /[^\d]/g //整数判断
    var wins_1 = /[^\d^\.]/g //小数判断
    var flag = true;
    var points = 0;
    var lengths = 0
    var remainder = 0
    var no_int = 0
    const target = el instanceof HTMLInputElement ? el : el.querySelector("input");
    target.addEventListener("compositionstart", e => {
      flag = false;
    });
    target.addEventListener("compositionend", e => {
      flag = true;
    });
    target.addEventListener("input", e => {
      setTimeout(function() {
        if (flag) {
          if (binding.value == 0) {
            if (wins_0.test(e.target.value)) {
              e.target.value = e.target.value.replace(wins_0, "");
              e.target.dispatchEvent(new Event("input")) //手动更新v-model值
            }
          }
          if (binding.value == 1) {
            if (wins_0.test(e.target.value.toString().replace(/\d+\.(\d*)/, '$1'))) {
              remainder = true
            }
            if ((e.target.value.split('.')).length - 1 > 1) {
              points = true
            }
            if (e.target.value.toString().split(".")[1] != undefined) {
              if (e.target.value.toString().split(".")[1].length > 1) {
                lengths = true
              }
            }
            if (e.target.value.toString().indexOf(".") != -1) {
              no_int = false
            } else {
              no_int = true
            }
            if (wins_1.test(e.target.value) || lengths || points || remainder) {
              if (!no_int) {
                e.target.value = e.target.value.replace(wins_1, "").replace('.', '$#$').replace(/\./g, '').replace(
                  '$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3').substring(0, e.target.value.indexOf(
                  ".") + 2)
              } else {
                e.target.value = e.target.value.replace(wins_0, "")
              }
              e.target.dispatchEvent(new Event("input"))
            }
          }


          if (binding.value == 2) {
            if (wins_0.test(e.target.value.toString().replace(/\d+\.(\d*)/, '$1'))) {
              remainder = true
            }
            if ((e.target.value.split('.')).length - 1 > 1) {
              points = true
            }
            if (e.target.value.toString().split(".")[1] != undefined) {
              if (e.target.value.toString().split(".")[1].length > 2) {
                lengths = true
              }
            }
            if (e.target.value.toString().indexOf(".") != -1) {
              no_int = false
            } else {
              no_int = true
            }
            if (wins_1.test(e.target.value) || lengths || points || remainder) {
              if (!no_int) {
                e.target.value = e.target.value.replace(wins_1, "").replace('.', '$#$').replace(/\./g, '').replace(
                  '$#$', '.').replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3').substring(0, e.target.value.indexOf(
                  ".") + 3)
              } else {
                e.target.value = e.target.value.replace(wins_0, "")
              }
              e.target.dispatchEvent(new Event("input"))
            }
          }
        }
      }, 0)
    })
  }
}

// 自定义指令
const directives = {
 showImage,
 toFixed,
 rules,
 showText,
 inputLimit,
}


export default {
 install(Vue) {
   Object.keys(directives).forEach((key) => {
     Vue.directive(key, directives[key])
   })
 },
}

