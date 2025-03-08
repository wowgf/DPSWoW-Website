// import dayjs from "dayjs";
import Cookie from 'js-cookie'
/**
 * 将给定的键值对存储到本地存储中。
 *
 * 此函数为一个实用工具，用于简化对浏览器本地存储（localStorage）的访问。
 * 它通过键值对的形式存储数据，其中值经过JSON.stringify序列化为字符串，以支持各种数据类型的存储。
 *
 * @param key 存储的键名，必须是字符串。
 * @param value 要存储的值，可以是任何类型。在存储前，会被转换为字符串形式的JSON对象。
 * @param expiration 可选参数，表示键值对的过期时间，单位为毫秒。如果指定了过期时间，则在过期时间之前，
 */
export function setCookie(key: string, value: any, expiration?: number) {
  Cookie.set(key, JSON.stringify(value));
  // (window as any).api.store.set(key, value, expiration)
  if (expiration) {
    Cookie.set(`${key}__expiration`, new Date().getTime() + expiration + '')
  }
}

/**
 * 从本地存储中获取指定键的值。
 *
 * 本函数旨在提供一种简洁的方式，来从浏览器的本地存储中获取JSON格式的数据。
 * 它通过键值查询本地存储，并尝试将找到的值解析为JSON对象。如果键不存在或值不是有效的JSON字符串，
 * 则函数会返回一个空对象。
 *
 * @param key 在本地存储中要查询的键。
 * @returns 返回解析后的JSON对象，如果键不存在或值为空，则返回一个空对象。
 */
export function getCookie(key: string) {
  let data = Cookie.get(key)
  let expiration = Cookie.get(`${key}__expiration`)

  if (expiration && new Date().getTime() > Number(expiration)) {
    Cookie.remove(key)
    Cookie.remove(`${key}__expiration`)
    return null
  }

  return (data && JSON.parse(data)) || null
}

export function removeCookie(key: string) {
  Cookie.remove(key)
  Cookie.remove(`${key}__expiration`)
}