import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { cn } from '@/Lib/utils';
import { User } from '@/Types/user';
import { BadgeCheck, LogOut, Settings, Sparkles } from 'lucide-react';
import React from 'react';

interface NavigationProps {
    className?: string;
    user: User;
}

const Navigation: React.FC<NavigationProps> = ({ user, className }) => {
    return (
        <nav
            className={cn(
                'sticky inset-0 z-10 border-b border-gray-100 bg-white dark:border-gray-700 dark:bg-gray-800',
                className,
            )}
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-end">
                    {/* <SidebarTrigger /> */}

                    <div className="flex sm:ms-6 sm:items-center">
                        <div className=""></div>
                        <div className="relative flex items-center gap-2">
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {user.full_name}
                                </span>
                            </div>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Avatar className="h-8 w-8 cursor-pointer rounded-lg">
                                        <AvatarImage
                                            src={user.image}
                                            alt={user.full_name}
                                        />
                                        <AvatarFallback className="rounded-lg">
                                            {user.full_name.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                                    align="end"
                                    sideOffset={4}
                                >
                                    <DropdownMenuLabel className="p-0 font-normal">
                                        <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                            <Avatar className="h-8 w-8 rounded-lg">
                                                <AvatarImage
                                                    src={user.image}
                                                    alt={user.full_name}
                                                />
                                                <AvatarFallback className="rounded-lg">
                                                    {user.full_name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="grid flex-1 text-left text-sm leading-tight">
                                                <span className="truncate font-semibold">
                                                    {user.full_name}
                                                </span>
                                                <span className="truncate text-xs">
                                                    {user.email}
                                                </span>
                                            </div>
                                        </div>
                                    </DropdownMenuLabel>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <Sparkles />
                                            Upgrade to Pro
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuGroup>
                                        <DropdownMenuItem>
                                            <BadgeCheck />
                                            Account
                                        </DropdownMenuItem>
                                        <DropdownMenuItem>
                                            <Settings />
                                            Setting
                                        </DropdownMenuItem>
                                    </DropdownMenuGroup>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem>
                                        <LogOut />
                                        Log out
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navigation;
