import { FormEvent, useState } from "react";
import LOGO from "../../assets/logo.png";
import "./Register.css";
import TextField from "../../Components/TextField";
import SelectField from "../../Components/SelectField";
import Button from "../../Components/Button";
import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { Admin, endpoint } from "../../constants";
import axios from "axios";
import { ClipLoader } from "react-spinners";

const Register = () => {
  const mutation = useMutation({
    mutationFn: (admin: Omit<Admin, "id">) =>
      axios
        .post(`${endpoint}/api/signupToApi`, admin)
        .then((response) => response.data),
    onSuccess: (data) => {
      setIsLoading(false);
      console.log(data);
    },
    onError: (error) => {
      setIsLoading(false);
      console.log(error);
    },
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);
    const email: string = formData.get("email") as string;
    const username: string = formData.get("username") as string;
    const role: string = formData.get("role") as string;
    const password: string = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword");
    if (password === confirmPassword) {
      setIsLoading(true);
      const admin: Admin = {
        emailAddress: email,
        username: username,
        role: role,
        password: password,
      } as Admin;

      mutation.mutate(admin);
      form.reset();
    } else {
    }
  };

  return (
    <div className="registerpage flex">
      <div className="logo flex">
        <img src={LOGO} alt="" />
        <span>VBSAlert</span>
      </div>
      <h2>Create an account to join the family</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          width={20}
          type="email"
          placeholder="Email"
          name="email"
          required={true}
        />

        <TextField
          width={20}
          type="text"
          placeholder="Username"
          name="username"
          required={true}
        />
        <SelectField
          name="role"
          width={20}
          options={["Developper", "IT consultant", "Project Manager"]}
          required={true}
        />
        <TextField
          width={20}
          type="password"
          placeholder="Password"
          name="password"
          required={true}
        />
        <TextField
          width={20}
          type="password"
          placeholder="Confirm password"
          name="confirmPassword"
          required={true}
        />

        {isLoading ? (
          <ClipLoader
            color="hsl(210, 100%, 59%)"
            loading={isLoading}
            aria-label="Loading Spinner"
            speedMultiplier={0.8}
            data-testid="loader"
          />
        ) : (
          <Button width={20} type="submit">
            Register
          </Button>
        )}

        <span className="alreadyAccountSection">
          already have an account? <Link to="/login">Login</Link>
        </span>
      </form>
    </div>
  );
};

export default Register;
