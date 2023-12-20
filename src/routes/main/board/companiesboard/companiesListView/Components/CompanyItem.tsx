import { MouseEventHandler } from "react";
import "./CompanyItem.css";
import { Link } from "react-router-dom";

interface CompanyItemProps {
  name: string;
  logo: string;
  link: string;
  nbrEmployees: number;
}
const CompanyItem = ({ name, logo, nbrEmployees, link }: CompanyItemProps) => {
  return (
    <div className="companyItem">
      <Link to={link}>
        <div className="title">
          <h2>{name}</h2> <img src={logo} alt="" />
        </div>
        <div className="content">
          <div>
            <span className="label">Employees:</span>
            <span className="value">{nbrEmployees}</span>
          </div>
          <div>
            <span className="label">Last activity:</span>
            <span className="value">01/12/2023</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CompanyItem;
