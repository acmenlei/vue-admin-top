import { Message } from "element-ui";

export function errorMessage(message) {
  return Message({
    message,
    type: "danger",
  });
}

export function successMessage(message) {
  return Message({
    message,
    type: "success",
  });
}
