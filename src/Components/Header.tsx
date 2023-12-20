import "./Header.css";
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import ADMIN_IMG from "../assets/admin-user-icon.jpg";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}
const Header = ({ title, subtitle }: HeaderProps) => {
  return (
    <div className="headerSection flex">
      <div className="title">
        <h1>{title && title}</h1>
        <p>{subtitle && subtitle}</p>
      </div>
      <div className="searchBar flex">
        <input type="text" placeholder="Search" />
        <BiSearchAlt className="icon" />
      </div>

      <div className="adminDiv flex">
        <TbMessageCircle className="icon" />
        <IoMdNotificationsOutline className="icon" />
        <div className="adminImage">
          <img src={ADMIN_IMG} alt="Admin Image" />
        </div>
      </div>
    </div>
  );
};

export default Header;
