import { signupRequest } from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
export const useSignup = () => {
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: signupMutation,
  } = useMutation({
    mutationFn: signupRequest,
    onSuccess: (data) => {
      console.log("User Successfully signedUp", data);
      toast.success("Successfully signed up", {
        description:
          "You will be redirected to the login page in a few seconds",
      });
    },
    onError: (error) => {
      console.log("Failed to sign up", error);
      toast.error("Failed to sign up", {
        description: error.message,
        variant: "destructive",
      });
    },
  });
  return { isPending, isSuccess, error, signupMutation };
};
