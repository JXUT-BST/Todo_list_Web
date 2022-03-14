import axios from 'axios'

export const loginFn = function (UserName, Password) {
  return axios.get(
    "http://47.96.122.117:10531/login?username=" +
    UserName +
    "&password=" +
    Password
  )
}