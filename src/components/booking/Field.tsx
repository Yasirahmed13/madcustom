import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

const LABEL = "mb-2 block text-[11px] tracking-[.12em] uppercase text-bone-45";

const CONTROL =
  "w-full border bg-ink p-[14px] text-[15px] text-bone outline-none transition-colors duration-200 focus:border-red";

/** The small uppercase caption above a form control. */
export function FieldLabel({ children }: { children: React.ReactNode }) {
  return <span className={LABEL}>{children}</span>;
}

/** Inline validation message, wired to its control by id. */
export function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <span id={id} role="alert" className="text-red-bright mt-2 block text-[12.5px]">
      {message}
    </span>
  );
}

type TextFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
};

export function TextField({ label, error, id, className, ...props }: TextFieldProps) {
  const errorId = `${id}-error`;
  return (
    <label htmlFor={id} className="block">
      <FieldLabel>{label}</FieldLabel>
      <input
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(CONTROL, error ? "border-red-bright" : "border-line-14", className)}
        {...props}
      />
      <FieldError id={errorId} message={error} />
    </label>
  );
}

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
};

export function TextAreaField({
  label,
  error,
  id,
  className,
  ...props
}: TextAreaFieldProps) {
  const errorId = `${id}-error`;
  return (
    <label htmlFor={id} className="block">
      <FieldLabel>{label}</FieldLabel>
      <textarea
        id={id}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className={cn(
          CONTROL,
          "resize-y",
          error ? "border-red-bright" : "border-line-14",
          className,
        )}
        {...props}
      />
      <FieldError id={errorId} message={error} />
    </label>
  );
}

/**
 * A group of chips with its caption and, if the group is required and empty,
 * an error message.
 */
export function ChipGroup({
  label,
  error,
  errorId,
  children,
  className,
}: {
  label: string;
  error?: string;
  errorId: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div role="group" aria-labelledby={`${errorId}-label`}>
      <span id={`${errorId}-label`} className={LABEL}>
        {label}
      </span>
      <div className={cn("flex flex-wrap gap-[9px]", className)}>{children}</div>
      <FieldError id={errorId} message={error} />
    </div>
  );
}
