import { css, cx } from "emotion";
import {
  unstable_TooltipProps,
  unstable_TooltipOptions
} from "reakit/Tooltip/Tooltip";
import { useFade } from "reakit-system-palette/utils/fade";
import { useBoxProps as usePaletteBoxProps } from "reakit-system-palette/Box";
import { BootstrapBoxOptions } from "./Box";

export type BootstrapTooltipOptions = BootstrapBoxOptions &
  unstable_TooltipOptions;

export function useTooltipOptions({
  unstable_system: { palette = "foreground", fill = "opaque", ...system } = {},
  ...options
}: BootstrapTooltipOptions): BootstrapTooltipOptions {
  return { unstable_system: { palette, fill, ...system }, ...options };
}

export function useTooltipProps(
  { unstable_system }: BootstrapTooltipOptions,
  { className, ...htmlProps }: unstable_TooltipProps = {}
) {
  const {
    style: { backgroundColor }
  } = usePaletteBoxProps({ unstable_system });

  const fadeBackgroundColor = useFade(backgroundColor || "black", 0.15);

  const tooltip = css`
    background-color: ${fadeBackgroundColor};
    font-size: 0.8em;
    padding: 0.5rem;
    border-radius: 0.25rem;

    & > .arrow {
      background-color: transparent;
      & .stroke {
        fill: transparent;
      }
      & .fill {
        fill: ${fadeBackgroundColor};
      }
    }
  `;

  return { ...htmlProps, className: cx(className, tooltip) };
}
