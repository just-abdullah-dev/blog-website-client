import { XCircle } from 'lucide-react';
import React from 'react';

export default function Error({message}) {
    return (
        <div className='flex justify-center items-center h-96 w-full text-red-600 text-xl'>
            <div className='grid gap-6'>
                <div className='flex justify-center items-center'><XCircle size={64} strokeWidth={1} /></div>

                <p>{message}</p>
            </div>
        </div>
    )
}
