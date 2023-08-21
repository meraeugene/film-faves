import InputField from "../components/InputField";
import { handleBlur } from "../utils/FormUtils";
import { useState, useEffect } from "react";
import {
  Button,
  useToast,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useSignup } from "../hooks/useSignup";
const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const { signup, error, isLoading } = useSignup();
  const [show, setShow] = useState(false);

  const handleClick = () => setShow(!show);

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
        duration: 6000,
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
          isInvalid={touched.email && !email}
          value={email}
          name="email"
          error="Email is required."
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
          loadingText="Creating Account..."
          spinnerPlacement="start"
          type="submit"
          colorScheme="isLoading"
          variant="outline"
          className="mt-2"
          isLoading={isLoading}
          isDisabled={isLoading}
        >
          Sign Up
        </Button>
      </form>
    </div>
  );
};

export default Signup;
