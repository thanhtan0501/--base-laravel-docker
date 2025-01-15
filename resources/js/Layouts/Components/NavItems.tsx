// import {
//     Folder,
//     MoreHorizontal,
//     Share,
//     Trash2,
//     type LucideIcon,
// } from 'lucide-react';

// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuSeparator,
//     DropdownMenuTrigger,
// } from '@/components/ui/dropdown-menu';
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from '@/Components/ui/sidebar';
import { cn } from '@/Lib/utils';
import { Link } from '@inertiajs/react';
import { ReactNode } from 'react';

export function NavItems({
    data,
}: {
    data: {
        name: string;
        url: string;
        icon?: ReactNode;
    }[];
}) {
    // const { isMobile } = useSidebar();

    return (
        <SidebarGroup className="group-data-[collapsible=icon]:block">
            <SidebarMenu className="gap-1.5">
                {data.map((item) => (
                    <SidebarMenuItem key={`navigation-${item.name}`}>
                        <SidebarMenuButton asChild className="rounded-md">
                            <Link
                                href={route(item.url)}
                                className={cn(
                                    'flex h-max items-center px-3 py-1.5 text-sm font-medium transition-all focus:outline-none',
                                    route().current(`${item.url}.*`) ||
                                        route().current(`${item.url}`)
                                        ? 'bg-primary text-primary-foreground hover:!bg-primary/80 hover:!text-primary-foreground'
                                        : 'bg-transparent',
                                )}
                            >
                                {item.icon && item.icon}
                                {item.name}
                            </Link>
                        </SidebarMenuButton>
                        {/* <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <SidebarMenuAction showOnHover>
                                <MoreHorizontal />
                                <span className="sr-only">More</span>
                            </SidebarMenuAction>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            className="w-48"
                            side={isMobile ? 'bottom' : 'right'}
                            align={isMobile ? 'end' : 'start'}
                        >
                            <DropdownMenuItem>
                                <Folder className="text-muted-foreground" />
                                <span>View Project</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <Share className="text-muted-foreground" />
                                <span>Share Project</span>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Trash2 className="text-muted-foreground" />
                                <span>Delete Project</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu> */}
                    </SidebarMenuItem>
                ))}
                {/* <SidebarMenuItem>
                    <SidebarMenuButton>
                        <MoreHorizontal />
                        <span>More</span>
                    </SidebarMenuButton>
                </SidebarMenuItem> */}
            </SidebarMenu>
        </SidebarGroup>
    );
}
