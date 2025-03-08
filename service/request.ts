import axios from 'axios'
import { endsWith } from 'lodash-es'
import { getRefreshToken, getToken, setToken, } from '~/utils/token'
import { fetchRefreshToken, } from '~/service/api/user'

import white from './white';
import { useLoginStore } from '~/store/login';
import { Message } from '@arco-design/web-vue';
import { useUserStore } from '~/store/user';

const noToastUrls: any[] = [
  '/app/adverts/advert/status'
]

// 请求队列
let queue: Array<(token: string) => void> = [];

// 是否刷新中
let isRefreshing = false;

function runQueue(token: string) {
  queue.forEach((cb) => cb(token));
  queue = [];
  isRefreshing = false;
}

const service = axios.create({
  baseURL: (import.meta as any).env.VITE_HOST,
  // baseURL: 'http://192.168.31.69:8002',
  withCredentials: false,
  timeout: 1000 * 60,
})

service.interceptors.request.use(
  (config) => {

    let token = process.client ? getToken() : ''
    let refreshToken = process.client ? getRefreshToken() : ''
    const login = useLoginStore()
    const { show: showLogin } = storeToRefs(login)
    config.headers['Authorization'] = '' + token
    // 忽略
    if (white.some((e) => endsWith(config.url, e)) || config.url?.startsWith('/open')) {
      return config;
    }

    if (!token) {
      // 判断 refreshToken 是否过期，如果未过期，则直接刷新 token
      // 如果 refreshToken 过期，则重新注册登录
      if (!refreshToken) {
        if (!showLogin.value) useUserStore().logout(false)
        login.open()
        // return Promise.reject()
      } else {
        if (!isRefreshing) {
          isRefreshing = true;
          if (refreshToken) {
            fetchRefreshToken(refreshToken).then((res: any) => {
              setToken(res)
              runQueue(res.token)
            }).catch((_e) => {
              useUserStore().logout()
              isRefreshing = false;
            });
          } else {
            login.open()
            return Promise.reject()
          }
        }

        return new Promise((resolve) => {
          // 继续请求
          queue.push((inToken) => {
            // 重新设置 token
            if (config.headers) {
              config.headers["Authorization"] = inToken;
            }
            resolve(config);
          });
        })
      }
    }

    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  (res) => {
    if (!res?.data) {
      return res
    }

    const { code, data, message } = res.data

    switch (code) {
      case 1000:
        return data
      default:
        if (!noToastUrls.includes(res.config.url)) {
          Message.error(message)
        }

        return Promise.reject({ code, message })
    }
  },
  (error) => {
    if (error.response) {
      const { status } = error.response;
      if (status == 401) {
        useUserStore().logout()
        useLoginStore().open()
      }
    }

    return Promise.reject(error)
  }
)

export default service
