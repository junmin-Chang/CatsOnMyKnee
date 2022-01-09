import { Cat } from './Cat';
import { Board } from './Board';
export interface User {
  username: string;
  name: string;
  cat?: Cat[] | null;
  boards?: Board[] | null;
}
