import InputField from "../components/InputField";
import { handleBlur } from "../utils/FormUtils";
import { useState, useEffect } from "react";
import { Button, useToast } from "@chakra-ui/react";
import { useSignup } from "../hooks/useSignup";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { signup, error, isLoading } = useSignup();

  const toast = useToast();

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(event, setTouched);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await signup({ username, email, password });
  };

  // useeffect because error is not available yet

  useEffect(() => {
    if (error) {
      toast({
        title: "Sign-Up Error",
        description: error,
        status: "error",
        duration: 4500,
        isClosable: true,
        position: "top",
      });
    }
  }, [error]);

  return (
    <div className=" flex h-screen flex-col items-center justify-center bg-dark px-6 uppercase text-white ">
      <h1 className="mb-8 text-center font-researcher text-3xl">SIGN UP</h1>
      <form onSubmit={handleSubmit} className="form flex flex-col gap-6 ">
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
          isDisabled={isLoading}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
