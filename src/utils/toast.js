import { Message,MessageBox  } from 'element-ui'

// export function MessageBoxAlert(message, title, options) {
//   MessageBox.alert({
//     message, title, options
//     }).catch();
// }
const MyMessageBox = (type,msg,title,option,callback)=>{
  let alert = null;
  switch (type) {
    case 1:
      alert = Message({
        message:msg,
        type:"success"
      });
      break;
    case 2:
      console.log('2222')
      alert = MessageBox.alert(
        msg,
        title,
        option,
      ).then(()=>{
        callback()
      }).catch(()=>{});
      break;
    case 3:
      console.log('2222')
      alert = MessageBox.confirm(
        msg,
        title,
        option,
      ).then(()=>{
        console.log('点击 确认')
        callback()
      }).catch(()=>{      console.log('取消操作')});
      break;
  }
  return alert;
}
export default MyMessageBox
