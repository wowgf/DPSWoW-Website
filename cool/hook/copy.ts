import { Message } from "@arco-design/web-vue";
import { ref } from "vue";
export function useCopy(btnText: string) {
  const copyBtnText = ref(btnText || "复制字符");
  function copyContent(content: string) {
    copyBtnText.value = "已复制";

    copy(content);

    setTimeout(() => {
      copyBtnText.value = btnText || "复制字符";
    }, 1000);

  }

  function copyImg(id: string) {
    const img: any = document.getElementById(id);
    const canvas = document.createElement("canvas");
    const ctx: any = canvas.getContext("2d");

    // 设置canvas的宽高与图片相同
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;

    // 将图片绘制到canvas上
    ctx.drawImage(img, 0, 0);

    // 将canvas内容转换为Blob对象
    canvas.toBlob(async (blob) => {
      // 使用Clipboard API将Blob写入剪贴板
      try {
        await navigator.clipboard.write([
          new ClipboardItem({ [blob.type]: blob }),
        ]);
        Message.success("图片已复制到剪贴板！");
      } catch (err) {
        console.error("Failed to copy image: ", err);
      }
    }, "image/png"); // 可以根据需要更改格式为'image/jpeg'等
  };

  return { copyBtnText, copyContent, copyImg };
}
