class JwtTokenUtils {
  JWT_TOKEN_ID = "JWT_TOKEN_ID";

  setToken(value: string) {
    localStorage.setItem(this.JWT_TOKEN_ID, value);
  }

  getToken() {
    return localStorage.getItem(this.JWT_TOKEN_ID);
  }

  removeToken() {
    localStorage.removeItem(this.JWT_TOKEN_ID);
  }
}
export default new JwtTokenUtils();
