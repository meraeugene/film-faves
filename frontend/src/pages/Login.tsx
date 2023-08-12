import InputField from "../components/InputField";
import { handleBlur } from "../utils/FormUtils";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(event, setTouched);
  };

  return (
    <div className="flex h-screen flex-col  items-center justify-center bg-dark px-6 pb-12 uppercase  text-white">
      <h1 className="mb-8 text-center font-researcher text-3xl">LOG IN</h1>
      <form action="" className="form flex w-full flex-col gap-6">
        <InputField
          onChange={(e) => setEmail(e.target.value)}
          onBlur={onBlur}
          title="Email"
          type="email"
          placeholder="(e.g. ivory@email.com)"
          isInvalid={touched.email && !email}
          value={email}
          name="email"
          error="Email is required."
        />
        <InputField
          onChange={(e) => setPassword(e.target.value)}
          onBlur={onBlur}
          title="Password"
          type="password"
          isInvalid={touched.password && !password}
          value={password}
          name="password"
          error="Password is required."
        />

        <Button
          loadingText="Uploading..."
          spinnerPlacement="start"
          type="submit"
          colorScheme="isLoading"
          variant="outline"
          className="mt-4"
        >
          Log In
        </Button>
      </form>
      <div className="mt-4 flex items-center gap-2 font-outfit normal-case text-dark lg:text-xl">
        New to FilmFaves?
        <Link to="/signup" className="text-white">
          Sign up now.
        </Link>
      </div>
    </div>
  );
};

export default Login;
