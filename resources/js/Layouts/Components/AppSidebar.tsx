import ApplicationLogo from '@/Components/ApplicationLogo';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
    useSidebar,
} from '@/Components/ui/sidebar';
import { Link } from '@inertiajs/react';
import { LayoutDashboard, Users } from 'lucide-react';
import { NavItems } from './NavItems';

export function AppSidebar() {
    const menu = [
        {
            name: 'Dashboard',
            url: 'dashboard',
            icon: <LayoutDashboard />,
        },
        { name: 'Users', url: 'admin.user', icon: <Users /> },
    ];
    const { isMobile } = useSidebar();
    return (
        <Sidebar collapsible="icon">
            <SidebarHeader className="border-b border-sidebar-border">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link
                                href="#"
                                className="group-data-[collapsible=icon]:!h-12 group-data-[collapsible=icon]:!w-full group-data-[collapsible=icon]:!p-2"
                            >
                                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary p-1 text-sidebar-primary-foreground">
                                    <ApplicationLogo className="block fill-current" />
                                </div>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        Laravel Admin
                                    </span>
                                    <span className="truncate text-xs">
                                        Laravel
                                    </span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent className={'p-2'}>
                <NavItems data={menu} />
            </SidebarContent>
            {!isMobile && (
                <SidebarFooter className="flex items-center border-t border-sidebar-border">
                    <SidebarTrigger className="w-full" />
                </SidebarFooter>
            )}
        </Sidebar>
    );
}
