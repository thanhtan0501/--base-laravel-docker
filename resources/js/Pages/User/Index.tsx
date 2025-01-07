// import { DataProps } from '@/Types';
import TableSession from '@/Components/Table/TableSession';
import { DataProps } from '@/Types';
import { User as UserType } from '@/Types/user';
import { Head } from '@inertiajs/react';

const TableHeaderColumns = {
    id: 'ID',
    full_name: 'Name',
    email: 'Email',
    created_at: 'Created At',
};

const User = (props: DataProps<UserType>) => {
    const { data: users } = props.listData;
    console.log(users);

    return (
        <div className="container mx-auto">
            <Head title="User" />
            <div className="">
                <TableSession columnsTitle={TableHeaderColumns} data={users} />
            </div>
        </div>
    );
};

export default User;
