import { signInRequest } from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const useSignin = () => {
  const {
    isSuccess,
    isPending,
    error,
    mutateAsync: signinMutation,
  } = useMutation({
    mutationFn: signInRequest,
    onSuccess: (data) => {
      console.log("Successfully signed in", data);
      toast.success("Successfully signed in", {
        description: "You will be redirected to the Home page in a few seconds",
      });
    },
    onError: (error) => {
      console.log("Failed to sign in", error);
      toast.error("Failed to sign in", {
        description: error.message,
        variant: "destructive",
      });
    },
  });
  return {
    isPending,
    error,
    isSuccess,
    signinMutation,
  };
};
