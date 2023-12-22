import axios from "axios";
import "./EmployeeItem.css";

import { MdAdminPanelSettings } from "react-icons/md";
import { MdEdit, MdDelete } from "react-icons/md";
import { useMutation, useQueryClient } from "react-query";
import { endpoint, headers } from "../../../../../../constants";
import { useRef, useState } from "react";
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
  handleDelete: () => void;
  style: any;
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
  handleDelete,
  style,
}: EmployeeProps) => {
  return (
    <div className="employeeItem" style={style}>
      <div className="profilImg">
        <img src={profilImg} alt="" />
      </div>
      <div className="centerSide">
        <div className="infos">
          <h3>{`${lastname} ${firstname}`}</h3>
          <span>{job}</span>
        </div>
      </div>

      <div className="rightSide">
        {role === "ADMIN" ? (
          <MdAdminPanelSettings size="20px" />
        ) : (
          <MdAdminPanelSettings opacity="0" size="20px" />
        )}
        <div className="actions">
          <MdEdit style={{ color: "hsl(210, 100%, 59%)" }} size="18px" />
          <MdDelete
            onClick={handleDelete}
            style={{ color: "hsl(0, 100%, 60%)" }}
            size="18px"
          />
        </div>
      </div>
    </div>
  );
};

export default EmployeeItem;
