export const headers = {
  Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcwMjA1MDIzOSwiZXhwIjoxNzMzNTg2MjM5fQ.vlAMLEwlVnkDYZRt5pz9QqaJtWoenAbf76gvrcNBSHk`,
  "Content-Type": "application/json",
};

export type CompanyModel = {
  companyId?: number;
  companyName: string;
  country: string;
  streetAddress: string;
  city: string;
  postalCode: string;
  companyLogo: string;
};

export type EmployeeModel = {
  companyId?: string;
  employeeId: number;
  firstname: string;
  job: string;
  lastname: string;
  password: string;
  phone_number: string;
  role: string;
  profilUrl: string;
};

export const endpoint = "https://sore-gray-cygnet-wear.cyclic.app";
export interface Admin {
  emailAddress: string;
  password?: string;
  username: string;
  firstname: string;
  lastname: string;
  role: string;
  token?: string;
}

export interface ApiErrorResponse {
  message: string;
  // Ajoutez d'autres propriétés si nécessaire
}
