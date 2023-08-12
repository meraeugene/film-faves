import InputField from "../components/InputField";
import { handleBlur } from "../utils/FormUtils";
import { useState } from "react";
import { Button } from "@chakra-ui/react";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(event, setTouched);
  };

  return (
    <div className=" flex h-screen flex-col items-center justify-center bg-dark uppercase text-white  ">
      <h1 className="mb-8 text-center font-researcher text-3xl">SIGN UP</h1>
      <form action="" className="form flex flex-col gap-6 ">
        <InputField
          onChange={(e) => setUsername(e.target.value)}
          onBlur={onBlur}
          title="Username"
          type="text"
          placeholder="(e.g. ivory)"
          isInvalid={touched.username && !username}
          value={username}
          name="username"
          error="Username is required."
        />
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
          className="mt-2"
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
