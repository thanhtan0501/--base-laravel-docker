import Container from '@/Components/Container';
import { Avatar, AvatarFallback, AvatarImage } from '@/Components/ui/avatar';
import { Card, CardContent } from '@/Components/ui/card';
import { User } from '@/Types/user';
import { Head } from '@inertiajs/react';
import React from 'react';
import UserForm from './Components/UserForm';

interface EditUserProps {
    user: {
        data: User;
    };
}
const EditUser: React.FC<EditUserProps> = ({ user }) => {
    const userData = user.data;
    console.log(user);

    return (
        <Container>
            <Head title="User Edit" />
            <div className="flex flex-row items-center space-x-4">
                <Avatar className="h-14 w-14 cursor-pointer rounded-lg md:h-20 md:w-20">
                    <AvatarImage
                        src={userData.avatar}
                        alt={userData.full_name}
                    />
                    <AvatarFallback className="rounded-lg bg-primary-foreground text-xl md:text-3xl">
                        {userData.full_name.charAt(0)}
                    </AvatarFallback>
                </Avatar>
                <div className="">
                    <h1 className="text-wrap text-xl font-semibold md:text-3xl">
                        {userData.full_name}
                    </h1>
                </div>
            </div>
            <Card>
                <CardContent className="pt-6">
                    <UserForm />
                </CardContent>
            </Card>
        </Container>
    );
};

export default EditUser;
