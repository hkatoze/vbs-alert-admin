import "./Header.css";
import { BiSearchAlt } from "react-icons/bi";
import { TbMessageCircle } from "react-icons/tb";
import { IoMdNotificationsOutline } from "react-icons/io";
import ADMIN_IMG from "../assets/admin-user-icon.jpg";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title?: string;
  subtitle?: string;
}
const Header = ({ title, subtitle }: HeaderProps) => {
  const navigate = useNavigate();
  return (
    <div className="headerSection flex">
      {!title && !subtitle ? (
        <button
          onClick={() => {
            navigate(-1);
          }}
          className="backButton"
        >
          Go back
        </button>
      ) : (
        <div className="title">
          <h1>{title && title}</h1>
          <p>{subtitle && subtitle}</p>
        </div>
      )}
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
