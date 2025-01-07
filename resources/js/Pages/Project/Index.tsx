import { DataProps } from '@/Types';
import { Project as ProjectType } from '@/Types/project';
import React from 'react';

interface ProjectProps {
    data: DataProps<ProjectType>;
}

const Project: React.FC<ProjectProps> = ({ data }) => {
    console.log(data);

    return <div>index</div>;
};

export default Project;
