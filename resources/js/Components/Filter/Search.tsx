import { FilterName } from '@/Hooks/use-filter';
import { cn } from '@/Lib/utils';
import { CircleX, LoaderCircle } from 'lucide-react';
import React, { ReactNode, useRef } from 'react';
import { Input, InputProps } from '../ui/input';
import { Separator } from '../ui/separator';

interface SearchProps
    extends Omit<InputProps, 'onChange' | 'defaultValue' | 'maxLength'> {
    icon?: ReactNode;
    onSearchValue: (name: FilterName, value: string) => void;
    isLoading: boolean;
    className?: string;
}
const Search: React.FC<SearchProps> = ({
    className,
    onSearchValue,
    icon,
    isLoading,
    ...props
}) => {
    const inputRef = useRef<HTMLInputElement>(null);
    const handleClear = () => {
        onSearchValue(FilterName.SEARCH, '');
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    return (
        <div className={cn('group relative')}>
            {icon && (
                <>
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 transform text-muted-foreground group-focus-visible:text-primary">
                        {icon}
                    </div>
                    <Separator
                        orientation="vertical"
                        className="absolute left-10 top-1/2 h-[calc(100%-0.5rem)] -translate-y-1/2 transform"
                    />
                </>
            )}

            <Input
                ref={inputRef}
                {...props}
                onChange={(e) => {
                    const value = e.target.value;
                    onSearchValue(FilterName.SEARCH, value);
                }}
                className={cn(
                    'border-border bg-white pr-9 font-medium focus-visible:border-primary focus-visible:ring-0',
                    icon && 'pl-12',
                    className,
                )}
            />
            {!!props.value && !isLoading && (
                <button
                    className="absolute right-3 top-1/2 -translate-y-1/2 transform"
                    onClick={handleClear}
                >
                    <CircleX className="text-muted-foreground" size={18} />
                </button>
            )}

            {isLoading && (
                <div className="absolute right-3 top-1/2 -translate-y-1/2 transform">
                    <LoaderCircle
                        className="animate-spin text-muted-foreground"
                        size={18}
                    />
                </div>
            )}
        </div>
    );
};

export default Search;
