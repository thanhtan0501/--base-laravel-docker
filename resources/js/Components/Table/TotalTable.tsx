import { cn } from '@/Lib/utils';
import { PaginationMeta } from '@/Types';
import React from 'react';

interface TotalTableProps {
    meta: PaginationMeta;
    className?: string;
}
const TotalTable: React.FC<TotalTableProps> = ({ meta, className }) => {
    return (
        <div
            className={cn(
                'flex items-center gap-1 text-sm text-muted-foreground',
                className,
            )}
        >
            <span>Showing</span>
            <strong>{meta.from}</strong>
            <span>to</span>
            <strong>{meta.to}</strong>
            <span>of</span>
            <strong>{meta.total}</strong>
            <span>results</span>
        </div>
    );
};

export default TotalTable;
