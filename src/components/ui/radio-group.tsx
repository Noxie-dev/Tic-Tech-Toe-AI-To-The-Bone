import * as React from 'react';
import { cn } from '../../lib/utils';

export interface RadioGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  onValueChange: (value: string) => void;
}

const RadioGroup = React.forwardRef<HTMLDivElement, RadioGroupProps>(
  ({ className, value, onValueChange, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex gap-2', className)} {...props}>
        {React.Children.map(children, child => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<RadioProps>, {
              checked: child.props.value === value,
              onChange: () => onValueChange(child.props.value),
            });
          }
          return child;
        })}
      </div>
    );
  }
);
RadioGroup.displayName = 'RadioGroup';

export interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
}

const Radio = React.forwardRef<HTMLInputElement, RadioProps>(
  ({ className, label, ...props }, ref) => {
    return (
      <label className={cn('flex items-center gap-2 cursor-pointer', className)}>
        <input
          type="radio"
          ref={ref}
          className="h-4 w-4 text-primary border-gray-300 focus:ring-primary"
          {...props}
        />
        {label && <span className="text-sm">{label}</span>}
      </label>
    );
  }
);
Radio.displayName = 'Radio';

export { RadioGroup, Radio };
