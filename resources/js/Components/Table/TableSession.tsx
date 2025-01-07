/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/Lib/utils';
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '../ui/Table';

interface TableSessionProps {
    className?: string;
    columnsTitle: object;
    data: any[];
}

const TableSession: React.FC<TableSessionProps> = ({
    className,
    columnsTitle,
    data,
}) => {
    return (
        <Table className={cn('w-full', className)}>
            <TableHeader className="">
                <TableRow>
                    {Object.values(columnsTitle).map((col) => (
                        <TableHead key={col}>{col}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data && data.length > 0 ? (
                    <>
                        {data.map((row, index) => (
                            <TableRow key={index}>
                                {Object.keys(columnsTitle).map((col, index) => (
                                    <TableCell key={index}>
                                        {row[col]}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))}
                    </>
                ) : (
                    <p></p>
                )}
            </TableBody>
        </Table>
    );
};

export default TableSession;
