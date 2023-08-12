import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";

interface InputFieldProps {
  isInvalid: boolean; // Change the type to boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
  title: string;
  placeholder?: string;
  value: string;
  name: string;
  error: string;
  type: string;
}

const InputField = ({
  isInvalid,
  onChange,
  onBlur,
  title,
  placeholder,
  value,
  name,
  error,
  type,
}: InputFieldProps) => {
  return (
    <FormControl isInvalid={isInvalid} className="input-box " isRequired>
      <FormLabel className="lg:text-2xl ">{title}:</FormLabel>
      <Input
        type={type}
        placeholder={placeholder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
        name={name}
      />
      <FormErrorMessage className="font-outfit tracking-wider">
        {error}
      </FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
