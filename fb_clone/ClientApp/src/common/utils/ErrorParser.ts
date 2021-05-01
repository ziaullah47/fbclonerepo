import { AxiosError } from "axios";

export const axiosErrorParser = (error: AxiosError<any>): string[] => {

  let errorMessages: string[] = [];
  let errorResponse = error.response && error.response.data;

  if (errorResponse === undefined) {
    return [error + ""];
  }

  if (errorResponse.errors) {
    for (var err of errorResponse.errors) {
      errorMessages.push(err.message);
    }
  } else {
    errorMessages.push(errorResponse.detail);
  }

  return errorMessages;
};