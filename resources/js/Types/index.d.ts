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
        meta: {
            current_page: number;
        };
    };
    state: TState;
}
