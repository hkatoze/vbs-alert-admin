import axios from "axios";
import Button from "../../../../../Components/Button";
import Header from "../../../../../Components/Header";
import ERROR_ICON from "../../../../../assets/errorIcon.png";
import EMPTY_ICON from "../../../../../assets/empty-icon.png";
import "./CompaniesListView.css";
import { CompanyModel, endpoint, headers } from "../../../../../constants";
import { useQuery } from "react-query";
import { ClipLoader } from "react-spinners";
import CompanyItem from "./Components/CompanyItem";
import { Link } from "react-router-dom";
const CompaniesListView = () => {
  const fetchAllCompanies = () => {
    return axios.get(`${endpoint}/api/companies`, { headers: headers });
  };
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-companies-list"],
    queryFn: fetchAllCompanies,
  });
  return (
    <div className="companiesListView">
      <Header
        title="COMPANIES"
        subtitle="Consult the complete list of all registered companies"
      />
      <div className="addCompanyBtnSection">
        <div></div>
        <Link to="/mainpage/companiesboard/addCompany">
          <Button type="button" onClick={() => {}}>
            Add Company
          </Button>
        </Link>
      </div>
      <div className="companiesListSection">
        <div className="companiesList">
          {data?.data.data.map((company: CompanyModel) => (
            <CompanyItem
              key={company.companyId}
              name={company.companyName}
              logo={company.companyLogo}
              nbrEmployees={0}
              link={`/mainpage/companiesboard/companiesListView/${company.companyId}`}
            />
          ))}
        </div>
        <div className="loadingSection">
          {isLoading && (
            <ClipLoader
              color="hsl(210, 100%, 59%)"
              loading={isLoading}
              aria-label="Loading Spinner"
              speedMultiplier={0.8}
              data-testid="loader"
            />
          )}

          {isError && (
            <div className="errorIcon">
              <h2 className="error">Something went wrong</h2>
              <img src={ERROR_ICON} alt="" />
            </div>
          )}

          {data?.data.data.length == 0 && (
            <div className="emptyIcon">
              <h2 className="empty">No registered companies</h2>
              <img src={EMPTY_ICON} alt="" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompaniesListView;
