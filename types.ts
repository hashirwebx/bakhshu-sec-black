
export type Branch = 'soan' | 'pindi';

export interface RegistrationFormData {
  fullName: string;
  fatherName: string;
  fatherProfession: string;
  dob: string;
  gender: string;
  weight: string;
  height: string;
  nationality: string;
  qualification: string;
  address: string;
  phone: string;
  mobile: string;
  email: string;
  branch: Branch;
  slot: string;
  message: string;
}

export interface BranchInfo {
  id: Branch;
  name: string;
  days: string;
  slots: string[];
  fees: {
    registration: string;
    monthly: string;
    discount?: string;
  };
  address: string;
  special?: string;
  mapEmbedUrl: string;
}
