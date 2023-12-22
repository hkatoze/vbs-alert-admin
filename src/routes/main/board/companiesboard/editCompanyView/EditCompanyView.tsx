import { FormEvent, useState, useEffect } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { ApiErrorResponse, CompanyModel, endpoint, headers } from "../../../../../constants";
import axios, { AxiosError } from "axios";
import { CiBank } from "react-icons/ci";
import SelectField from "../../../../../Components/SelectField";
import TextField from "../../../../../Components/TextField";
import FilePicker from "../../../../../Components/FilePicker";
import { ClipLoader } from "react-spinners";
import "./EditCompanyView.css";

export const EditCompanyView = () => {
  const [urlLogo, setUrlLogo] = useState<string>("");
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { companyId } = useParams();

  const fetchCompanyById = () => {
    return axios.get(`${endpoint}/api/companies/${companyId}`, {
      headers: headers,
    });
  };

  const { isLoading, isError, data } = useQuery({
    queryKey: ["company-by-id"],
    queryFn: fetchCompanyById,
  });

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const [country, setCountry] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");

  const mutation = useMutation({
    mutationFn: (companyModel: Omit<CompanyModel, "companyId">) =>
      axios
        .put(`${endpoint}/api/companies/${companyId}`, companyModel, { headers: headers })
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
    const { name, value } = event.currentTarget; // Utilisez currentTarget au lieu de target
  
   
    if (name === "companyName") {
      setCompanyName(value);
    }
    if (name === "street") {
      setStreetAddress(value);
    }
    if (name === "postalCode") {
      setPostalCode(value);
    }
    
  };

  const handleSelectChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "country") {
        setCountry(value);
      }
    if (name === "city") {
      setCity(value);
    }
  };
  

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const country: string = formData.get("country") as string;
    const companyName: string = formData.get("companyName") as string;
    const streetAddress: string = formData.get("street") as string;
    const city: string = formData.get("city") as string;
    const postalCode: string = formData.get("postalCode") as string;
    const companyLogo = urlLogo ? urlLogo : (data?.data.data.companyLogo);
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

  useEffect(() => {
    if (!isLoading && !isError && data?.data?.data) {
      setCountry(data.data.data.country);
      setCompanyName(data.data.data.companyName);
      setStreetAddress(data.data.data.streetAddress);
      setCity(data.data.data.city);
      setPostalCode(data.data.data.postalCode);
    }
  }, [isLoading, isError, data]);

  return (
    <div className="editCompanyView">
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
                    value={country}
                    onChange={handleSelectChange}
                
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
                    value={companyName}
                    onChange={handleOnChange}
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
                    value={streetAddress}
                    onChange={handleOnChange}
                    
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
                    value={city}
                    onChange={handleSelectChange}
                
                  />
                </div>
                <div className="field">
                  <span>Postal code</span>
                  <TextField
                    width={20}
                    type="text"
                    placeholder="Postal code"
                    name="postalCode"
                    value={postalCode}
                    onChange={handleOnChange}
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
                {loading ? (
                  <ClipLoader
                    color="hsl(210, 100%, 59%)"
                    loading={loading}
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
