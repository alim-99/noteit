"use client"

import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import { ModeToggle } from './mode-toogle'
import { SignedIn, UserButton } from '@clerk/nextjs'

const NavBar = () => {
      const [open, setOpen] = useState(false);

      return (
            <nav className="bg-surface border-b border-border text-foreground">
                  <div className="flex items-center justify-between py-4 px-5 max-w-7xl mx-auto">
                        <div className='flex items-center gap-2'>
                              <Image className="select-none brightness-20 dark:invert" src="/notes-svgrepo-com.svg" alt='logo' width={40} height={40} />
                              <h1 className='font-bold text-2xl tracking-tight'>Noteit</h1>
                        </div>

                        {/* Desktop links */}
                        <div className='hidden md:flex items-center gap-6'>
                              <Link className="px-3 py-2 rounded-md transition-colors hover:bg-accent dark:hover:bg-[var(--accent-subtle)]" href="/">Home</Link>
                              <Link className="px-3 py-2 rounded-md transition-colors hover:bg-accent dark:hover:bg-[var(--accent-subtle)]" href="/create-note">Create Note</Link>
                              <Link className="px-3 py-2 rounded-md transition-colors hover:bg-accent dark:hover:bg-[var(--accent-subtle)]" href="/dashboard">Dashboard</Link>
                              <ModeToggle />
                              <SignedIn>
                                    <UserButton />
                              </SignedIn>
                        </div>

                        {/* Mobile menu button */}
                        <button
                              className="md:hidden inline-flex items-center justify-center rounded-md p-2 hover:bg-accent dark:hover:bg-[var(--accent-subtle)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                              aria-label="Toggle menu"
                              aria-expanded={open}
                              onClick={() => setOpen(!open)}
                        >
                              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    {open ? (
                                          <path d="M18 6L6 18M6 6l12 12" />
                                    ) : (
                                          <>
                                                <path d="M3 6h18" />
                                                <path d="M3 12h18" />
                                                <path d="M3 18h18" />
                                          </>
                                    )}
                              </svg>
                        </button>
                  </div>

                  {/* Mobile dropdown */}
                  {open && (
                        <div className="md:hidden px-5 pb-4 space-y-1 border-t border-border bg-surface">
                              <Link onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md transition-colors hover:bg-accent dark:hover:bg-[var(--accent-subtle)]" href="/">Home</Link>
                              <Link onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md transition-colors hover:bg-accent dark:hover:bg-[var(--accent-subtle)]" href="/dashboard">Dashboard</Link>
                              <Link onClick={() => setOpen(false)} className="block px-3 py-2 rounded-md transition-colors hover:bg-accent dark:hover:bg-[var(--accent-subtle)]" href="/create-note">Create Note</Link>
                              <div className="px-3 pt-1">
                                    <ModeToggle />
                                    <div className='flex flex-col pt-2'>
                                    <SignedIn>
                                          <UserButton />
                                    </SignedIn>
                                    </div>
                              </div>
                        </div>
                  )}
            </nav>
      )
}

export default NavBar
