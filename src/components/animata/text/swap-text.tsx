import { useState } from "react";

import { cn } from "@/lib/utils";

interface SwapTextProps extends React.ComponentPropsWithoutRef<"div"> {
  /**
   * The initial text to display.
   */
  initialText: string;

  /**
   * The final text to display.
   */
  finalText: string;

  /**
   * Whether the component should toggle on hover as well as click.
   */
  supportsHover?: boolean;

  /**
   * The class name for the text.
   */
  textClassName?: string;

  /**
   * The class name for the initial text.
   */
  initialTextClassName?: string;

  /**
   * The class name for the final text.
   */
  finalTextClassName?: string;

  /**
   * Whether to disable the click interaction.
   */
  disableClick?: boolean;

  /**
   * Transition duration in ms.
   */
  durationMs?: number;

  /**
   * Controlled swapped state.
   */
  swapped?: boolean;

  /**
   * Transition delay in ms.
   */
  delayMs?: number;
}

export default function SwapText({
  initialText,
  finalText,
  className,
  supportsHover = true,
  textClassName,
  initialTextClassName,
  finalTextClassName,
  disableClick,
  durationMs = 500,
  swapped,
  delayMs = 0,
  // The rest of the props are passed to the container div.
  ...props
}: SwapTextProps) {
  const [active, setActive] = useState(false);
  const isSwapped = swapped !== undefined ? swapped : active;

  const common = "block transition-transform ease-slow whitespace-nowrap";
  const effectiveDelay = isSwapped ? delayMs : 0;
  const durationStyle = {
    transitionDuration: `${durationMs}ms`,
    transitionDelay: `${effectiveDelay}ms`,
  };

  const longWord = finalText.length > initialText.length ? finalText : null;

  return (
    <div {...props} className={cn("relative overflow-hidden text-foreground inline-block align-middle", className)}>
      <button
        type="button"
        disabled={disableClick}
        className={cn(
          "group/swap cursor-pointer select-none border-0 bg-transparent p-0 text-inherit font-inherit tracking-inherit leading-none",
          textClassName,
        )}
        onClick={() => !disableClick && setActive((current) => !current)}
      >
        <span
          style={durationStyle}
          className={cn(common, initialTextClassName, {
            "flex flex-col": true,
            "-translate-y-full": isSwapped,
            "group-hover/swap:-translate-y-full": supportsHover && swapped === undefined,
          })}
        >
          {initialText}
          {Boolean(longWord?.length) && (
            <span className="invisible h-0 whitespace-nowrap overflow-hidden">{longWord}</span>
          )}
        </span>
        <span
          style={durationStyle}
          className={cn(`${common} absolute top-full left-0 right-0`, finalTextClassName, {
            "-translate-y-full": isSwapped,
            "group-hover/swap:-translate-y-full": supportsHover && swapped === undefined,
          })}
        >
          {finalText}
        </span>
      </button>
    </div>
  );
}
