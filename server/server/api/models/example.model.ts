/**
 * Example Response Model
 */
export interface Example {
  id: number;
  name: string;
}

/**
 * Posts API Response Model
 */
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
