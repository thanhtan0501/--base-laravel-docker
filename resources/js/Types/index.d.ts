import { User } from '@/Types/user';

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    auth: {
        user: User;
    };
};

interface StateDefault {
    search?: string;
    field?: string;
    direction?: 'asc' | 'desc' | '';
    limit?: string;
    page?: number;
}

export interface PaginationLinks {
    active: boolean;
    label: string;
    url: string | null;
}

export interface PaginationMeta {
    current_page: number;
    from: null | number;
    path: string;
    to: null | number;
    total: number;
    per_page: number;
    links?: PaginationLinks[];
    last_page: number;
}

export interface DataProps<TData, TState = StateDefault> {
    listData: {
        data: TData[];
        links: {
            first: string | null;
            last: string | null;
            next: string | null;
            prev: string | null;
        };
        meta: PaginationMeta;
    };
    state: TState;
}
