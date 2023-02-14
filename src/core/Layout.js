import {Fragment} from 'react';
import Link from 'next/link';
import { isAuth, signout } from 'context/AuthContext';
import { useRouter } from 'next/router';

const Layout = ({children}) => {
    const router = useRouter()
    const nav = () => (
        <ul className='nav nav-tabs bg-primary'>
            <li className='nav-item nav-link '>
                <Link href='/' className='text-light'>
                    Home
                </Link>
            </li>
            {
                isAuth() && (
                       <>
                        <li className='nav-item nav-link '>
                            <h1 className='text-light'>
                                {isAuth().name}
                            </h1>
                        </li>
                        <li className='nav-item nav-link '>
                            <h1 className='text-light' onClick={() => {
                                signout(() => {
                                    router.push('/')
                                })
                            }}>
                                Logout
                            </h1>
                        </li>
                       </>
                )
            }

            {
               !isAuth() && (
                       <>
                        <li className='nav-item nav-link '>
                            <Link href='/signup' className='text-light'>
                                Signup
                            </Link>
                        </li>
                        <li className='nav-item nav-link '>
                            <Link href='/signin' className='text-light'>
                                Signin
                            </Link>
                        </li>
                       </>
                )
            }


        </ul>
    )
    return(
        <Fragment>
            {nav()}
            <div className="container">{children}</div>
        </Fragment>
    )
}

export default Layout;