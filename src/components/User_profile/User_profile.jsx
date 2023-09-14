import React from "react";
import styles from "./user_profile.module.scss";
import logoUser from "../../assets/585e4beacb11b227491c3399.png";

const UserProfile = ({ user }) => {
  return (
    <>
      <div className={styles["profile-body"]}>
        <div className={styles["profile-card"]}>
          <div className={styles["profile-img"]}>
            <img
              src={logoUser}
              alt="logo-user"
              className={styles["logo-img"]}
            />
          </div>
          <div className={styles["profile-container"]}>
            <h1 className={styles["profile-name"]}>{user.name}</h1>
            <div className={styles["profile-box-email"]}>
              <p className={styles["profile-email"]}>Email: {user.email}</p>
            </div>
            <div className={styles["profile-box-address"]}>
              <p className={styles["profile-address"]}>
                Dirección: {user.address}
              </p>
            </div>
            <div className={styles["profile-box-role"]}>
              <p className={styles["profile-role"]}>Rol: {user.role}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
