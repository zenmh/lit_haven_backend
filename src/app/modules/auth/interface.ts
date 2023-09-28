interface ISignIn {
  email: string;
  password: string;
}

interface ISignInResponse {
  accessToken: string;
  refreshToken?: string;
}

interface IRefreshTokenResponse {
  accessToken: string;
}

export { ISignIn, ISignInResponse, IRefreshTokenResponse };
