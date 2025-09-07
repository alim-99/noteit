import { Card, CardContent } from "@/components/ui/card";
import { UserPlus, FileText, Sparkles } from "lucide-react";

export default function HowItWorksSection() {
      const steps = [
            {
                  icon: <UserPlus className="w-8 h-8 text-blue-500" />,
                  title: "Sign Up",
                  description: "Create your free account in seconds.",
            },
            {
                  icon: <FileText className="w-8 h-8 text-green-500" />,
                  title: "Write Your Notes",
                  description: "Add titles, content, and tags to keep everything organized.",
            },
            {
                  icon: <Sparkles className="w-8 h-8 text-purple-500" />,
                  title: "Generate AI Summary",
                  description: "Click one button and get an instant summary of your note.",
            },
      ];

      return (
            <section className="py-16 bg-background text-foreground">
                  <div className="max-w-6xl mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold mb-4">How It Works</h2>
                        <p className="text-muted-foreground mb-10">
                              Get started in 3 simple steps and make your note-taking smarter.
                        </p>

                        <div className="grid gap-6 sm:grid-cols-3">
                              {steps.map((step, index) => (
                                    <Card key={index} className="border rounded-lg bg-gray-400 dark:bg-card backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 ease-out hover:ring-1 hover:ring-primary/30">
                                          <CardContent className="flex flex-col items-center p-6 text-center">
                                                <div className="bg-muted rounded-full p-4 mb-4">
                                                      {step.icon}
                                                </div>
                                                <h3 className="text-lg font-semibold">{step.title}</h3>
                                                <p className="text-sm text-muted-foreground mt-2">{step.description}</p>
                                          </CardContent>
                                    </Card>
                              ))}
                        </div>
                  </div>
            </section>
      );
}
