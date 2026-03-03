import React from "react";
import { useContext } from "react";
import { authContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
    Navbar,
    NavbarBrand,
    NavbarMenuToggle,
    NavbarMenuItem,
    NavbarMenu,
    NavbarContent,
    NavbarItem,
    Link,
    Button,
} from "@heroui/react";
import { NavLink } from "react-router-dom";

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);

    const { isLogin, setLogin, userData } = useContext(authContext)

    const navigate = useNavigate()

    const links = ['Home', 'Profile']

    const auths = [{ path: '/', link: 'Login' }, { path: '/register', link: 'Register' }]

    const menuItems = [
        "Home",
        "Profile",
        "Login",
        "Register",
        "Log Out",
    ];

    function LogOut() {
        localStorage.removeItem('token')
        setLogin(null)
        navigate('/')
    }

    return (
        <Navbar isBordered isMenuOpen={isMenuOpen} onMenuOpenChange={setIsMenuOpen} maxWidth="xl">
            <NavbarContent className="sm:hidden" justify="start">
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
            </NavbarContent>

            <NavbarContent className="sm:hidden pr-3" justify="center">
                <NavbarBrand>

                    <NavLink to={'/home'} className="font-bold text-inherit">Social App</NavLink>
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarBrand>

                    <NavLink to={'/home'} className="font-bold text-inherit">Social App</NavLink>
                </NavbarBrand>



            </NavbarContent>


            {!isLogin &&
                <NavbarContent justify="end" className="hidden sm:flex gap-4">
                    {auths.map((link) => (
                        <NavbarItem key={link}>
                            <NavLink color="foreground" to={`${link.path}`}>
                                {link.link}
                            </NavLink>
                        </NavbarItem>))}
                </NavbarContent>
            }

            {isLogin &&
                <NavbarContent justify="end" className="hidden sm:flex gap-4">
                    <NavbarItem>
                        <p className="cursor-pointer" onClick={LogOut}><i className="fa-solid fa-arrow-right-to-bracket"></i></p>
                    </NavbarItem>
                </NavbarContent>
            }

            {isLogin && <>
                <NavLink to={'/profile'} className="flex gap-3 items-center">
                    <span className="hidden sm:flex">{userData?.name}</span>
                    <img src={userData?.photo} alt="User Profile Image" className="w-8 h-8 rounded-full object-cover" />

                </NavLink>
            </>}

            <NavbarMenu>
                {menuItems.map((item, index) => (
                    <NavbarMenuItem key={`${item}-${index}`}>
                        <NavLink
                            className="w-full"
                            color={
                                index === 2 ? "warning" : index === menuItems.length - 1 ? "danger" : "foreground"
                            }
                            to={`/${item}`}
                            size="lg"
                        >
                            {item}
                        </NavLink>
                    </NavbarMenuItem>
                ))}
            </NavbarMenu>
        </Navbar>
    );
}

