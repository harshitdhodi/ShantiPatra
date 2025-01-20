import React from 'react';

export const Input = React.forwardRef(({ className, ...props }, ref) => {
  return (
    <input
      className={`w-full px-3 py-2 text-gray-700 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#384b98] ${className}`}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

