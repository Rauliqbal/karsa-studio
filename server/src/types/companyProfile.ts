export interface CompanyProfileInput {
  name: string;
  description: string;
  foundedYear: number;
  address: string;
  email: string;
  phone: string;
  vision: string;
  mission: string;
  logoUrl?: File;
  coverImageUrl: File;
}

export interface CompanyProfileResponse {
  id: string;
  name: string;
  description: string;
  foundedYear: number;
  address: string;
  email: string;
  phone: string;
  vision: string;
  mission: string;
  logoUrl: string;
  coverImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
}
