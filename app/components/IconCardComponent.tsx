import React from 'react'
import * as BsIcons from 'react-icons/bs';


type IconCardProps = {
    iconName: string;
    title: string;
    subtitle: string;
  };


const IconCardComponent = ({ iconName, title, subtitle }: IconCardProps) => {
    const Icon = (BsIcons as any)[iconName];

    return (
        <>
            <div className='p-3 bg-gray-200 rounded-full'>
                <Icon size={25} strokeWidth={0.3} />
            </div>
            <h3 className='text-xl font-semibold py-2'>{title}</h3>
            <p className='text-center'>{subtitle}</p>
        </>
    )
}

export default IconCardComponent
