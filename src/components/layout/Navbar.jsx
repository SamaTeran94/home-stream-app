import { BiCameraMovie } from 'react-icons/bi'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Navbar = ({ title }) => {
    return (
        <div className="navbar bg-black">
            <div className='flex-1 justify-between lg:justify-around'>
                <div className="flex items-center">
                    <Link to='/' className="btn btn-ghost normal-case text-xl"><BiCameraMovie className='mr-1' /> {title}</Link>
                </div>
                <div className="flex">
                    <ul className="menu menu-horizontal px-1">
                        <li><Link to='/movies'>Movies</Link></li>
                        <li><Link to='/tvshows'>TV Shows</Link></li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

Navbar.defaultProps = {
    title: 'HomeStream'
}

Navbar.propTypes = {
    title: PropTypes.string
}

export default Navbar
