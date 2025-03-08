import io from 'socket.io-client'
import { useChat } from '~/components/Chat/store';
import { useUserStore } from '~/store/user';
import type { SocketMessageData } from '~/types/chat';
import { getRefreshToken, getToken, setToken, } from '~/utils/token'
export default defineNuxtPlugin(async (nuxtApp) => {
  // const { receiveMessage } = useChat()
  // const { checkLogin } = useUserStore()
  // const HOST = (import.meta as any).env.VITE_HOST

  // // 登录后链接socket
  // if (checkLogin()) {
  //   const socket = io(`${HOST}/client?token=${getToken()}`, { transports: ['websocket'] })
  //   socket.on('message', (msg: string) => {
  //     console.log('on message', msg);
  //     receiveMessage(JSON.parse(msg) as SocketMessageData)
  //   })
  // }

});
