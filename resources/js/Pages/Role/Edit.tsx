import CardSession, { CardFooterButtons } from '@/Components/Card/CardSession';
import Container from '@/Components/Container';
import { Permission, Role, RoleForm as RoleFormType } from '@/Types/user';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import RoleFormSession from './Components/RoleForm';

interface RoleEditProps {
    permissions: { data: Permission[] };
    role: { data: Role };
}

const Edit: React.FC<RoleEditProps> = ({ permissions, role }) => {
    const { put, reset, ...form } = useForm<RoleFormType>({
        name: role.data.name,
        status: role.data.status,
        permissions: role.data.permissions.map((permission) => permission.id),
    });

    const onUpdate = (e: React.FormEvent) => {
        e.preventDefault();

        put(route('admin.role.update', role.data.id), {
            onSuccess: () => {
                reset();
            },
            onError: (e) => {
                console.log(e);
            },
        });
    };

    return (
        <Container className="mx-auto">
            <Head title="Role" />
            <CardSession
                headerTitle="Edit Role"
                footerButtons={
                    <CardFooterButtons
                        className="mt-5 w-full justify-end"
                        buttons={[
                            {
                                label: 'Cancel',
                                variant: 'outline',
                                onClick: () => window.history.back(),
                            },
                            {
                                label: 'Update',
                                onClick: onUpdate,
                            },
                        ]}
                    />
                }
            >
                <RoleFormSession<RoleFormType>
                    permissions={permissions.data}
                    form={form}
                />
            </CardSession>
        </Container>
    );
};

export default Edit;
