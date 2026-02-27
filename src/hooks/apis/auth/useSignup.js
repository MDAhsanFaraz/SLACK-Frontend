import { signupRequest } from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";
export const useSignup = () => {
  const {
    isPending,
    isSuccess,
    error,
    mutate: signupMutation,
  } = useMutation({
    mutationFn: signupRequest,
    onSuccess: (data) => console.log("User Successfully signedUp", data),
    onError: (error) => console.log("Failed to sign up", error),
  });
  return { isPending, isSuccess, error, signupMutation };
};
