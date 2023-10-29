import React, { useEffect, useState, ReactNode } from "react";
import Footer from "./footer";


type LayoutProps = {
    children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
    const [showFooter, setShowFooter] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const windowHeight = window.innerHeight;
            const scrollY = window.scrollY;
            const documentHeight = document.body.scrollHeight;

            if (windowHeight + scrollY >= documentHeight) {
                setShowFooter(true);
            } else {
                setShowFooter(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div>
            {children}
            <div className={showFooter ? "show-footer" : "hidden-footer"}>
                <Footer />
            </div>
        </div>
    );
};

export default Layout;
