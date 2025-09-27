"use client";

import React from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { usePathname } from "next/navigation";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from "next/link";

export default function Layout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHome = pathname === '/';

    // Path'i parçalara ayır ve boş olanları filtrele
    const pathSegments = pathname.split('/').filter(segment => segment !== '');

    return (
        <div className=" bg-white">
            <Navbar />
            
            {/* Ana sayfada breadcrumb gösterme */}
            {!isHome && (
                <div className=" container mx-auto px-4 py-2">
                    <Breadcrumb>
                        <BreadcrumbList>
                            {/* Ana Sayfa */}
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link href="/">Ana Sayfa</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            
                            {/* Her path segmenti için */}
                            {pathSegments.map((segment, index) => {
                                const href = '/' + pathSegments.slice(0, index + 1).join('/');
                                const isLast = index === pathSegments.length - 1;
                                
                                return (
                                    <React.Fragment key={href}>
                                        <BreadcrumbSeparator />
                                        <BreadcrumbItem>
                                            {isLast ? (
                                                // Son segment - tıklanamaz
                                                <BreadcrumbPage className="text-gray-500">
                                                    {segment.replace(/-/g, ' ')}
                                                </BreadcrumbPage>
                                            ) : (
                                                // Diğer segmentler - tıklanabilir
                                                <BreadcrumbLink asChild>
                                                    <Link href={href}>
                                                        {segment.replace(/-/g, ' ')}
                                                    </Link>
                                                </BreadcrumbLink>
                                            )}
                                        </BreadcrumbItem>
                                    </React.Fragment>
                                );
                            })}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            )}
            
            {children}
            <Footer />
        </div>
    );
}