 
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import { useMutation, useQuery, useQueryClient } from "react-query";
import { ClipLoader } from "react-spinners";
import { endpoint, headers } from "../../../../../../constants";
import "./EmployeeView.css";
const EmployeeView = () => {
  const navigate = useNavigate();
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
    onSuccess: () => {
      queryClient.invalidateQueries;
      navigate(-1);
    },
  });
  const { employeeId } = useParams();

  const fetchEmployeeById = () => {
    return axios.get(`${endpoint}/api/employees/${employeeId}`, {
      headers: headers,
    });
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["employee-by-id"],
    queryFn: fetchEmployeeById,
  });
 
  return (
    <div className="employeeView">
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
              <h2>{data?.data.data.lastname+" "+data?.data.data.firstname}</h2>
            </div>
            <div className="content">
              <div className="profil">
                <div className="logo">
                  <img src={data?.data.data.profilUrl} alt="company logo" />
                </div>
              </div>

              <div className="employee">
                <div>
                  <h3>Firstname:</h3>
                  <span>{data?.data.data.firstname}</span>
                </div>
                <div>
                  <h3>Lastname:</h3>
                  <span>{data?.data.data.lastname}</span>
                </div>
                <div>
                  <h3>Phone:</h3>
                  <span>{data?.data.data.phone_number}</span>
                </div>
                <div>
                  <h3>Job:</h3>
                  <span>{data?.data.data.job}</span>
                </div>
                <div>
                  <h3>Role:</h3>
                  <span>{data?.data.data.role}</span>
                </div>
                <div>
                  <h3>Last activity: </h3>
                  <span>14/04/2021</span>
                </div>
              </div>

              <div className="actionsBlock">
                <span className="edit">
                  <Link
                    to={`/mainpage/companiesboard/editEmployee/${data?.data.data.companyId}/${employeeId}`}
                  >
                    Edit
                  </Link>
                </span>
                <span
                  className="delete"
                  onClick={() => {
                    if (
                      confirm("Voulez vous vraiment supprimer l'employée "+data?.data.data.lastname+" "+data?.data.data.firstname+"?" )
                    ) {
                      deleteMutation.mutate(employeeId!);
                    }
                  }}
                >
                  Delete
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeView;
