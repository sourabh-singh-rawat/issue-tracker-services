import { Input } from "antd";
import { PasswordProps } from "antd/es/input";

export const PasswordInput = (props: PasswordProps) => {
  return <Input.Password {...props} />;
};
