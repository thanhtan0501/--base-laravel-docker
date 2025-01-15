import { InputHTMLAttributes } from 'react';

export default function Checkbox({
    className = '',
    ...props
}: InputHTMLAttributes<HTMLInputElement>) {
    return (
        <input
            {...props}
            type="checkbox"
            className={
                'cursor-pointer rounded border-border text-primary shadow-sm transition focus:ring-primary' +
                className
            }
        />
    );
}
