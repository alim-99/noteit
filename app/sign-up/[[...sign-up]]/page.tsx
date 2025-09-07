import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
      return (
            <main className="flex items-center justify-center mt-10">
                  <SignUp />
            </main>
      );
}
