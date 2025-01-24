import Cookies from 'js-cookie'

export function setCookie(name: string, value: string) {
  Cookies.set(name, value, {
    expires: 1,
    sameSite: 'Lax'
  })
}

export function getCookie(name: string) {
  return Cookies.get(name) || null
}

export function eraseCookie(name: string) {
  Cookies.remove(name)
}
