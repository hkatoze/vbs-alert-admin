import "./EmployeeItem.css";

import { MdAdminPanelSettings } from "react-icons/md";
import { MdEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

interface EmployeeProps {
  employeeId: number;
  companyId: string;
  firstname: string;
  lastname: string;
  phone_number: string;
  password: string;
  role: string;
  job: string;
  profilImg: string;
  link: string;
  handleDelete: () => void;
  style: any;
}

const EmployeeItem = ({
  firstname,
  lastname,
  link,
  role,
  job,
  profilImg,
  companyId,
  employeeId,
  handleDelete,
  style,
}: EmployeeProps) => {
  return (
    <div className="employeeItem" style={style}>
      <Link to={link} className="link">
        <div className="profilImg">
          <img src={profilImg} alt="" />
        </div>
        <div className="centerSide">
          <div className="infos">
            <h3>{`${lastname} ${firstname}`}</h3>
            <span>{job}</span>
          </div>
        </div>
      </Link>

      <div className="rightSide">
        {role === "ADMIN" ? (
          <MdAdminPanelSettings size="20px" />
        ) : (
          <MdAdminPanelSettings opacity="0" size="20px" />
        )}
        <div className="actions">
          <Link
            to={`/mainpage/companiesboard/editEmployee/${companyId}/${employeeId}`}
          >
            <MdEdit style={{ color: "hsl(210, 100%, 59%)" }} size="18px" />
          </Link>

          <Link
            to="#"
          >
            <MdDelete
              onClick={handleDelete}
              style={{ color: "hsl(0, 100%, 60%)" }}
              size="18px"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EmployeeItem;
