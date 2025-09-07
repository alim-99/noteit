import React from 'react'
import Link from 'next/link'
import { Github, Twitter, Linkedin, GlobeIcon } from 'lucide-react'

const Footer = () => {
      return (
            <footer className="border-t py-16">
                  <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-sm text-muted-foreground">
                              {new Date().getFullYear()} Noteit. All rights reserved.
                        </div>

                        <nav className="flex items-center gap-6 text-sm">
                              <Link href="/Home" className="text-muted-foreground hover:text-foreground">Home</Link>
                              <Link href="/create-note" className="text-muted-foreground hover:text-foreground">Create-Note</Link>
                              <Link href="/dashboard" className="text-muted-foreground hover:text-foreground">Dashboard</Link>
                        </nav>

                        <div className="flex items-center gap-4">
                              <a
                                    href="https://github.com/alim-99"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="GitHub"
                                    className="text-muted-foreground hover:text-foreground"
                              >
                                    <Github className="w-5 h-5" />
                              </a>
                              <a
                                    href="https://x.com/alim16097side"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Twitter"
                                    className="text-muted-foreground hover:text-foreground"
                              >
                                    <Twitter className="w-5 h-5" />
                              </a>
                              <a
                                    href="https://www.linkedin.com/in/ali-mohamed-96a768252/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="LinkedIn"
                                    className="text-muted-foreground hover:text-foreground"
                              >
                                    <Linkedin className="w-5 h-5" />
                              </a>
                              <a
                                    href="https://ali-mohamed.netlify.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Portfolio"
                                    className="text-muted-foreground hover:text-foreground"
                              >
                                    <GlobeIcon className="w-5 h-5" />
                              </a>
                        </div>
                  </div>
            </footer>
      )
}

export default Footer
