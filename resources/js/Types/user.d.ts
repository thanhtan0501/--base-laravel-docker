export enum UserStatus {
    ACTIVE = 0,
    INACTIVE = 1,
}
export interface Role {
    id: number;
    name: string;
    status: string;
    created_at?: Date | string;
    updated_at?: Date | string;
    permissions: Permission[];
}
export interface RoleForm {
    name: string;
    status?: string;
    permissions: number[];
}
export interface Permission {
    id: number;
    name: string;
    status: string;
    created_at?: Date | string;
    updated_at?: Date | string;
}
export enum Gender {
    MALE = 0,
    FEMALE = 1,
}

export interface User {
    id: number;
    email: string;
    full_name: string;
    first_name: string;
    last_name: string;
    phone: string;
    province_id: number | string;
    ward_id: number | string;
    district_id: number | string;
    address: string;
    avatar: string;
    description: string;
    gender: string;
    status: {
        value: UserStatus;
        name: string;
    };
    birthday: Date | string;
    roles: Role[];
    email_verified_at?: string;
    created_at?: string;
    updated_at?: string;
}

export interface UserFields {
    email: string;
    full_name?: string;
    first_name: string;
    last_name: string;
    phone: string;
    province_id: number | string;
    ward_id: number | string;
    district_id: number | string;
    address: string;
    avatar: string;
    description: string;
    gender: string;
    birthday: Date | string;
    created_at?: string;
    updated_at?: string;
}
