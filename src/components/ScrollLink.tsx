"use client";

import React from "react";
import { smoothScrollTo } from "@/utils";

export default function ScrollLink({
    to,
    children,
}: {
    to: string;
    children: React.ReactNode;
}) {
    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        smoothScrollTo(to);
    };

    return (
        <a href={to} onClick={handleClick}>
            {children}
        </a>
    );
}
