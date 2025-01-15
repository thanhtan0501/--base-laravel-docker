import CardSession, { CardFooterButtons } from '@/Components/Card/CardSession';
import Container from '@/Components/Container';
import { ToastAction } from '@/Components/ui/toast';
import { useToast } from '@/Hooks/use-toast';
import { Permission, RoleForm as RoleFormType } from '@/Types/user';
import { Head, useForm } from '@inertiajs/react';
import React from 'react';
import RoleFormSession from './Components/RoleForm';

interface RoleCreateProps {
    permissions: { data: Permission[] };
}

type FormErrors = Record<keyof RoleFormType, string>;

const Create: React.FC<RoleCreateProps> = ({ permissions }) => {
    const { toast } = useToast();
    const { post, reset, ...form } = useForm<RoleFormType>({
        name: '',
        permissions: [] as number[],
    });

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        post(route('admin.role.store'), {
            onSuccess: () => {
                toast({
                    title: 'Success',
                    description: 'Create role success',
                });
                reset();
            },
            onError: (e) => {
                form.setError(e as FormErrors);
                toast({
                    variant: 'destructive',
                    title: 'Error',
                    description: 'There was a problem with your request.',
                    action: (
                        <ToastAction altText="Try again">Try again</ToastAction>
                    ),
                });
            },
        });
    };

    return (
        <Container className="mx-auto">
            <Head title="Role" />
            <CardSession
                headerTitle="Create Role"
                footerButtons={
                    <CardFooterButtons
                        className="mt-5 w-full justify-end"
                        buttons={[
                            {
                                label: 'Cancel',
                                variant: 'outline',
                                onClick: () => window.history.back(),
                                disabled: form.processing,
                            },
                            {
                                label: 'Submit',
                                onClick: onSubmit,
                                disabled: form.processing,
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

export default Create;
