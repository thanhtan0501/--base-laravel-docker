export interface Map {
    [key: string]: string | undefined;
}
export const ROLE: Map = {
    admin: 'Admin',
    contractor: 'Contractor',
    user: 'User',
};
export const USER_STATUS = [
    { key: 'active', value: 'Active' },
    { key: 'inactive', value: 'Inactive' },
];
