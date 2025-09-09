import { Card, CardContent } from "@/components/ui/card";
import { Brain, PenTool, Notebook , Shield } from "lucide-react";

export default function FeatureSection() {
      const features = [
            {
                  icon: <PenTool className="w-6 h-6 text-blue-500" />,
                  title: "Create Notes Easily",
                  description: "Write and organize your thoughts with tags and categories.",
            },
            {
                  icon: <Brain className="w-6 h-6 text-green-500" />,
                  title: "AI-Powered Summaries",
                  description: "Generate instant summaries for your notes with one click.",
            },
            {
                  icon: <Notebook className="w-6 h-6 text-purple-500" />,
                  title: "Full Note Display",
                  description: "Click the notes card to see a full display of the note.",
            },
            {
                  icon: <Shield className="w-6 h-6 text-red-500" />,
                  title: "Secure & Private",
                  description: "Your notes are safe and encrypted.",
            },
      ];

      return (
            <section className="py-16 bg-background text-foreground">
                  <div className="max-w-6xl mx-auto px-6 text-center">
                        <h2 className="text-3xl font-bold mb-4">Why Choose Our App?</h2>
                        <p className="text-muted-foreground mb-10">
                              Organize, summarize, and secure your notes like never before.
                        </p>

                        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                              {features.map((feature, index) => (
                                    <Card key={index} className="border rounded-lg bg-gray-400 dark:bg-card backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300 ease-out hover:ring-1 hover:ring-primary/30">
                                          <CardContent className="flex flex-col items-center p-6 text-center">
                                                {feature.icon}
                                                <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                                                <p className="text-sm text-muted-foreground mt-2">
                                                      {feature.description}
                                                </p>
                                          </CardContent>
                                    </Card>
                              ))}
                        </div>
                  </div>
            </section>
      );
}
