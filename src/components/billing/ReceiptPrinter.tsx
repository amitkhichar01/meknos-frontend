import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  type ComponentPropsWithoutRef,
  createContext,
  type ReactNode,
  useContext,
} from "react";
import { cn } from "../../helpers/classname-helper";

export type ReceiptPrinterStage =
  | "processing"
  | "printing"
  | "complete"
  | "failed"
  | "pending"
  | "error";

export type ReceiptFeedMotion = "smooth" | "stepped";

export type ReceiptPrinterRootProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "children"
> & {
  /** Disables all stage transitions when false. */
  animate?: boolean;
  children: ReactNode;
  /** Controls whether the paper feeds continuously or one line at a time. */
  feedMotion?: ReceiptFeedMotion;
  /** Current state of the printer. */
  stage: ReceiptPrinterStage;
};

export type ReceiptPrinterMachineProps = ComponentPropsWithoutRef<"div">;
export type ReceiptPrinterHeaderProps = ComponentPropsWithoutRef<"div">;
export type ReceiptPrinterScreenProps = ComponentPropsWithoutRef<"div">;
export type ReceiptPrinterOutputProps = ComponentPropsWithoutRef<"div">;
export type ReceiptPrinterPaperProps = ComponentPropsWithoutRef<"article">;

export type ReceiptPrinterStatusProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children"
> & {
  /** Custom status content. Defaults to a label derived from the current stage. */
  children?: ReactNode;
};

type ReceiptPrinterContextValue = {
  animate: boolean;
  feedMotion: ReceiptFeedMotion;
  shouldMove: boolean;
  stage: ReceiptPrinterStage;
};

const ReceiptPrinterContext = createContext<ReceiptPrinterContextValue | null>(
  null,
);

const easeOut = [0.23, 1, 0.32, 1] as const;
const easeInOut = [0.77, 0, 0.175, 1] as const;

const receiptToothCount = 40;
const receiptToothDepth = 4;
const receiptToothPoints = Array.from(
  { length: receiptToothCount * 2 },
  (_, index) => {
    const x = 100 - ((index + 1) * 100) / (receiptToothCount * 2);
    const y = index % 2 === 0 ? "100%" : `calc(100% - ${receiptToothDepth}px)`;
    return `${x}% ${y}`;
  },
).join(", ");

const receiptClipPath = `polygon(0 0, 100% 0, 100% calc(100% - ${receiptToothDepth}px), ${receiptToothPoints})`;

const printingTransformKeyframes = [
  "translateY(calc(-100% + 2px))",
  "translateY(-91%)",
  "translateY(-91%)",
  "translateY(-81%)",
  "translateY(-81%)",
  "translateY(-70%)",
  "translateY(-70%)",
  "translateY(-58%)",
  "translateY(-58%)",
  "translateY(-45%)",
  "translateY(-45%)",
  "translateY(-32%)",
  "translateY(-32%)",
  "translateY(-20%)",
  "translateY(-20%)",
  "translateY(-10%)",
  "translateY(-10%)",
  "translateY(-3%)",
  "translateY(-3%)",
  "translateY(0%)",
];

const printingKeyframeTimes = [
  0, 0.075, 0.105, 0.18, 0.21, 0.285, 0.315, 0.39, 0.42, 0.495, 0.525, 0.6,
  0.63, 0.705, 0.735, 0.81, 0.84, 0.915, 0.945, 1,
];

const statusLabels: Record<ReceiptPrinterStage, ReactNode> = {
  processing: "Verifying your payment...",
  printing: "Printing your receipt...",
  complete: "Payment Verified & Complete",
  failed: "Payment Failed or Cancelled",
  pending: "Payment Verification Pending",
  error: "Verification Error",
};

// Inline SVG Icon components matching phosphor styling
function CheckCircleIcon({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.707 8.707a1 1 0 00-1.414-1.414L11 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z"
      />
    </svg>
  );
}

function CircleNotchIcon({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path
        d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"
        opacity="0.3"
      />
      <path d="M12 2a10 10 0 0 1 10 10" />
    </svg>
  );
}

function XCircleIcon({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm3.707 7.293a1 1 0 00-1.414 0L12 10.586 9.707 8.293a1 1 0 00-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 101.414 1.414L12 13.414l2.293 2.293a1 1 0 001.414-1.414L13.414 12l2.293-2.293a1 1 0 000-1.414z"
      />
    </svg>
  );
}

function ClockIcon({
  size = 18,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm1 5a1 1 0 10-2 0v5a1 1 0 00.293.707l3 3a1 1 0 001.414-1.414L13 12.586V7z"
      />
    </svg>
  );
}

const machineClassName =
  "relative isolate w-full overflow-hidden rounded-[var(--printer-radius)] border border-neutral-800 bg-neutral-950 p-[var(--printer-inset)] pb-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] [--printer-inner-radius:calc(var(--printer-radius)-var(--printer-inset))] [--printer-inset:0.75rem] [--printer-radius:1.5rem] before:pointer-events-none before:absolute before:inset-0 before:z-0 before:rounded-[inherit] before:bg-[radial-gradient(#ffffff0a_1px,transparent_1px)] before:[background-size:12px_12px] before:opacity-50 before:content-['']";

function useReceiptPrinter(component: string) {
  const context = useContext(ReceiptPrinterContext);

  if (!context) {
    throw new Error(`${component} must be used inside ReceiptPrinter.Root.`);
  }

  return context;
}

function ReceiptPrinterRoot({
  "aria-label": ariaLabel = "Receipt printer",
  animate = true,
  children,
  className,
  feedMotion = "stepped",
  stage,
  ...props
}: ReceiptPrinterRootProps) {
  const shouldReduceMotion = useReducedMotion();
  const context = {
    animate,
    feedMotion,
    shouldMove: animate && !shouldReduceMotion,
    stage,
  };

  return (
    <ReceiptPrinterContext.Provider value={context}>
      <section
        aria-label={ariaLabel}
        className={cn(
          "relative isolate flex w-full max-w-md flex-col items-center mx-auto",
          className,
        )}
        data-stage={stage}
        {...props}
      >
        {children}
      </section>
    </ReceiptPrinterContext.Provider>
  );
}

function ReceiptPrinterMachine({
  children,
  className,
  ...props
}: ReceiptPrinterMachineProps) {
  return (
    <div className={cn(machineClassName, className)} {...props}>
      {children}
      {/* Bottom paper exit slot indicator */}
      <div
        aria-hidden="true"
        className="absolute inset-x-6 bottom-[var(--printer-inset)] z-40 h-2.5 rounded-[0.25rem] border border-neutral-900 bg-neutral-900 shadow-inner shadow-black"
      />
    </div>
  );
}

function ReceiptPrinterHeader({
  children,
  className,
  ...props
}: ReceiptPrinterHeaderProps) {
  return (
    <div
      className={cn(
        "relative z-10 flex h-11 items-center justify-between px-1 mb-2",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

function ReceiptPrinterScreen({
  children,
  className,
  ...props
}: ReceiptPrinterScreenProps) {
  return (
    <div
      className={cn(
        "relative z-10 isolate overflow-hidden rounded-[var(--printer-inner-radius)] border border-neutral-800 bg-neutral-900/90 p-4 text-neutral-100 shadow-inner shadow-black/80 after:pointer-events-none after:absolute after:inset-0 after:z-20 after:rounded-[inherit] after:shadow-[inset_0_0_24px_4px_rgba(0,0,0,0.7)] after:content-['']",
        className,
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}

function StatusIndicator({
  animate,
  move,
  stage,
}: {
  animate: boolean;
  move: boolean;
  stage: ReceiptPrinterStage;
}) {
  const isComplete = stage === "complete";
  const isFailed = stage === "failed" || stage === "error";
  const isPending = stage === "pending";

  return (
    <span
      aria-hidden="true"
      className="relative grid size-5 shrink-0 place-items-center"
    >
      <AnimatePresence initial={false} mode="sync">
        {isComplete ? (
          <motion.span
            animate={{ opacity: 1, transform: "scale(1)" }}
            className="col-start-1 row-start-1 grid place-items-center text-emerald-400"
            exit={{
              opacity: animate ? 0 : 1,
              transform: move ? "scale(0.96)" : "scale(1)",
            }}
            initial={{
              opacity: animate ? 0 : 1,
              transform: move ? "scale(0.94)" : "scale(1)",
            }}
            key="complete"
            transition={{ duration: animate ? 0.16 : 0, ease: easeOut }}
          >
            <CheckCircleIcon size={18} />
          </motion.span>
        ) : isFailed ? (
          <motion.span
            animate={{ opacity: 1, transform: "scale(1)" }}
            className="col-start-1 row-start-1 grid place-items-center text-rose-400"
            exit={{
              opacity: animate ? 0 : 1,
              transform: move ? "scale(0.96)" : "scale(1)",
            }}
            initial={{
              opacity: animate ? 0 : 1,
              transform: move ? "scale(0.94)" : "scale(1)",
            }}
            key="failed"
            transition={{ duration: animate ? 0.16 : 0, ease: easeOut }}
          >
            <XCircleIcon size={18} />
          </motion.span>
        ) : isPending ? (
          <motion.span
            animate={{ opacity: 1, transform: "scale(1)" }}
            className="col-start-1 row-start-1 grid place-items-center text-amber-400"
            exit={{
              opacity: animate ? 0 : 1,
              transform: move ? "scale(0.96)" : "scale(1)",
            }}
            initial={{
              opacity: animate ? 0 : 1,
              transform: move ? "scale(0.94)" : "scale(1)",
            }}
            key="pending"
            transition={{ duration: animate ? 0.16 : 0, ease: easeOut }}
          >
            <ClockIcon size={18} />
          </motion.span>
        ) : (
          <motion.span
            animate={{ opacity: 1, transform: "scale(1)" }}
            className="col-start-1 row-start-1 grid place-items-center text-zinc-400"
            exit={{
              opacity: animate ? 0 : 1,
              transform: move ? "scale(0.96)" : "scale(1)",
            }}
            initial={{
              opacity: animate ? 0 : 1,
              transform: move ? "scale(0.94)" : "scale(1)",
            }}
            key="working"
            transition={{ duration: animate ? 0.16 : 0, ease: easeOut }}
          >
            <CircleNotchIcon
              className={cn(
                animate && "animate-spin motion-reduce:animate-none",
              )}
              size={18}
            />
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

function ReceiptPrinterStatus({
  children,
  className,
  ...props
}: ReceiptPrinterStatusProps) {
  const { animate, shouldMove, stage } = useReceiptPrinter(
    "ReceiptPrinter.Status",
  );

  return (
    <div
      className={cn("flex min-w-0 items-center gap-2.5", className)}
      {...props}
    >
      <StatusIndicator animate={animate} move={shouldMove} stage={stage} />
      <div
        aria-live="polite"
        className="grid min-w-0 flex-1 items-center"
        role="status"
      >
        <AnimatePresence initial={false} mode="sync">
          <motion.div
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            className="col-start-1 row-start-1 truncate font-semibold text-xs leading-none text-zinc-300"
            exit={{
              opacity: animate ? 0 : 1,
              transform: shouldMove ? "translateY(-4px)" : "translateY(0px)",
            }}
            initial={{
              opacity: animate ? 0 : 1,
              transform: shouldMove ? "translateY(4px)" : "translateY(0px)",
            }}
            key={stage}
            transition={{ duration: animate ? 0.18 : 0, ease: easeOut }}
          >
            {children ?? statusLabels[stage]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function ReceiptPrinterPaper({
  children,
  className,
  style,
  ...props
}: ReceiptPrinterPaperProps) {
  return (
    <article
      className={cn(
        "relative z-10 min-h-80 bg-[#fbf9f4] px-6 pt-7 pb-8 font-mono text-neutral-900 shadow-2xl border-t border-neutral-300 select-text",
        className,
      )}
      style={{ clipPath: receiptClipPath, ...style }}
      {...props}
    >
      {children}
    </article>
  );
}

function ReceiptPrinterOutput({
  children,
  className,
  ...props
}: ReceiptPrinterOutputProps) {
  const { animate, feedMotion, shouldMove, stage } = useReceiptPrinter(
    "ReceiptPrinter.Output",
  );
  const isReceiptVisible = stage !== "processing";
  const shouldUseSteppedFeed =
    feedMotion === "stepped" && stage === "printing" && shouldMove;

  return (
    <div
      className={cn(
        "relative z-50 -mt-4 min-h-[32rem] h-auto w-full overflow-hidden px-4 sm:px-6 pt-2 pb-6",
        className,
      )}
      {...props}
    >
      {isReceiptVisible ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-6 -top-1 z-20 h-2 bg-neutral-950/80 blur-[6px]"
        />
      ) : null}

      <motion.div
        animate={{
          opacity: isReceiptVisible ? 1 : 0,
          transform:
            stage === "printing" && shouldMove
              ? shouldUseSteppedFeed
                ? printingTransformKeyframes
                : "translateY(0%)"
              : isReceiptVisible || !shouldMove
                ? "translateY(0%)"
                : "translateY(calc(-100% + 2px))",
        }}
        aria-hidden={
          stage !== "complete" && stage !== "failed" && stage !== "pending"
        }
        className="relative isolate before:pointer-events-none before:absolute before:inset-x-3 before:top-3 before:bottom-4 before:z-0 before:rounded-sm before:shadow-[0_12px_28px_rgba(0,0,0,0.3)] before:content-[''] after:pointer-events-none after:absolute after:right-[8%] after:bottom-0 after:left-[8%] after:z-0 after:h-3 after:translate-y-1.5 after:rounded-full after:bg-black/15 after:blur-lg after:content-['']"
        initial={false}
        transition={{
          opacity: { duration: animate ? 0.16 : 0, ease: easeOut },
          transform: {
            duration: shouldMove ? 1.75 : 0,
            ease: shouldUseSteppedFeed ? "linear" : easeInOut,
            times: shouldUseSteppedFeed ? printingKeyframeTimes : undefined,
          },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export const ReceiptPrinter = {
  Header: ReceiptPrinterHeader,
  Machine: ReceiptPrinterMachine,
  Output: ReceiptPrinterOutput,
  Paper: ReceiptPrinterPaper,
  Root: ReceiptPrinterRoot,
  Screen: ReceiptPrinterScreen,
  Status: ReceiptPrinterStatus,
};
