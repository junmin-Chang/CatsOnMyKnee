export type Provider = 'google' | 'kakao';

export class User {
  id: number;
  provider: Provider;
  providerId: string;
  username: string;
  name: string;
  created_at: Date;
  updated_at: Date;
}
