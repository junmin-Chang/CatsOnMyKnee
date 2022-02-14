export interface User {
  username: string;
  name: string;
  bio: string;
  profileImage?: {
    key: string;
    url: string;
  };
}
