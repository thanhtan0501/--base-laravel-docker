import CardSession from '@/Components/Card/CardSession';
import Container from '@/Components/Container';
import Search from '@/Components/Filter/Search';
import PaginationSession from '@/Components/Table/PaginationSession';
import { ActionName } from '@/Components/Table/TableMenuActions';
import TableSession from '@/Components/Table/TableSession';
import TotalTable from '@/Components/Table/TotalTable';
import { Button } from '@/Components/ui/button';
import { FilterName, onFilterChange, useFilter } from '@/Hooks/use-filter';
import { DataProps } from '@/Types';
import { Role as RoleType } from '@/Types/user';
import { Head, Link, useForm } from '@inertiajs/react';
import { Pencil, Plus, SearchIcon, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';

const TableHeaderColumns = [
    { name: { key: 'id', value: 'ID' }, isSort: false },
    { name: { key: 'name', value: 'Name' }, isSort: true },
    { name: { key: 'status', value: 'Status' }, isSort: true },
    { name: { key: 'created_at', value: 'Created At' }, isSort: false },
    { name: { key: 'updated_at', value: 'Updated At' }, isSort: false },
];

export default function Role(props: DataProps<RoleType>) {
    const { data: roles, meta } = props.listData;
    const [params, setParams] = useState(props.state);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [dataValue, setDataValue] = useState<Record<FilterName, string>>({
        [FilterName.SEARCH]: props.state[FilterName.SEARCH] ?? '',
    });

    useFilter({
        route: route('admin.role'),
        values: params,
        only: ['listData', 'state'],
        loading: setIsLoading,
    });
    const onSetData = (name: FilterName, value: string) => {
        setDataValue((prev) => ({ ...prev, [name]: value, page: 1 }));
    };
    useEffect(() => {
        onFilterChange(dataValue, setParams, setIsLoading);
    }, [dataValue]);

    const { delete: destroy, processing } = useForm();

    const handleDelete = (dataId: number) => {
        destroy(route('admin.role.delete', dataId), {
            onSuccess: () => {},
        });
    };

    return (
        <Container className="mx-auto">
            <Head title="Role" />
            <CardSession
                headerTitle="Role Management"
                headerButtons={
                    <Link href={route('admin.role.create')}>
                        <Button size="sm">
                            <Plus />
                            Create
                        </Button>
                    </Link>
                }
                search={
                    <Search
                        icon={<SearchIcon size={18} />}
                        placeholder="Search by name"
                        value={dataValue[FilterName.SEARCH]}
                        onSearchValue={onSetData}
                        isLoading={isLoading}
                    />
                }
                totalComponent={<TotalTable meta={meta} />}
                pagination={
                    <PaginationSession
                        pagination={meta}
                        onSelectedPage={(page) =>
                            setParams((prev) => ({ ...prev, page }))
                        }
                    />
                }
            >
                <TableSession
                    data={roles}
                    columnsTitle={TableHeaderColumns}
                    params={params}
                    setParams={setParams}
                    actionsMenu={[
                        {
                            name: ActionName.EDIT,
                            icon: <Pencil className="text-muted-foreground" />,
                            route: `admin.role.edit`,
                            type: 'default',
                        },
                        {
                            name: ActionName.DELETE,
                            icon: <Trash2 className="text-muted-foreground" />,
                            route: `admin.role.delete`,
                            type: 'dialog',
                            dialogTitle: 'Are you sure you want to delete?',
                            dialogActionButtons: [
                                {
                                    label: 'Delete',
                                    disabled: processing,
                                    onAction: handleDelete,
                                },
                            ],
                        },
                    ]}
                />
            </CardSession>
        </Container>
    );
}
