/* eslint-disable @typescript-eslint/no-explicit-any */
import { router } from '@inertiajs/react';
import { useCallback, useEffect } from 'react';

import { StateDefault } from '@/Types';
import { debounce, pickBy } from 'lodash';

export enum FilterName {
    SEARCH = 'search',
}

export const onFilterChange = (
    filter: Record<FilterName, string>,
    setParams: (val: StateDefault) => void,
    setIsLoading?: (val: boolean) => void,
) => {
    const filterData: StateDefault = {};
    Object.values(FilterName).forEach((name) => {
        if (filter[name].length) {
            setIsLoading && setIsLoading(true);
            filterData[name] = filter[name];
        }
    });
    setParams(filterData);
};

export const onFilterSort = (
    newField: string,
    params: StateDefault,
    setParams: (val: StateDefault) => void,
) => {
    let newDirection = params?.direction ?? 'asc';
    const field = params?.field ?? 'id';

    if (newField === field) {
        newDirection =
            newDirection === 'asc'
                ? 'desc'
                : newDirection === 'desc'
                  ? ''
                  : 'asc'; // used newDirection
    }
    setParams({
        ...params,
        field: newField,
        direction: newDirection,
        page: 1,
    });
};

interface Props {
    route: string;
    values: any;
    only: string[];
    wait?: number;
    loading?: (val: boolean) => void;
}

export function useFilter({ route, values, only, wait = 300, loading }: Props) {
    const reload = useCallback(
        debounce((query: any) => {
            router.get(route, pickBy(query), {
                only: only,
                preserveState: true,
                preserveScroll: true,
                onFinish: () => {
                    loading && loading(false);
                    return;
                },
            });
        }, wait),
        [],
    );

    useEffect(() => {
        reload(values);
    }, [values, reload, loading]);

    return { values };
}
