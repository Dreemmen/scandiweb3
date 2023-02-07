import { Children } from "react";

export default function Topbar({children}) {
    return (
        <>
        <div className='topbar vertical-center glassy1'>
            <div className='site-title'>Scandiweb junior web developer test</div>
            <nav className='navbar-top'>{children}</nav>
        </div>
        </>
    )
}