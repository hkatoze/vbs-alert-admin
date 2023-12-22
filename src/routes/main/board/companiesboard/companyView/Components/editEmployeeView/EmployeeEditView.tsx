import { FormEvent, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios, { AxiosError } from "axios";
import { CiBank } from "react-icons/ci";
import { ClipLoader } from "react-spinners";
import "./EmployeeEditView.css";

import {
  ApiErrorResponse,
  EmployeeModel,
  endpoint,
  headers,
} from "../../../../../../../constants";
import FilePicker from "../../../../../../../Components/FilePicker";
import TextField from "../../../../../../../Components/TextField";
import SelectField from "../../../../../../../Components/SelectField";

export const EditEmployeeView = () => {
  const [urlLogo, setUrlLogo] = useState<string>("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { employeeId, companyId } = useParams();

  const fetchEmployeeById = () => {
    return axios.get(`${endpoint}/api/employees/${employeeId}`, {
      headers: headers,
    });
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["employee-by-id"],
    queryFn: fetchEmployeeById,
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [firstname, setFirstname] = useState<string>("");
  const [job, setJob] = useState<string>("");
  const [lastname, setLastname] = useState<string>("");
  const [phone_number, setPhoneNumber] = useState<string>("");
  const [role, setRole] = useState<string>("");

  const mutation = useMutation({
    mutationFn: (employeeModel: Omit<EmployeeModel, "employeeId">) =>
      axios
        .put(`${endpoint}/api/employees/${employeeId}`, employeeModel, {
          headers: headers,
        })
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries;
      setLoading(false);
      navigate(-1);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      setLoading(false);
      setErrorMessage(error.response?.data?.message ?? "Erreur inconnue");
    },
  });

  const handleOnChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;

    if (name === "lastname") {
      setLastname(value);
    }
    if (name === "firstname") {
      setFirstname(value);
    }
    if (name === "job") {
      setJob(value);
    }
    if (name === "phone_number") {
      setPhoneNumber(value);
    }
  };

  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (
    event
  ) => {
    const { name, value } = event.currentTarget;
    if (name === "role") {
      setRole(value);
    }
     
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const role: string = formData.get("role") as string;
    const firstname: string = formData.get("firstname") as string;
    const lastname: string = formData.get("lastname") as string;
    const job: string = formData.get("job") as string;
    const phone_number: string = formData.get("phone_number") as string;
    const password: string = data?.data.data.password;
    const profilUrl = urlLogo ? urlLogo : data?.data.data.companyLogo;

    const newEmployee = {
      companyId: companyId,
      firstname: firstname,
      job: job,
      lastname: lastname,
      password: password,
      phone_number: phone_number,
      role: role,
      profilUrl: profilUrl,
    };
    mutation.mutate(newEmployee);
    form.reset();
  };

  useEffect(() => {
    if (!isLoading && !isError && data?.data?.data) {
      setLastname(data.data.data.lastname);
      setFirstname(data.data.data.firstname);
      setRole(data.data.data.role);
      setPhoneNumber(data.data.data.phone_number);
      setJob(data.data.data.job);
    }
  }, [isLoading, isError, data]);

  return (
    <div className="editEmployeeView">
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
      <div className="bottomSection">
        <div className="title">
          <div>
            <CiBank color="white" size="25px" />
          </div>
          <h2>Employee Information</h2>
        </div>
        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="fields">
              <div className="field">
                <span>
                  Role <div>*</div>
                </span>
                <SelectField
                  name="role"
                  width={20}
                  options={["USER", "ADMIN"]}
                  required={true}
                  onChange={handleSelectChange}
                  value={role}
                />
              </div>
              <div className="field">
                <span>
                  Firstname <div>*</div>
                </span>
                <TextField
                  width={20}
                  type="text"
                  placeholder="Enter firstname"
                  name="firstname"
                  required={true}
                  onChange={handleOnChange}
                  value={firstname}
                />
              </div>
              <div className="field">
                <span>
                  Lastname <div>*</div>
                </span>
                <TextField
                  width={20}
                  type="text"
                  placeholder="Enter lastname"
                  name="lastname"
                  required={true}
                  onChange={handleOnChange}
                  value={lastname}
                />
              </div>
              <div className="field">
                <span>
                  Job <div>*</div>
                </span>
                <TextField
                  width={20}
                  type="text"
                  placeholder="Enter job title"
                  name="job"
                  required={true}
                  onChange={handleOnChange}
                  value={job}
                />
              </div>
              <div className="field">
                <span>
                  Phone <div>*</div>
                </span>
                <TextField
                  width={20}
                  type="text"
                  placeholder="Enter a phone number"
                  name="phone_number"
                  required={true}
                  onChange={handleOnChange}
                  value={phone_number}
                />
              </div>
              <div className="field">
                <span>
                  Profil<div>*</div>
                </span>
                <FilePicker
                  setUrl={setUrlLogo}
                  name="profil"
                  file="image"
                  width={20}
                />
              </div>
            </div>

            <div className="btnSection">
              {loading ? (
                <ClipLoader
                  color="hsl(210, 100%, 59%)"
                  loading={isLoading}
                  aria-label="Loading Spinner"
                  speedMultiplier={0.8}
                  data-testid="loader"
                />
              ) : (
                <button disabled={mutation.isLoading} value="submit">
                  Edit
                </button>
              )}

              <span> {errorMessage && errorMessage}</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
