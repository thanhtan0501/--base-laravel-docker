import { User } from '@/Types/user';
import { PropsWithChildren } from 'react';
import Navigation from './Components/Navigation';

import { SidebarProvider } from '@/Components/ui/sidebar';
import { AppSidebar } from './Components/AppSidebar';

import { Toaster } from '@/Components/ui/toaster';

export default function Authenticated({
    children,
    user,
}: PropsWithChildren<{ user: User }>) {
    return (
        <SidebarProvider className="min-h-screen overflow-hidden bg-gray-100 dark:bg-gray-900">
            <AppSidebar />

            <main className="relative flex h-screen flex-1 flex-col overflow-hidden">
                <Navigation user={user} />
                <div className="h-lvh flex-1 overflow-y-auto py-10">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        {children}
                    </div>
                </div>
            </main>
            <Toaster />
        </SidebarProvider>
    );
}
