import { useMutation, useQueryClient } from "react-query";
import "./AddCompanyView.css";
import { CompanyModel, endpoint, headers } from "../../../../../constants";
import axios, { AxiosError } from "axios";
import { FormEvent, useState } from "react";
import { CiBank } from "react-icons/ci";
import SelectField from "../../../../../Components/SelectField";
import TextField from "../../../../../Components/TextField";
import FilePicker from "../../../../../Components/FilePicker";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";

const AddCompanyView = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [urlLogo, setUrlLogo] = useState<string>("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const mutation = useMutation({
    mutationFn: (companyModel: Omit<CompanyModel, "companyId">) =>
      axios
        .post(`${endpoint}/api/companies`, companyModel, { headers: headers })
        .then((res) => res.data),
    onSuccess: (data) => {
      queryClient.invalidateQueries;
      setIsLoading(false);
      navigate(-1);
    },
    onError: (error: AxiosError) => {
      setIsLoading(false);
      setErrorMessage(error.response?.data?.message);
    },
  });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const country: string = formData.get("country") as string;
    const companyName: string = formData.get("companyName") as string;
    const streetAddress: string = formData.get("street") as string;
    const city: string = formData.get("city") as string;
    const postalCode: string = formData.get("postalCode") as string;
    const companyLogo = urlLogo;
    const newCompany = {
      country: country,
      companyLogo: companyLogo,
      companyName: companyName,
      streetAddress: streetAddress,
      city: city,
      postalCode: postalCode,
    };

    mutation.mutate(newCompany);
    form.reset();
  };

  return (
    <div className="addCompanyView">
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
          <h2>Company information</h2>
        </div>
        <div className="body">
          <form onSubmit={handleSubmit}>
            <div className="fields">
              <div className="field">
                <span>
                  Country <div>*</div>
                </span>
                <SelectField
                  name="country"
                  width={20}
                  options={["Burkina Faso"]}
                  required={true}
                />
              </div>
              <div className="field">
                <span>
                  Company name <div>*</div>
                </span>
                <TextField
                  width={20}
                  type="text"
                  placeholder="Company name"
                  name="companyName"
                  required={true}
                />
              </div>
              <div className="field">
                <span>Street address</span>
                <TextField
                  width={20}
                  type="text"
                  placeholder="Street address"
                  name="street"
                  required={true}
                />
              </div>
              <div className="field">
                <span>
                  City<div>*</div>
                </span>
                <SelectField
                  name="city"
                  width={20}
                  options={[
                    "Dédougou",
                    "Banfora",
                    "Ouagadougou",
                    "Tenkodogo",
                    "Kaya",
                    "Koudougou",
                    "Manga",
                    "Fada N’gourma",
                    "Bobo-Dioulasso",
                    "Ouahigouya",
                    "Ziniaré",
                    "Dori",
                    "Gaoua",
                  ]}
                  required={true}
                />
              </div>
              <div className="field">
                <span>Postal code</span>
                <TextField
                  width={20}
                  type="text"
                  placeholder="Postal code"
                  name="postalCode"
                />
              </div>
              <div className="field">
                <span>
                  Company logo<div>*</div>
                </span>
                <FilePicker
                  setUrl={setUrlLogo}
                  name="companyLogo"
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

export default AddCompanyView;
