import { SignIn } from "@clerk/nextjs"

const page = () => {
      return (
            <main className="flex items-center justify-center mt-10">
                  <SignIn />
            </main>
      )
}

export default page