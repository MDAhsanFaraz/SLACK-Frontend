import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export const Notfound = () => {
  const navigate = useNavigate();
  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-gray-100">
      <Card className="text-center shadow-lg max-w-lg">
        <CardHeader>
          <CardTitle>404 Not Found</CardTitle>
          <p className="text-gray-600">
            The page you are looking for does not exist.
          </p>
        </CardHeader>
        <CardContent>
          <img
            src="https://img.freepik.com/premium-vector/file-folder-mascot-character-design-vector_166742-4413.jpg?semt=ais_rp_progressive&w=740&q=80"
            alt="Mascot"
            className="w-48 h-48 mx-auto"
          />
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="mt-4"
          >
            Go Back
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
