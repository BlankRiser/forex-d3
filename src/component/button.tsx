import { cva, type VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef, Ref } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonStyles> {
  onlyIcon?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const buttonStyles = cva(
  'appearance-none font-medium gap-2 focus:outline-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1  focus-visible:ring-blue-300 transition-colors duration-200 ease-in-out h-max ',
  {
    variants: {
      variant: {
        filled: [
          'bg-blue-600 hover:bg-blue-700 active:bg-blue-800',
          'text-white',
          ' disabled:select-none disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400',
        ],
        danger: [
          'bg-red-600 hover:bg-red-700 active:bg-red-800',
          'text-white',
          ' disabled:select-none disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400',
        ],
        light: [
          'bg-blue-50 hover:bg-blue-100 active:bg-blue-200',
          'text-blue-600',
          'disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400',
        ],
        outline: [
          'bg-transparent hover:bg-gray-50 active:bg-gray-200 ',
          'dark:bg-gray-800 dark:hover:bg-gray-700 active:bg-gray-600 ',
          'text-gray-700',
          'dark:text-gray-100',
          'border border-gray-300  active:border-gray-200 ',
          'dark:border-gray-600 dark:active:border-gray-700',
          'disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-400 dark:disabled:bg-gray-700 dark:disabled:text-gray-500',
        ],
        subtle: [
          'bg-transparent hover:bg-blue-50 active:bg-blue-800 ',
          ' dark:hover:bg-blue-900 active:bg-blue-100 ',
          'text-blue-600',
          'disabled:cursor-not-allowed disabled:pointer-events-none  disabled:text-gray-400',
        ],
      },
      size: {
        sm: ['text-small', 'py-2 px-3'],
        md: ['text-small', 'py-3 px-4'],
        lg: ['text-small', 'py-4 px-5'],
      },

      radius: {
        '4px': 'rounded-[4px]',
        '2px': 'rounded-[2px]',
        '6px': 'rounded-[6px]',
        '8px': 'rounded-[8px]',
        '12px': 'rounded-[12px]',
        '16px': 'rounded-[16px]',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'filled',
      size: 'md',
      radius: '4px',
    },
  },
);

export const _Button = (props: ButtonProps, ref: Ref<HTMLButtonElement>) => {
  const { variant, size = 'md', className, children, radius, ...rest } = props;
  return (
    <button ref={ref} type='button' className={buttonStyles({ variant, size, radius, className })} {...rest}>
      {children}
    </button>
  );
};

const Button = forwardRef(_Button);

Button.displayName = 'Button';

export { Button, buttonStyles };
