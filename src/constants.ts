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

export const endpoint = "http://localhost:3000";
export interface Admin {
  emailAddress: string;
  password: string;
  username: string;
  role: string;
  token: string;
}
