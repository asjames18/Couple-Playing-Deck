import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef } from 'react';

interface PrimaryButtonProps extends Omit<HTMLMotionProps<'button'>, 'as'> {
  children: React.ReactNode;
  className?: string;
  as?: 'button' | 'span';
}

const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ children, className = '', as = 'button', ...props }, ref) => {
    const baseClasses = `inline-flex items-center justify-center rounded-xl px-4 py-3
                   bg-primary text-white font-medium
                   shadow-soft hover:bg-primary-600 transition-all
                   ring-1 ring-primary/20 hover:ring-primary/40
                   tap-target focus-visible-ring disabled:opacity-50 disabled:cursor-not-allowed
                   ${className}`;

    if (as === 'span') {
      return (
        <motion.span
          ref={ref as React.Ref<HTMLSpanElement>}
          whileTap={{ y: 1 }}
          className={baseClasses}
          {...(props as React.HTMLAttributes<HTMLSpanElement>)}
        >
          {children}
        </motion.span>
      );
    }

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.96 }}
        className={baseClasses}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

PrimaryButton.displayName = 'PrimaryButton';

export default PrimaryButton;

