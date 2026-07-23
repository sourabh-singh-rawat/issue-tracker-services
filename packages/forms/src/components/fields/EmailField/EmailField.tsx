import { Form, FormItemProps, Input, InputProps } from "antd";

interface EmailFieldProps<T> extends FormItemProps<T> {
  input?: InputProps;
}

export const EmailField = <T,>(props: EmailFieldProps<T>) => {
  const { input, rules = [], ...rest } = props;

  return (
    <Form.Item
      rules={[{ type: "email", message: "Please enter a valid email!" }, ...rules]}
      {...rest}
    >
      <Input placeholder="Please enter your email" {...input} />
    </Form.Item>
  );
};
