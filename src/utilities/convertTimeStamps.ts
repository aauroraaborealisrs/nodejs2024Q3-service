import { IUser } from "src/users/interfaces/user.interface";

function convertTimestamps(user: any): Promise<IUser> {
  return {
    ...user,
    createdAt: new Date(user.createdAt).getTime(),
    updatedAt: new Date(user.updatedAt).getTime(),
  };
}

export default convertTimestamps;