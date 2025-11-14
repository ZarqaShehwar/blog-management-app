import Navbar from '@/components/Navbar/Navbar';
import React from 'react';
const PublicPagesLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <>
        <Navbar/>
        <div className='w-full h-[calc(100vh-80px)]'>
            {children}
            </div>
        </>
    )
};
export default PublicPagesLayout;