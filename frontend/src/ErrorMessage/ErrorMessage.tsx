type IErrorMessage = {
  error: {
    hasError: boolean;
    message: string;
    errorObject: {};
  };
};

export default function ErrorMessage(props: IErrorMessage) {
  return <p style={{ color: "red" }}>{props.error.message}</p>;
}
