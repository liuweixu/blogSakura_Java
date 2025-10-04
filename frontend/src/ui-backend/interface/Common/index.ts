export interface BreadCrumbItems {
  href: string;
  title: string;
  pagename: string;
}

export interface LoginResponse {
  code: number;
  msg: string;
  data?: string;
}