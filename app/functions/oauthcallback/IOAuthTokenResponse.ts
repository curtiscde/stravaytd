export interface IOAuthTokenResponse {
  access_token: string;
  refresh_token: string;
  athlete: {
    id: number;
  }
}
