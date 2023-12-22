import { CiBank } from "react-icons/ci";
 
 

import "./CompanyView.css";
 

import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { endpoint, headers } from "../../../../../constants";
import {
 
  useMutation,
  useQuery,
  useQueryClient,
} from "react-query";
import { ClipLoader } from "react-spinners";
import { EmployeesListView } from "./Components/EmployeesListView";

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
    onSuccess: ( ) => {
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
                
                <span className="edit"><Link to={`/mainpage/companiesboard/editCompany/${companyId}`}>Edit</Link></span>
                <span
                  className="delete"
                  onClick={() => {
                    if (confirm("Voulez vous vraiment supprimer cette entreprise")) {
                      deleteMutation.mutate(companyId!);
                    }
                  }}
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
         <EmployeesListView companyId={companyId!}/>
        </div>
      )}
    </div>
  );
};

export default CompanyView;
