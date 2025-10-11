import { FormItemProps, Input, InputProps } from "antd";

interface TextFieldProps<T> extends FormItemProps<T> {
  input?: InputProps;
}

export const TextField = <T,>(props: TextFieldProps<T>) => {
  return <Input {...props.input} />;
};
