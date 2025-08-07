import React from 'react'
import * as BsIcons from 'react-icons/bs';


type IconCardProps = {
    number?: string;
    color?: string;
    iconName: string;
    title: string;
    subtitle: string;
  };


const IconCardComponent = ({ iconName, title, subtitle, number, color }: IconCardProps) => {
    const Icon = (BsIcons as any)[iconName];

    return (
        <>
            {number ? 
                <div 
                    className='rounded-full p-3 w-14 font-bold absolute top-[-30px] text-white shadow-(--shadow-soft)'
                    style={{ backgroundColor: color }}
                >
                    {number}
                </div> 
                : null
            }
            <div className={`p-3 bg-gray-200 rounded-full ${number ? 'mt-4' : ''}`}>
                <Icon size={25} strokeWidth={0.3} />
            </div>
            <h3 className='text-xl font-semibold py-4'>{title}</h3>
            <p className='text-center'>{subtitle}</p>
        </>
    )
}

export default IconCardComponent
