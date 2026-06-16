import type {
  ForwardRefExoticComponent,
  HTMLAttributes,
  RefAttributes,
} from "react";

export type AnimatedIconHandle = {
  startAnimation: () => void;
  stopAnimation: () => void;
};

export type AnimatedIconProps = HTMLAttributes<HTMLDivElement> & {
  size?: number;
  animateOnHover?: boolean;
};

export type AnimatedIconComponent = ForwardRefExoticComponent<
  AnimatedIconProps & RefAttributes<AnimatedIconHandle>
>;
