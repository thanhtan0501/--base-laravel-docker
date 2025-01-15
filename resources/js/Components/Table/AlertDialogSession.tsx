/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionName } from '@/Components/Table/TableMenuActions';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/Components/ui/alert-dialog';
import { ButtonProps } from '@/Components/ui/button';
import { DropdownMenuItem } from '@/Components/ui/dropdown-menu';
import React, { ReactNode } from 'react';

export interface DialogActionButtonsProps extends ButtonProps {
    label: string;
    onAction?: (val: any) => void;
}
interface AlertDialogSessionProps {
    id: number;
    icon?: ReactNode;
    name: ActionName;
    headerTitle: string | ReactNode;
    description: string | ReactNode;
    cancelButton?: DialogActionButtonsProps;
    actionButtons?: DialogActionButtonsProps[];
}

const AlertDialogSession: React.FC<AlertDialogSessionProps> = ({
    id,
    icon,
    name,
    headerTitle,
    description,
    cancelButton,
    actionButtons,
}) => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    {icon && icon}
                    <span>{name}</span>
                </DropdownMenuItem>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{headerTitle}</AlertDialogTitle>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    {cancelButton && (
                        <AlertDialogCancel
                            key={cancelButton.label}
                            {...cancelButton}
                        >
                            {cancelButton.label}
                        </AlertDialogCancel>
                    )}
                    {actionButtons && actionButtons.length > 0 && (
                        <>
                            {actionButtons.map((button) => (
                                <AlertDialogAction
                                    {...button}
                                    key={button.label}
                                    onClick={() => {
                                        if (button.onAction) {
                                            button.onAction(id);
                                        }
                                    }}
                                >
                                    {button.label}
                                </AlertDialogAction>
                            ))}
                        </>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default AlertDialogSession;
