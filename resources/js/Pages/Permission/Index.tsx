import { DataProps } from '@/Types'
import { Permission as PermissionType } from '@/Types/user'


const Permission = (props: DataProps<PermissionType>) => {
    const { data: permissions } = props.listData;
    console.log(permissions);
    return (
        <div>Permission</div>
    )
}

export default Permission