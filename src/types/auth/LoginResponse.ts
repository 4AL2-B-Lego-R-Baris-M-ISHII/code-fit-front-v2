interface SigninResponse {
  id: number;
  token: string;
  type: string;
  username: string;
  email: string;
  roles: string[];
}

export default SigninResponse;
