"use client";

import { cn } from "@/lib/utils";
import { CardStack } from "./ui/card-stack";

export function CardStackDemo() {
  return (
    <div className="h-full flex items-center justify-center w-full">
      <CardStack items={CARDS} />
    </div>
  );
}

// Small utility to highlight the content of specific section of a testimonial content
export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span
      className={cn(
        "font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-700/[0.2] dark:text-emerald-500 px-1 py-0.5",
        className
      )}
    >
      {children}
    </span>
  );
};

const CARDS = [
  {
    id: 0,
    name: "Manu Arora",
    designation: "Senior Software Engineer",
    content: (
      <p>
        The Swallet App is a game-changer for managing expenses.{" "}
        <Highlight>I've incorporated its features</Highlight> into my projects,
        and the experience has been phenomenal. The user interface is intuitive,
        and the functionality is robust.
      </p>
    ),
  },
  {
    id: 1,
    name: "Marie Curie",
    designation: "Pioneer in Radioactivity",
    content: (
      <p>
        Swallet App is truly revolutionary for anyone looking to manage their
        finances effectively. <Highlight>I highly recommend</Highlight> using
        this app to track and control your expenses seamlessly.
      </p>
    ),
  },
  {
    id: 2,
    name: "Steve Jobs",
    designation: "Visionary Innovator",
    content: (
      <p>
        Simplicity and elegance are key, and the Swallet App{" "}
        <Highlight>embodies these principles</Highlight> perfectly.
      </p>
    ),
  },
];
