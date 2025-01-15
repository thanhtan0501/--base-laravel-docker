import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
} from '@/Components/ui/card';
import { cn } from '@/Lib/utils';
import React, { PropsWithChildren, ReactNode } from 'react';
import { Button, ButtonProps } from '../ui/button';

interface CardSessionProps {
    className?: string;
    headerTitle: string;
    headerButtons?: ReactNode;
    footerButtons?: ReactNode;
    totalComponent?: ReactNode;
    pagination?: ReactNode;
    search?: ReactNode;
}
interface ButtonFooterProps extends ButtonProps {
    label: string;
}
interface CardFooterButtonsProps {
    className?: string;
    buttons: ButtonFooterProps[];
}

const CardSession: React.FC<PropsWithChildren<CardSessionProps>> = ({
    headerTitle,
    headerButtons,
    footerButtons,
    totalComponent,
    className,
    children,
    search,
    pagination,
}) => {
    return (
        <Card className={cn(className)}>
            <CardHeader>
                <header className="flex items-center justify-between">
                    <h1 className="text-xl font-bold">{headerTitle}</h1>
                    {headerButtons && headerButtons}
                </header>
            </CardHeader>
            <CardContent>
                {search && (
                    <div className="mb-1 max-w-[400px] py-2 md:w-5/12">
                        {search}
                    </div>
                )}
                {children}
            </CardContent>
            <CardFooter>
                {footerButtons && footerButtons}
                {(pagination || totalComponent) && (
                    <div
                        className={cn(
                            'flex w-full flex-col items-center gap-4 md:flex-row md:justify-between',
                            !pagination && 'md:justify-start',
                            !totalComponent && 'md:justify-end',
                        )}
                    >
                        {totalComponent && totalComponent}
                        {pagination && pagination}
                    </div>
                )}
            </CardFooter>
        </Card>
    );
};

export default CardSession;

export const CardFooterButtons: React.FC<CardFooterButtonsProps> = ({
    className,
    buttons,
}) => {
    return (
        <div className={cn('flex items-center space-x-2', className)}>
            {buttons?.map((button) => (
                <Button
                    key={button.label}
                    className={cn('', button.className)}
                    {...button}
                >
                    {button.label}
                </Button>
            ))}
        </div>
    );
};
