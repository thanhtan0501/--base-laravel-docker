import { User } from '@/Types/user';
import { PropsWithChildren, ReactNode } from 'react';
import Navigation from './Components/Navigation';

export default function Authenticated({
    header,
    children,
    user,
}: PropsWithChildren<{ header?: ReactNode; user: User }>) {
    const menu = [
        { name: 'Dashboard', route: 'dashboard' },
        { name: 'User', route: 'admin.user' },
    ];
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <Navigation user={user} menu={menu} />
            {header && (
                <header className="bg-white shadow dark:bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
