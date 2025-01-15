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
} from '../ui/table';

import { StateDefault } from '@/Types';

import { onFilterSort } from '@/Hooks/use-filter';
import { SortIndicator } from './SortIndicator';
import TableMenuActions, { ActionTMenu } from './TableMenuActions';

import moment from 'moment';

interface headerColumnsProps {
    name: { key: string; value: string };
    isSort: boolean;
    columnStyles?: string;
}
interface TableSessionProps {
    className?: string;
    columnsTitle: headerColumnsProps[];
    data: any[];
    setParams: (val: StateDefault) => void;
    params: StateDefault;
    actionsMenu: ActionTMenu[];
}

const TableSession: React.FC<TableSessionProps> = ({
    data,
    columnsTitle,
    setParams,
    params,
    actionsMenu,
    className,
}) => {
    return (
        <Table className={cn('w-full', className)}>
            <TableHeader>
                <TableRow>
                    {columnsTitle.map((col) => (
                        <TableHead
                            key={`header-column-${col.name.key}`}
                            onClick={() =>
                                onFilterSort(col.name.key, params, setParams)
                            }
                            className={cn(
                                col.isSort && 'cursor-pointer hover:bg-accent',
                            )}
                        >
                            <SortIndicator
                                label={col.name.value}
                                direction={params.direction ?? ''}
                                field={params?.field ?? ''}
                                column={col.name.key}
                                isShowSort={col.isSort}
                            />
                        </TableHead>
                    ))}
                    <TableHead key="header-column-action">Action</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data && data.length > 0 ? (
                    <>
                        {data.map((row, indexRow) => {
                            if (row.created_at) {
                                row.created_at = moment(row.created_at).format(
                                    'DD MMM YYYY, hh:mm',
                                );
                            }
                            if (row.updated_at) {
                                row.updated_at = moment(row.updated_at).format(
                                    'DD MMM YYYY, hh:mm',
                                );
                            }

                            return (
                                <TableRow key={indexRow}>
                                    {columnsTitle.map((col, indexCol) => (
                                        <TableCell
                                            key={indexCol}
                                            className={cn(col.columnStyles)}
                                        >
                                            {row[col.name.key]}
                                        </TableCell>
                                    ))}
                                    <TableCell className="p-3">
                                        <TableMenuActions
                                            rowId={row.id}
                                            actionType="dropdown"
                                            actionsMenu={actionsMenu}
                                        />
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </>
                ) : (
                    <TableRow className="hover:bg-transparent">
                        <TableCell
                            colSpan={columnsTitle.length + 1}
                            className="py-10 text-center font-semibold"
                        >
                            No Data.
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default TableSession;
