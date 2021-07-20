import { Message } from "element-ui";

export function errorMessage(message) {
  return Message({
    message,
    type: "error",
  });
}

export function successMessage(message) {
  return Message({
    message,
    type: "success",
  });
}
