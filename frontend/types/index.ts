export interface User {
  id: string
  name: string
  email: string
}

export interface AuthState {
  isLoggedIn: boolean
  token: string | null
  user: User | null
}


export interface BlogCardProps {
  post: {
    _id: string;
    title: string;
    content: string;
    slug: string;
    image: string;
    authorId?: { name: string };
    createdAt: string;
  };
}

export interface Author {
  _id: string;
  name: string;
  email: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  image: string;
  content: string;
  authorId: Author;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  slug: string;
  __v: number;
}
export interface User {
  id: string
  name: string
  email: string
}

export interface AuthState {
  isLoggedIn: boolean
  token: string | null
  user: User | null
}


export interface BlogCardProps {
  post: {
    _id: string;
    title: string;
    content: string;
    slug: string;
    image: string;
    authorId?: { name: string };
    createdAt: string;
  };
}

export interface Author {
  _id: string;
  name: string;
  email: string;
}

export interface BlogPost {
  _id: string;
  title: string;
  image: string;
  content: string;
  authorId: Author;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  slug: string;
  __v: number;
}
export type PostList = {
  post: BlogPost[];
};



export interface DashboardLayoutProps {
  children: React.ReactNode;
}
