import { AiOutlineMail } from 'react-icons/ai'
import { FaFacebookF } from 'react-icons/fa'

const Footer = () => {

    const footerYear = new Date().getFullYear()

    return (
        <footer className="items-center p-4 bg-neutral text-neutral-content">
            <div className='flex flex-col sm:flex-row justify-between lg:justify-around items-center gap-3 sm:gap-0'>
                <div className="items-center flex">
                    <h1>HomeStream</h1>
                </div>
                <div className="items-center flex">
                    <p>Copyright © {footerYear} - All right reserved</p>
                </div>
                <div className="flex items-center gap-2">
                    <a><AiOutlineMail className='w-8 h-8' /></a>
                    <a><FaFacebookF className='w-7 h-7' /></a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
