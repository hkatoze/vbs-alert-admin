 
import "./MenuListItem.css";
import { Link } from "react-router-dom";

interface MenuListItemProps {
  children: string;
  link: string;
  icon: React.ReactNode;
}

const MenuListItem = ({ children, link, icon }: MenuListItemProps) => {
  return (
    <li className="listItem">
      <Link to={link} className="menuLink flex">
        {icon}
        <span className="smallText">{children}</span>
      </Link>
    </li>
  );
};

export default MenuListItem;
