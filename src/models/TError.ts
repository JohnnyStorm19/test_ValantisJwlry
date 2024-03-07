import { AxiosError } from "axios";

export type TError = {
    isError: boolean;
    errorObj: AxiosError | null;
};