import CardSession from '@/Components/Card/CardSession';
import Container from '@/Components/Container';
import Search from '@/Components/Filter/Search';
import PaginationSession from '@/Components/Table/PaginationSession';
import { Button } from '@/Components/ui/button';
import { FilterName, onFilterChange, useFilter } from '@/Hooks/use-filter';
import { DataProps } from '@/Types';
import { User as UserType } from '@/Types/user';
import { Head } from '@inertiajs/react';
import { Plus, Search as SearchIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import TableCustom from './Components/TableCustom';

const TableHeaderColumns = [
    { name: { key: 'id', value: 'ID' }, isSort: false },
    { name: { key: 'full_name', value: 'Name' }, isSort: true },
    { name: { key: 'email', value: 'Email' }, isSort: true },
    { name: { key: 'role', value: 'Role' }, isSort: false },
    { name: { key: 'created_at', value: 'Created At' }, isSort: false },
];

const User = (props: DataProps<UserType>) => {
    const { data: users, meta } = props.listData;
    const [params, setParams] = useState(props.state);
    const [dataValue, setDataValue] = useState<Record<FilterName, string>>({
        [FilterName.SEARCH]: props.state[FilterName.SEARCH] ?? '',
    });
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useFilter({
        route: route('admin.user'),
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

    return (
        <Container className="mx-auto">
            <Head title="User" />
            <CardSession
                headerTitle="User Management"
                headerButtons={
                    <Button className="" size="sm">
                        <Plus />
                        Create
                    </Button>
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
                meta={meta}
                pagination={
                    <PaginationSession
                        pagination={meta}
                        onSelectedPage={(page) =>
                            setParams((prev) => ({ ...prev, page }))
                        }
                    />
                }
            >
                <TableCustom
                    data={users}
                    columnsTitle={TableHeaderColumns}
                    params={params}
                    setParams={setParams}
                />
            </CardSession>
        </Container>
    );
};

export default User;
