import { usePage } from '@inertiajs/react';
import { PropsWithChildren } from 'react';
import Authenticated from './AuthenticatedLayout';
import Guest from './GuestLayout';

export default function DefaultLayout({ children }: PropsWithChildren) {
    const user = usePage().props.auth.user;
    return (
        <>
            {user ? (
                <Authenticated user={user}>{children}</Authenticated>
            ) : (
                <Guest>{children}</Guest>
            )}
        </>
    );
}
