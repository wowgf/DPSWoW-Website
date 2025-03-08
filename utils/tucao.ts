import { useUserStore } from "~/store/user";

export async function tucao() {
  const { info } = storeToRefs(useUserStore())
  console.log('tucao', info.value?.id);

  if (!info.value?.id) {
    await useUserStore().get()
  }
  let productId = '670109'
  let openid: any = btoa('wowgf' + info.value?.id)
  let data: any = {
    "nickname": info.value?.nickName,
    "avatar": info.value?.avatarUrl,
    "openid": openid,
  }
  let form = document.createElement("form");
  form.id = "form";
  form.name = "form";
  document.body.appendChild(form);

  // 设置相应参数 
  for (let key in data) {
    let input = document.createElement("input");
    input.type = "text";
    input.name = key;
    input.value = data[key];
    // 将该输入框插入到 form 中 
    form.appendChild(input);
  }

  // form 的提交方式 
  form.method = "POST";
  // form 提交路径 
  form.action = "https://support.qq.com/product/" + productId;
  // 对该 form 执行提交 
  form.submit();

  // 删除该 form 
  document.body.removeChild(form);
}