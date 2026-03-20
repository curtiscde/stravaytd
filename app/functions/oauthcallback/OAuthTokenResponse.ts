export interface OAuthTokenResponse {
  access_token: string;
  refresh_token: string;
  athlete: {
    id: number;
  }
}
