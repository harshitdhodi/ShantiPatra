import React from 'react';

export const Button = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <button
      className={`px-4 py-2 font-semibold text-white rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Button.displayName = 'Button';

