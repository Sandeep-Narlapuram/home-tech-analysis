import { forwardRef, ButtonHTMLAttributes } from 'react';
import { Link } from 'react-router-dom';

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'link';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  href?: string;
}

const CustomButton = forwardRef<HTMLButtonElement, CustomButtonProps>(
  (
    {
      children,
      className = '',
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      disabled = false,
      isLoading = false,
      leftIcon,
      rightIcon,
      type = 'button',
      href,
      ...props
    },
    ref
  ) => {
    // Variant styles
    const variantStyles = {
      primary: 'bg-primary text-primary-foreground hover:bg-primary/90',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'border border-primary bg-transparent text-primary hover:bg-primary/5',
      ghost: 'bg-transparent text-foreground hover:bg-secondary',
      link: 'bg-transparent text-primary underline-offset-4 hover:underline p-0 h-auto'
    };

    // Size styles
    const sizeStyles = {
      sm: 'h-9 px-3 text-xs rounded-md',
      md: 'h-10 px-4 text-sm rounded-md',
      lg: 'h-12 px-6 text-base rounded-lg'
    };

    // Disabled and loading styles
    const stateStyles = disabled || isLoading
      ? 'opacity-50 cursor-not-allowed'
      : 'button-hover';

    // Width styles
    const widthStyles = fullWidth ? 'w-full' : '';

    const buttonContent = (
      <>
        {isLoading && (
          <svg 
            className="animate-spin -ml-1 mr-2 h-4 w-4" 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24"
          >
            <circle 
              className="opacity-25" 
              cx="12" 
              cy="12" 
              r="10" 
              stroke="currentColor" 
              strokeWidth="4"
            />
            <path 
              className="opacity-75" 
              fill="currentColor" 
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        
        {!isLoading && leftIcon && (
          <span className="mr-2 -ml-1">{leftIcon}</span>
        )}
        
        <span>{children}</span>
        
        {!isLoading && rightIcon && (
          <span className="ml-2 -mr-1">{rightIcon}</span>
        )}
      </>
    );

    // If href is provided, render as a Link component
    if (href) {
      return (
        <Link
          to={href}
          className={`
            inline-flex items-center justify-center font-medium transition-all duration-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50
            ${variantStyles[variant]}
            ${sizeStyles[size]}
            ${disabled || isLoading ? 'opacity-50 pointer-events-none' : ''}
            ${widthStyles}
            ${className}
          `}
        >
          {buttonContent}
        </Link>
      );
    }

    // Otherwise render as a button
    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={`
          inline-flex items-center justify-center font-medium transition-all duration-200
          focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary/50
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${stateStyles}
          ${widthStyles}
          ${className}
        `}
        {...props}
      >
        {buttonContent}
      </button>
    );
  }
);

CustomButton.displayName = 'CustomButton';

export default CustomButton;
