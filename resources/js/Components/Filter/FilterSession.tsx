import React, { useState } from 'react';

import { cn } from '@/Lib/utils';

import { Input } from '@/Components/ui/input';
import { Separator } from '@/Components/ui/separator';
import { FilterName } from '@/Hooks/use-filter';
import { PageProps } from '@/Types';
import { usePage } from '@inertiajs/react';

interface FilterSessionProps {
    className?: string;
    onFilter: (filter: Record<FilterName, string>) => void;
}

const FilterSession: React.FC<FilterSessionProps> = ({
    className,
    onFilter,
}) => {
    const { props } = usePage<PageProps>();
    const [dataValue, setDataValue] = useState<Record<FilterName, string>>({
        [FilterName.SEARCH]: '',
    });

    const onSetData = (name: FilterName, value: string) => {};
    return (
        <div className={cn('', className)}>
            <div className="relative">
                {/* <Icon
                    icon="IconSearch"
                    className="absolute left-3 top-1/2 h-7 w-7 -translate-y-1/2 transform text-primary"
                /> */}

                <Separator
                    orientation="vertical"
                    className="absolute left-11 top-1/2 h-7 -translate-y-1/2 transform"
                />
                <Input
                    placeholder="フリーワード検索を入れてください"
                    value={dataValue[FilterName.SEARCH] as string}
                    onChange={(e) => {
                        const value = e.target.value;

                        onSetData(FilterName.SEARCH, value);
                    }}
                    className="h-max border-primary bg-white py-4 pl-[50px] pr-8 text-[11px] font-medium leading-4 tracking-[0.5px] md:py-[14px] md:pl-[52px] md:text-sm md:tracking-[0.1px]"
                />
            </div>
        </div>
    );
};

export default FilterSession;
