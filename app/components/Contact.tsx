"use client";

import { useActionState } from "react";
import { submitContact, type ContactState } from "../actions/contact";
import styles from "./Contact.module.scss";

const initialState: ContactState = { status: "idle", message: "" };

export default function Contact() {
  const [state, formAction, pending] = useActionState(submitContact, initialState);

  return (
    <section id="contact" className={styles.contact}>
      <div className="container">
        <header className={styles.header}>
          <span className={styles.tag}>&lt;contact /&gt;</span>
          <h2 className={styles.title}>Get in touch</h2>
          <p className={styles.subtitle}>
            Have a project or an opportunity in mind? Send me a message and I&apos;ll get back to
            you.
          </p>
        </header>

        <form className={styles.form} action={formAction}>
          <div className={styles.row}>
            <label className={styles.field}>
              <span className={styles.label}>Name</span>
              <input
                className={styles.input}
                name="name"
                type="text"
                required
                maxLength={100}
                placeholder="Your name"
                autoComplete="name"
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Email</span>
              <input
                className={styles.input}
                name="email"
                type="email"
                required
                maxLength={200}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </label>
          </div>

          <label className={styles.field}>
            <span className={styles.label}>Message</span>
            <textarea
              className={styles.textarea}
              name="message"
              required
              maxLength={4000}
              rows={6}
              placeholder="Tell me a bit about what you have in mind..."
            />
          </label>

          {/* Honeypot — hidden from users, catches naive bots. */}
          <div className={styles.honeypot} aria-hidden="true">
            <label>
              Company
              <input name="company" type="text" tabIndex={-1} autoComplete="off" />
            </label>
          </div>

          <div className={styles.footer}>
            <button type="submit" className={styles.submit} disabled={pending}>
              {pending ? "Sending…" : "Send message"}
            </button>

            {state.status !== "idle" && (
              <p className={styles.status} data-status={state.status} role="status">
                {state.message}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
