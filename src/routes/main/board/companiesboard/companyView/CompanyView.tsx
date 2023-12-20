import { CiBank } from "react-icons/ci";
import { MdModeEdit } from "react-icons/md";
import { FaUsers } from "react-icons/fa";

import "./CompanyView.css";
import EmployeeItem from "./Components/EmployeeItem";

import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { endpoint, headers } from "../../../../../constants";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { ClipLoader } from "react-spinners";

const CompanyView = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const deleteMutation = useMutation({
    mutationFn: (companyId: string) =>
      axios
        .delete(`${endpoint}/api/companies/${companyId}`, {
          headers: headers,
        })
        .then((response) => {
          return response.data;
        }),
    onSuccess: (data) => {
      queryClient.invalidateQueries;
      navigate(-1);
    },
  });
  const { companyId } = useParams();

  const fetchCompanyById = () => {
    return axios.get(`${endpoint}/api/companies/${companyId}`, {
      headers: headers,
    });
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["company-by-id"],
    queryFn: fetchCompanyById,
  });

  return (
    <div className="companyView">
      <div className="backButtonSection">
        <button
          className="backButton"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go back
        </button>
      </div>

      {isLoading ? (
        <ClipLoader
          color="hsl(210, 100%, 59%)"
          loading={isLoading}
          aria-label="Loading Spinner"
          speedMultiplier={0.8}
          data-testid="loader"
        />
      ) : isError ? (
        <p>Something went wrong</p>
      ) : (
        <div className="bottomSection">
          <div className="informations">
            <div className="title">
              <div>
                <CiBank color="white" size="25px" />
              </div>
              <h2>{data?.data.data.companyName}</h2>
            </div>
            <div className="content">
              <div className="profil">
                <div className="logo">
                  <img src={data?.data.data.companyLogo} alt="company logo" />
                </div>
              </div>

              <div className="company">
                <div>
                  <h3>City:</h3>
                  <span>{data?.data.data.city}</span>
                </div>
                <div>
                  <h3>Country:</h3>
                  <span>{data?.data.data.country}</span>
                </div>
                <div>
                  <h3>Postal Code:</h3>
                  <span>{data?.data.data.postalCode}</span>
                </div>
                <div>
                  <h3>Last activity:</h3>
                  <span>14/04/2023</span>
                </div>
                <div>
                  <h3>Street Address:</h3>
                  <span>{data?.data.data.streetAddress}</span>
                </div>
                <div>
                  <h3>Company name:</h3>
                  <span>{data?.data.data.companyName}</span>
                </div>
              </div>

              <div className="actionsBlock">
                <span className="edit">Edit</span>
                <span
                  className="delete"
                  onClick={() => {
                    if (confirm("Do you want really delete this companie")) {
                      deleteMutation.mutate(companyId!);
                    }
                  }}
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
          <div className="employees">
            <div className="title">
              <div>
                <FaUsers color="white" size="25px" />
              </div>
              <h2>Employees List</h2>
            </div>
            <div className="content">
              <EmployeeItem
                employeeId={1}
                companyId={1}
                firstname="KINDA"
                lastname="Harouna"
                phone_number="+22674578186"
                password="Kind@1404"
                role="ADMIN"
                job="IT Company"
                profilImg="https://ucarecdn.com/a92d3f80-ffab-4f43-914d-296a5c46b101/"
              />
              <EmployeeItem
                employeeId={1}
                companyId={1}
                firstname="DAO"
                lastname="Razack"
                phone_number="+22674578186"
                password="Kind@1404"
                role="USER"
                job="Stagiaire"
                profilImg="https://ucarecdn.com/a92d3f80-ffab-4f43-914d-296a5c46b101/"
              />
              <EmployeeItem
                employeeId={1}
                companyId={1}
                firstname="NIKIEMA"
                lastname="Eliele"
                phone_number="+22674578186"
                password="Kind@1404"
                role="USER"
                job="Stagiaire"
                profilImg="https://ucarecdn.com/a92d3f80-ffab-4f43-914d-296a5c46b101/"
              />
              <EmployeeItem
                employeeId={1}
                companyId={1}
                firstname="SAWADOGO"
                lastname="Fatim"
                phone_number="+22674578186"
                password="Kind@1404"
                role="USER"
                job="Assistante administrative"
                profilImg="https://ucarecdn.com/a92d3f80-ffab-4f43-914d-296a5c46b101/"
              />
              <EmployeeItem
                employeeId={1}
                companyId={1}
                firstname="TRAORE"
                lastname="Ivan"
                phone_number="+22674578186"
                password="Kind@1404"
                role="ADMIN"
                job="Project Manager"
                profilImg="https://ucarecdn.com/a92d3f80-ffab-4f43-914d- g296a5c46b101/"
              />
              <EmployeeItem
                employeeId={1}
                companyId={1}
                firstname="SAWADOGO"
                lastname="Abdouramane"
                phone_number="+22674578186"
                password="Kind@1404"
                role="ADMIN"
                job="IT Consultant"
                profilImg="https://ucarecdn.com/a92d3f80-ffab-4f43-914d-296a5c46b101/"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyView;
