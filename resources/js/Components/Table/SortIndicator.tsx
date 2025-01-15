import { cn } from '@/Lib/utils';

interface SortIndicatorProps {
    label: string;
    column: string;
    field: string;
    direction?: 'asc' | 'desc' | '';
    isShowSort?: boolean;
    className?: string;
}

export const SortIndicator = ({
    label,
    direction,
    field,
    column,
    isShowSort = false,
    className,
}: SortIndicatorProps) => {
    return (
        <div
            className={cn(
                'my-2 flex min-w-max items-center justify-between gap-2',
                className,
            )}
        >
            <span className="">{label}</span>
            {isShowSort && (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-chevrons-up-down"
                >
                    <path
                        d="m7 15 5 5 5-5"
                        className={cn(
                            'transform transition',
                            field === column &&
                                direction === 'asc' &&
                                'text-primary',
                        )}
                    />
                    <path
                        d="m7 9 5-5 5 5"
                        className={cn(
                            'transform transition',
                            field === column &&
                                direction === 'desc' &&
                                'text-primary',
                        )}
                    />
                </svg>
            )}

            {/* {field === column ? (
                <ChevronDown
                    className={cn(
                        'transform transition',
                        direction === 'asc' && 'rotate-0',
                        direction === 'desc' && 'rotate-180',
                    )}
                    size={18}
                />
            ) : (
                <ChevronDown size={18} />
            )} */}
        </div>
    );
};
