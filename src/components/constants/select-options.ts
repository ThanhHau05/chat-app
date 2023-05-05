import { BsPencil } from "react-icons/bs";
import { IconType } from "react-icons/lib";
export interface InfomationUser {
  email: string;
  name: string;
  photoURL: string;
  userName: string;
}

export interface InfomationUsersSearch {
  name: string;
  photoURL: string;
  userName: string;
}

export interface ProfileOptions {
  title: string;
  value: string;
  Icon: IconType;
}

export const DROP_PROFILE_OPTIONS: ProfileOptions[] = [
  {
    title: "Edit Profile",
    value: "edit profile",
    Icon: BsPencil,
  },
];
