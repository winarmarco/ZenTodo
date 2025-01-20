import { signIn } from "@/lib/auth";
import { Button } from "@/components/ui/button";

export default function SignIn() {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("auth0");
      }}
    >
      <Button type="submit" variant="outline">
        Sign in
      </Button>
    </form>
  );
}
