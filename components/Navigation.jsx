import * as React from 'react';
import Image from 'next/image'
import Link from 'next/link';
import Logo from '../public/vendor-light.png';


export default function Navigation() {

    return (
        <header className="w-full py-4 border-b border-gray-400">
            <nav className="flex items-center justify-center flex-wrap">
                <Link href="/" className="flex items-center text-gray-700 font-bold">
                    <Image 
                        src={Logo} alt="Vendor"
                        height={60}
                        width={60}
                    />
                </Link>
            </nav>
        </header>
    );
}