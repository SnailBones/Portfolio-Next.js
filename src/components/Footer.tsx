import React from "react";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="footer">
            <div id="footer-links">
                <a
                    className="smallfade icon-container"
                    href="https://github.com/SnailBones"
                >
                    <Image
                        src="/link-icons/GitHub-Mark-Light-64px.png"
                        alt="Github"
                        width={48}
                        height={48}
                    />
                    {/* <img src="/link-icons/GitHub-Mark-Light-64px.png" /> */}
                </a>
                <a
                    className="smallfade icon-container"
                    href="https://codepen.io/snailbones"
                >
                    <Image
                        src="/link-icons/codepenlogo.png"
                        alt="Codepen"
                        width={48}
                        height={48}
                    />
                </a>
                <a
                    className="smallfade icon-container"
                    href="https://www.shadertoy.com/user/ailanthus"
                    style={{
                        color: "white",
                        fontFamily: "Lobster,Tahoma,Arial",
                        fontSize: "36px",
                    }}
                >
                    S
                </a>
                <div>
                    <a
                        className="smallfade icon-container"
                        href="https://medium.com/@snailbones"
                    >
                        <Image
                            src="/link-icons/medium.png"
                            alt="Medium"
                            width={48}
                            height={48}
                        />
                    </a>
                </div>
                <div>
                    <a
                        className="smallfade icon-container"
                        href="https://ailanthus.itch.io/"
                    >
                        <Image
                            src="/link-icons/itch.png"
                            alt="Itch.io"
                            width={48}
                            height={48}
                        />
                    </a>
                </div>
            </div>
        </footer>
    );
}
