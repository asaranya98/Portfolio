export interface Project {
  id: string;
  Id: string;
  Title: string;
  Description: string;
  Image: string;
  Technologies: string;
  GithubUrl: string;
  LiverUrl: string;
  Category: string;
  Featured: boolean | string;
  Features: string;
  // legacy aliases (fallback data)
  title?: string;
  description?: string;
  tools?: string;
  link?: string;
  github?: string;
  image_url?: string;
  category?: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  'S. No': string;
  Title: string;
  Company: string;
  Period: string;
  Location: string;
  'Key Contributions': string;
  // legacy aliases (fallback data)
  company?: string;
  role?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
  logo_url?: string;
  is_current?: boolean;
}

export interface Certificate {
  id: string;
  'S. No': string;
  Title: string;
  Issuer: string;
  Date: string;
  Image: string;
  Link: string;
  Category: string;
  // legacy aliases (fallback data)
  title?: string;
  issuer?: string;
  date?: string;
  credential_url?: string;
  image_url?: string;
  category?: string;
}