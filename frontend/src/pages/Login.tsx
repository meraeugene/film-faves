import InputField from "../components/InputField";
import { handleBlur } from "../utils/FormUtils";
import { useEffect, useState } from "react";
import {
  Button,
  useToast,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { login, error, isLoading } = useLogin();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

  const toast = useToast();

  const onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    handleBlur(event, setTouched);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await login({ username, password });
  };

  useEffect(() => {
    if (error) {
      toast({
        title: "Login Error",
        description: error,
        status: "error",
        duration: 3500,
        isClosable: true,
        position: "top",
      });
    }
  }, [error]);

  return (
    <div className="flex h-screen  flex-col  items-center justify-center bg-dark px-6  uppercase  text-white">
      <h1 className="mb-8 text-center font-researcher text-3xl">LOG IN</h1>
      <form onSubmit={handleSubmit} className="form flex w-full flex-col gap-6">
        <InputField
          onChange={(e) => setUsername(e.target.value)}
          onBlur={onBlur}
          title="Username"
          type="text"
          isInvalid={touched.username && !username}
          value={username}
          name="username"
          error="Username is required."
        />

        <FormControl
          isInvalid={touched.password && !password}
          className="input-box "
          isRequired
        >
          <FormLabel className="lg:text-2xl ">Password:</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              onBlur={onBlur}
              value={password}
              name="password"
            />
            <InputRightElement width="4.5rem">
              <button type="button" className="text-sm " onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </button>
            </InputRightElement>
          </InputGroup>
          <FormErrorMessage className="font-outfit tracking-wider">
            Password is required.
          </FormErrorMessage>
        </FormControl>

        <Button
          loadingText="Logging in..."
          spinnerPlacement="start"
          type="submit"
          colorScheme="isLoading"
          variant="outline"
          className="mt-4"
          isDisabled={isLoading}
          isLoading={isLoading}
        >
          Log In
        </Button>
      </form>
      <div className="mt-4 flex items-center gap-2 font-outfit normal-case text-dark lg:text-xl">
        New to FilmFaves?
        <Link to="/auth/signup" className="text-white">
          Sign up now.
        </Link>
      </div>
    </div>
  );
};

export default Login;
