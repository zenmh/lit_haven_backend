import { Role } from "@prisma/client";

interface IUserResponse {
  id: string;
  name: string;
  email: string;
  role: Role;
  contactNo: string;
  address: string;
  profileImg: string;
}

type IUserFilters = {
  searchTerm?: string;
  name?: string;
  contactNo?: string;
  address?: string;
};

export { IUserResponse, IUserFilters };
