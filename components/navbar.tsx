"use client";

import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModeToggle from "@/components/mode-toggle";
import MobileSidebar from "@/components/mobile-sidebar";
import { useState } from "react";
import AddNoteDialog from "./add-note-dialog";

const font = Poppins({
  weight: "600",
  subsets: ["latin"],
});

const Navbar = () => {
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  return (
    <>
      <div className="fixed w-full z-50 flex justify-between items-center py-2 px-4 border-b border-primary/10 bg-secondary h-16">
        <div className="flex items-center">
          <MobileSidebar />
          <Link href="/">
            <h1
              className={cn(
                "hidden md:block text-xl md:text-3xl font-bold text-primary",
                font.className
              )}
            >
              AI Tutor
            </h1>
          </Link>
        </div>
        <div className="flex items-center gap-x-3">
          <ModeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
      {showAddNoteDialog && (
        <AddNoteDialog
          open={showAddNoteDialog}
          setOpen={setShowAddNoteDialog}
        />
      )}
    </>
  );
};

export default Navbar;
