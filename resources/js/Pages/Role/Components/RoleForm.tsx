/* eslint-disable @typescript-eslint/no-explicit-any */
import { Permission, RoleForm } from '@/Types/user';
import { z } from 'zod';

// @ts-expect-error: TODO update types
import { InertiaFormProps } from '@inertiajs/react/types/useForm';

import Checkbox from '@/Components/Checkbox';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/Components/ui/select';
import { USER_STATUS } from '@/Configs';
import { cn } from '@/Lib/utils';
import { TriangleAlert } from 'lucide-react';

interface RoleFormSessionProps<TForm> {
    permissions: Permission[];
    className?: string;
    form: InertiaFormProps<TForm>;
}

const FormSchema = z.object({
    name: z.string().min(1, {
        message: 'Role name must be at least 2 characters.',
    }),
});

type FormFields = keyof RoleForm;

const RoleFormSession = function <TForm>({
    permissions,
    className,
    form,
}: RoleFormSessionProps<TForm>) {
    const { data, setData, errors, processing, clearErrors, setError } = form;

    const validateField = (field: FormFields, value: any) => {
        try {
            const newData = { ...data, ...{ [field]: value } };
            clearErrors(field);
            FormSchema.parse(newData);
        } catch (error) {
            if (error instanceof z.ZodError) {
                error.errors.forEach((currError) => {
                    const _field = currError.path[0];
                    if (_field && _field == field) {
                        setError(field, currError.message);
                    }
                });
            }
        }
    };

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, type, value, checked } = e.target;

        setData((prev: RoleForm) => {
            if (type === 'checkbox') {
                return {
                    ...prev,
                    permissions: checked
                        ? [...prev.permissions, parseInt(value)]
                        : prev.permissions.filter(
                              (permissionId: number) =>
                                  permissionId !== parseInt(value),
                          ),
                };
            } else {
                return { ...prev, [name]: value };
            }
        });
    };
    return (
        <form>
            <div className={cn('flex flex-col space-y-6', className)}>
                <div className="flex w-full flex-col gap-3 sm:flex-row sm:items-start sm:gap-5">
                    <div className="flex-1 space-y-2">
                        <Label className="text-base font-semibold">
                            Role Name
                        </Label>
                        <Input
                            type="text"
                            className={cn(
                                'focus:ring-none w-full transition focus:border-transparent',
                                errors.name &&
                                    'ring-1 ring-destructive placeholder:text-destructive focus:placeholder:text-muted-foreground',
                            )}
                            name="name"
                            placeholder="Role Name"
                            onChange={(e) => onChange(e)}
                            onBlur={(e) =>
                                validateField('name', e.target.value)
                            }
                            disabled={processing}
                            value={data.name}
                        />
                        {errors.name && (
                            <div
                                className={cn(
                                    'flex flex-row items-center gap-1 text-destructive',
                                )}
                            >
                                <div>
                                    <TriangleAlert size={12} />
                                </div>
                                <span className="text-[13px] font-medium leading-3">
                                    {errors.name}
                                </span>
                            </div>
                        )}
                    </div>
                    <div className="w-2/5 space-y-2">
                        <Label className="text-base font-semibold">
                            Status
                        </Label>

                        <Select
                            value={data.status}
                            defaultValue={'active'}
                            disabled={processing}
                            onValueChange={(e) =>
                                setData((prev: any) => {
                                    console.log(prev);

                                    return { ...prev, status: e };
                                })
                            }
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select a verified email to display" />
                            </SelectTrigger>
                            <SelectContent>
                                {USER_STATUS.map((el) => (
                                    <SelectItem key={el.key} value={el.key}>
                                        {el.value}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <div className="space-y-3">
                    <Label className="text-base font-semibold">
                        Permissions
                    </Label>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 2xl:grid-cols-4">
                        {permissions.map((permission) => (
                            <Label
                                key={permission.name}
                                htmlFor={permission.name}
                                className="flex items-center gap-1.5"
                            >
                                <Checkbox
                                    id={`permission-${permission.name}`}
                                    onChange={(e) => onChange(e)}
                                    value={permission.id}
                                    name={permission.name}
                                    disabled={processing}
                                    checked={data.permissions.includes(
                                        permission.id,
                                    )}
                                />
                                {permission.name}
                            </Label>
                        ))}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default RoleFormSession;
