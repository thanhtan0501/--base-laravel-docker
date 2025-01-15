import AlertDialogSession, {
    DialogActionButtonsProps,
} from '@/Components/Table/AlertDialogSession';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { cn } from '@/Lib/utils';
import { Link } from '@inertiajs/react';
import { MoreHorizontal } from 'lucide-react';
import React, { ReactNode } from 'react';

export enum ActionName {
    EDIT = 'Edit',
    DELETE = 'Delete',
}
export interface ActionTMenu {
    name: ActionName;
    icon?: ReactNode;
    route: string;
    type: 'default' | 'dialog';
    dialogTitle?: string | ReactNode;
    dialogDescription?: string | ReactNode;
    dialogActionButtons?: DialogActionButtonsProps[];
}

interface TableMenuActions {
    rowId: number;
    className?: string;
    actionType?: 'default' | 'dropdown';
    actionsMenu: ActionTMenu[];
}

const TableMenuActions: React.FC<TableMenuActions> = ({
    rowId,
    className,
    actionType = 'default',
    actionsMenu,
}) => {
    return (
        <div className={cn('', className)}>
            {actionType == 'dropdown' && (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <MoreHorizontal
                            size={18}
                            className="cursor-pointer rounded border border-transparent p-0.5 text-muted-foreground transition hover:border-border"
                        />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-48 rounded-lg">
                        {actionsMenu?.map((item, index) => (
                            <React.Fragment key={item.name}>
                                {item.type === 'default' && (
                                    <Link href={route(item.route, rowId)}>
                                        <DropdownMenuItem>
                                            {item.icon && item.icon}
                                            <span>{item.name}</span>
                                        </DropdownMenuItem>
                                    </Link>
                                )}
                                {item.type === 'dialog' && (
                                    <AlertDialogSession
                                        id={rowId}
                                        icon={item.icon}
                                        name={item.name}
                                        headerTitle={item.dialogTitle}
                                        description={item.dialogDescription}
                                        cancelButton={{ label: 'Cancel' }}
                                        actionButtons={item.dialogActionButtons}
                                    />
                                )}
                                {index < actionsMenu.length - 1 && (
                                    <DropdownMenuSeparator />
                                )}
                            </React.Fragment>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            )}

            {/* {actionType == 'default' && (
                <div className={cn('flex gap-2')}>
                    {actionsMenu?.map((item) => (
                        <React.Fragment key={item.name}>
                            <Link
                                href={route(item.route, rowId)}
                                className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                            >
                                {item.name}
                            </Link>
                        </React.Fragment>
                    ))}
                </div>
            )} */}
        </div>
    );
};

export default TableMenuActions;
