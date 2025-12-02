import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
      return (
            <main className="flex items-center justify-center mt-10">
                  <SignUp
                        appearance={{
                              variables: {
                                    colorPrimary: "black",
                                    colorBackground: "#C5AAEE",
                                    colorInputBackground: "#080410",
                                    colorInputText: "#F9FAFB",
                                    colorText: "black",
                                    colorTextSecondary: "#6c6970",
                              },
                        }}
                  />
            </main>
      );
}
