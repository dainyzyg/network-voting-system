interface UserInfo {
  userName: string
  password: string
}

export default {
  login(userInfo: UserInfo) {
    if (!userInfo) {
      return false
    }
    sessionStorage.userInfo = JSON.stringify(userInfo)
    return true
  },
  isLogin() {
    let userInfo
    try {
      userInfo = JSON.parse(sessionStorage.userInfo)
    } catch (error) {
      userInfo = null
    }
    return userInfo ? true : false
  }
}
