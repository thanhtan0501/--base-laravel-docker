/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortIndicator } from '@/Components/Table/SortIndicator';
import TableMenuActions, {
    ActionName,
} from '@/Components/Table/TableMenuActions';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/Components/ui/table';
import { ROLE } from '@/Configs';
import { onFilterSort } from '@/Hooks/use-filter';
import { cn } from '@/Lib/utils';
import { StateDefault } from '@/Types';
import { User } from '@/Types/user';
import { Pencil, Trash2 } from 'lucide-react';
import moment from 'moment';
import React from 'react';

interface headerColumnsProps {
    name: { key: string; value: string };
    isSort: boolean;
}

interface TableCustomProps {
    className?: string;
    columnsTitle: headerColumnsProps[];
    data: any[];
    setParams: (val: StateDefault) => void;
    params: StateDefault;
}
const TableCustom: React.FC<TableCustomProps> = ({
    data,
    columnsTitle,
    setParams,
    params,
    className,
}) => {
    return (
        <>
            <Table className={cn('w-full', className)}>
                <TableHeader className="border-b">
                    <TableRow className="hover:bg-transparent">
                        {columnsTitle.map((col) => (
                            <TableHead
                                key={`header-column-${col.name.key}`}
                                onClick={() =>
                                    onFilterSort(
                                        col.name.key,
                                        params,
                                        setParams,
                                    )
                                }
                                className={cn(
                                    col.isSort &&
                                        'cursor-pointer hover:bg-accent',
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
                            {data.map((row: User, indexRow) => (
                                <TableRow key={indexRow}>
                                    <TableCell className="p-3">
                                        {row.id}
                                    </TableCell>
                                    <TableCell className="p-3">
                                        {row.full_name}
                                    </TableCell>
                                    <TableCell className="max-w-[200px] truncate p-3">
                                        {row.email}
                                    </TableCell>
                                    <TableCell className="p-3">
                                        {row.roles[0]?.name &&
                                            ROLE[row.roles[0].name]}
                                    </TableCell>

                                    <TableCell className="p-3">
                                        {moment(row.created_at).format(
                                            'DD MMMM YYYY',
                                        )}
                                    </TableCell>
                                    <TableCell className="p-3">
                                        <TableMenuActions
                                            rowId={row.id}
                                            actionType="dropdown"
                                            actionsMenu={[
                                                {
                                                    name: ActionName.EDIT,
                                                    icon: (
                                                        <Pencil className="text-muted-foreground" />
                                                    ),
                                                    route: `admin.user.edit`,
                                                    type: 'default',
                                                },
                                                {
                                                    name: ActionName.DELETE,
                                                    icon: (
                                                        <Trash2 className="text-muted-foreground" />
                                                    ),
                                                    route: `admin.user.delete`,
                                                    type: 'dialog',
                                                    dialogTitle: 'hello',
                                                },
                                            ]}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
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
        </>
    );
};

export default TableCustom;
