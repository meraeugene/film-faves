export type Film = {
  _id?: string;
  genre: string;
  title: string;
  release_date: number;
  description: string;
  link: string;
  image: any;
  likes: number;
  recommendedBy: string;
};

export type User = {
  username: string;
  email: string;
  password: string;
  token: string;
};
