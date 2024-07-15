import logo from '../assets/logo.png';

import { Link } from 'react-router-dom'

import { IoIosNotificationsOutline,  } from 'react-icons/io';
import { CiUser, CiShoppingCart } from 'react-icons/ci';

export default function Cabecalho () {
    
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <div className='w-full flex justify-between bg-white py-3 px-5'>

                <img src={logo} className='w-40'/>

                <div className='flex h-full items-center justify-end'>
                    <IoIosNotificationsOutline className='w-[40px] h-auto text-[#733A8E]'/>

                    <Link to="/login">
                        <CiUser className='w-[40px] h-auto text-[#733A8E]' />
                    </Link>

                    <CiShoppingCart className='w-[40px] h-auto text-[#733A8E]'/>
                
                </div>

            </div>
        </div>
    )
}

