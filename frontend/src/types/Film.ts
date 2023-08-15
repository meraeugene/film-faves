export type Film = {
  _id?: string;
  category: string;
  title: string;
  release_date: number;
  genre: string;
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
