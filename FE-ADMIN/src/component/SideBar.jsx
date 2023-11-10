import { NavLink, useNavigate } from "react-router-dom";
import sideBarStyle from "../css/sideBar.module.css";
import adminService from "../services/admin.service";

const SideBar = () => {
  const navigate = useNavigate();
  const signOut = async () => {
    await adminService.signOut();
    navigate("/");
  };
  return (
    <div className={sideBarStyle.container}>
      <div className={sideBarStyle.sidebar}>
        <div className={sideBarStyle["logo-details"]}>
          <span className={sideBarStyle["logo_name"]}>Hotel Dashboard</span>
        </div>
        <ul className={sideBarStyle["nav-links"]}>
          <li>
            <NavLink
              to={"/home"}
              className={({ isActive }) =>
                isActive ? sideBarStyle.active : ""
              }
            >
              <i className="fa-solid fa-hotel"></i>
              <span className={sideBarStyle["links_name"]}>Room manager</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/booking"}
              className={({ isActive }) =>
                isActive ? sideBarStyle.active : ""
              }
            >
              <i className="fa-solid fa-hotel"></i>
              <span className={sideBarStyle["links_name"]}>
                Booking manager
              </span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/user"}
              className={({ isActive }) =>
                isActive ? sideBarStyle.active : ""
              }
            >
              <i className="fa-solid fa-user"></i>
              <span className={sideBarStyle["links_name"]}>User manager</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/bo"}
              className={({ isActive }) =>
                isActive ? sideBarStyle.active : ""
              }
            >
              <i className="fa-solid fa-blog"></i>
              <span className={sideBarStyle["links_name"]}>Blog manager</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/gallery"}
              className={({ isActive }) =>
                isActive ? sideBarStyle.active : ""
              }
            >
              <i className="fa-sharp fa-solid fa-images"></i>{" "}
              <span className={sideBarStyle["links_name"]}>
                Gallery manager
              </span>
            </NavLink>
          </li>
          <li className={sideBarStyle["log_out"]}>
            <NavLink>
              <i className="fa-solid fa-right-from-bracket"></i>
              <span className={sideBarStyle["links_name"]} onClick={signOut}>
                Log out
              </span>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
