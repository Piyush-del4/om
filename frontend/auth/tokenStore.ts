let accessToken: string | null = null;

export const tokenStore = {
 setToken: (token: string | null) => {
 accessToken = token;
 },
 getToken: (): string | null => {
 return accessToken;
 },
};
