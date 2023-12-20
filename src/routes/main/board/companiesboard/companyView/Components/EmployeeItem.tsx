import "./EmployeeItem.css";

import { MdAdminPanelSettings } from "react-icons/md";
interface EmployeeProps {
  employeeId: number;
  companyId: number;
  firstname: string;
  lastname: string;
  phone_number: string;
  password: string;
  role: string;
  job: string;
  profilImg: string;
}

const EmployeeItem = ({
  employeeId,
  companyId,
  firstname,
  lastname,
  phone_number,
  password,
  role,
  job,
  profilImg,
}: EmployeeProps) => {
  return (
    <div className="employeeItem">
      <div className="profilImg">
        <img src={profilImg} alt="" />
      </div>
      <div className="rightSide">
        <div className="infos">
          <h3>{`${lastname} ${firstname}`}</h3>
          <span>{job}</span>
        </div>
        <div className="isAdmin">
          {role === "ADMIN" && <MdAdminPanelSettings size="20px" />}
        </div>
      </div>
    </div>
  );
};

export default EmployeeItem;
