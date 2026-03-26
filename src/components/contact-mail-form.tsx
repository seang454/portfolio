"use client";

import { FormEvent, useState } from "react";
import { Mail, Send } from "lucide-react";
import { ShineBorder } from "@/components/ui/shine-border";
import { Button } from "@/components/ui/button";

type ContactCopy = {
  title: string;
  description: string;
  name: string;
  email: string;
  message: string;
  submit: string;
  note: string;
};

export default function ContactMailForm({ copy }: { copy: ContactCopy }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subject = encodeURIComponent(
      `Portfolio inquiry from ${name || "a visitor"}`
    );
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:pengseangsim210@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-[var(--card)] p-6 shadow-[0_20px_70px_rgba(0,0,0,0.14)] backdrop-blur-xl sm:p-7">
      <ShineBorder
        borderWidth={1.5}
        duration={10}
        shineColor={["#ff8b5d", "#54c6b7", "#89a7ff"]}
      />

      <div className="relative z-10">
        <div className="mb-6 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent-strong)]">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-2xl font-semibold tracking-[-0.04em] text-foreground">
              {copy.title}
            </h3>
            <p className="mt-1 text-sm leading-6 text-[var(--muted)]">
              {copy.description}
            </p>
          </div>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">
              {copy.name}
            </span>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className="input-shell"
              placeholder={copy.name}
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">
              {copy.email}
            </span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="input-shell"
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-foreground">
              {copy.message}
            </span>
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              className="input-shell min-h-32 resize-none"
              placeholder={copy.message}
              required
            />
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs leading-6 text-[var(--muted)]">{copy.note}</p>
            <Button
              type="submit"
              className="h-11 rounded-full bg-[var(--accent-strong)] px-5 text-[var(--accent-contrast)] hover:opacity-90"
            >
              {copy.submit}
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
