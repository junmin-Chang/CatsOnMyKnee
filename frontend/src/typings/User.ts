export interface User {
  username: string;
  name: string;
  profileImage?: {
    key: string;
    url: string;
  };
}
