import { useMutation, useQueryClient } from "react-query";
import "./AddEmployeeView.css";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { CiBank } from "react-icons/ci";

import { useNavigate, useParams } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import {
  ApiErrorResponse,
  EmployeeModel,
  endpoint,
  headers,
} from "../../../../../../constants";
import SelectField from "../../../../../../Components/SelectField";
import TextField from "../../../../../../Components/TextField";
import FilePicker from "../../../../../../Components/FilePicker";

const AddEmployeeView = () => {
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [urlLogo, setUrlLogo] = useState<string>("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
 
  const mutation = useMutation({
    mutationFn: (employeeModel: Omit<EmployeeModel, "employeeId">) =>
      axios
        .post(`${endpoint}/api/employees`, employeeModel, { headers: headers })
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries();
      setIsLoading(false);
      navigate(-1);
    },
    onError: (error: AxiosError<ApiErrorResponse>) => {
      setIsLoading(false);
      setErrorMessage(error.response?.data?.message ?? "Erreur inconnue");
    },
  });
  const { companyId } = useParams();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const role: string = formData.get("role") as string;
    const firstname: string = formData.get("firstname") as string;
    const lastname: string = formData.get("lastname") as string;
    const job: string = formData.get("job") as string;
    const phone_number: string = formData.get("phone_number") as string;
    const password: string = "Happy!2023";
    
    const profilUrl = urlLogo;

   
    const newEmployee = {
        companyId: companyId,
        firstname: firstname,
        job: job,
        lastname: lastname,
        password: password,
        phone_number: phone_number,
        role: role,
        profilUrl: profilUrl
    };

    mutation.mutate(newEmployee);
     
  };

  return (
    <div className="addEmployeeView">
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
        {" "}
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
              {isLoading ? (
                <ClipLoader
                  color="hsl(210, 100%, 59%)"
                  loading={isLoading}
                  aria-label="Loading Spinner"
                  speedMultiplier={0.8}
                  data-testid="loader"
                />
              ) : (
                <button disabled={mutation.isLoading} value="submit">
                  Add
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

export default AddEmployeeView;
