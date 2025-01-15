import { cn } from '@/Lib/utils';
import { PropsWithChildren } from 'react';

interface ContainerProps {
    className?: string;
}
export default function Container({
    className,
    children,
}: PropsWithChildren<ContainerProps>) {
    return <div className={cn('space-y-5 px-0', className)}>{children}</div>;
}
