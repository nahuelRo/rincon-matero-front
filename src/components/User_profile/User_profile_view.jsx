import React from "react";
import UserProfile from "./User_profile";
import { useSelector } from "react-redux";
import NavbarComponent from "../Navbar/Navbar";
import Purchase_info from "../Purchase_info/Purchase_info";

const UserProfileView = () => {
  const user = useSelector((state) => state.user);
  return (
    <div>
      <NavbarComponent />
      <UserProfile user={user} />
      <Purchase_info />
    </div>
  );
};

export default UserProfileView;
