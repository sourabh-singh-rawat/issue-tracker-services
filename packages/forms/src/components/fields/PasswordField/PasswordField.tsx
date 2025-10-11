import { Form, FormItemProps } from "antd";
import { PasswordProps } from "antd/es/input";
import { PasswordInput } from "../../inputs/PasswordInput/PasswordInput";

interface PasswordFieldProps<T> extends FormItemProps<T> {
  input?: PasswordProps;
}

export const PasswordField = <T,>(props: PasswordFieldProps<T>) => {
  return (
    <Form.Item {...props}>
      <PasswordInput placeholder="Enter your password" {...props.input} />
    </Form.Item>
  );
};
