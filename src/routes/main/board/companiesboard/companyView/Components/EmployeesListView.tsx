import { FaUsers } from "react-icons/fa";
import "./EmployeesListView.css";
import EmployeeItem from "./EmployeeItem";
import axios from "axios";
import { EmployeeModel, endpoint, headers } from "../../../../../../constants";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { ClipLoader } from "react-spinners";
import ERROR_ICON from "../../../../../../assets/errorIcon.png";
import EMPTY_ICON from "../../../../../../assets/empty-icon.png";
import { Link } from "react-router-dom";
import { useState } from "react";

interface EmployeesListViewProps {
  companyId: string;
}

export const EmployeesListView = ({ companyId }: EmployeesListViewProps) => {

  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const fetchAllEmployees = () => {
    return axios.get(`${endpoint}/api/employees?companyId=${companyId}`, {
      headers: headers,
    });
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["employees-by-company"],
    queryFn: fetchAllEmployees,
  });

  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (employeeId: string) =>
      axios
        .delete(`${endpoint}/api/employees/${employeeId}`, {
          headers: headers,
        })
        .then((response) => {
          return response.data;
        }),
    onSuccess: (data) => {
      console.log(data);
      setIsLoadingDelete(false);
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      console.log(error);
      setIsLoadingDelete(false);
    },
  });
  
const handleDelete = (employeeId:number)=>{
  if (confirm("Voulez vous vraiment supprimer cet employé")) {
             
    deleteMutation.mutate(String(employeeId!));

}
}

const style = { opacity: isLoadingDelete ? "0.5" : "1" };
  return (
    <div className="employees">
      <div className="title">
        <div className="leftSide">
          <div>
            <FaUsers color="white" size="25px" />
          </div>
          <h2>Employees List</h2>
        </div>
        <div className="rightSide">
          <Link to={`/mainpage/companiesboard/addEmployee/${companyId}`}>
            <button>Add</button>
          </Link>
        </div>
      </div>
      <div className="content">
        {isLoading && (
          <ClipLoader
            style={{ color: "hsl(210, 100%, 59%)" }}
            loading={isLoading}
            aria-label="Loading Spinner"
            speedMultiplier={0.8}
            data-testid="loader"
          />
        )}

        {isError && (
          <div
            className="errorIcon"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 className="empty" style={{ fontSize: "11px" }}>
              Something went wrong
            </h2>
            <img src={ERROR_ICON} style={{ height: "13rem" }} alt="" />
          </div>
        )}

        {data?.data.data.length == 0 && (
          <div
            className="emptyIcon"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <h2 className="empty" style={{ fontSize: "11px" }}>
              No registered employees
            </h2>
            <img src={EMPTY_ICON} style={{ height: "13rem" }} alt="" />
          </div>
        )}

        {data?.data.data.map((employee: EmployeeModel) => (
          <EmployeeItem
            employeeId={employee.employeeId}
            companyId={String(employee.companyId)}
            firstname={employee.firstname}
            lastname={employee.lastname}
            phone_number={employee.phone_number}
            password={employee.password}
            role={employee.role}
            job={employee.job}
            profilImg={employee.profilUrl}
            style={style}
            key={employee.employeeId}
            handleDelete={()=>handleDelete(employee.employeeId)}
          />
        ))}
      </div>
    </div>
  );
};
