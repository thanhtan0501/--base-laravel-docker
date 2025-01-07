export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at?: string;
    address: string;
    birthday: Date | string;
    description: string;
    district_id: number | string;
    first_name: string;
    last_name: string;
    full_name: string;
    gender: number | string;
    image: string;
    ip?: string;
    phone: string;
    province_id: number | string;
    role: number | string;
    user_agent?: string;
    ward_id: number | string;
    created_at?: string;
    updated_at?: string;
}
