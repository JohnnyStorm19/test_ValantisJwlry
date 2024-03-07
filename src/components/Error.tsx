import { AxiosError } from "axios";

type TErrorProps = {
  errorObj: AxiosError;
  refetchOnError: () => void;
};

const Error = ({ errorObj, refetchOnError }: TErrorProps) => {
    console.log(errorObj);
  return (
    <div className="bg-backdrop">
      <h3 className="text-3xl font-bold text-white">{errorObj.message}</h3>
      <p className="text-xl font-bold text-white">{errorObj.code} with status: {errorObj.status}</p>
      <button className="error-btn" onClick={refetchOnError}>
        Повторить запрос
      </button>
    </div>
  );
};

export default Error;
