// Redirect from addresses of old Vue version of portfolio, ensuring that links continue to work.

import { useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";

interface RedirectHandlerProps {
  children: ReactNode;
}

const RedirectHandler: React.FC<RedirectHandlerProps> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const hash = window.location.hash;

    const match = hash.match(/^#\/project\/(.+)/);

    if (match) {
      const projectId = match[1];

      const projectRedirects: { [key: string]: string } = {
        grid: `/project/grid`,
        run: `/project/runner`,
        cactris: `/project/cactris`,
        trees: `/project/trees`,
        lamplight: `/project/lamplight`,
        forest: `/project/forest`,
        okeeffe: "/project/okeeffe",
        ocean: "/project/explocean",
        nature: "/project/nature",
      };

      const redirectPath =
        projectRedirects[projectId] || `/project/${projectId}`;
      router.replace(redirectPath);
    }
  }, [router]);

  return <>{children}</>;
};

export default RedirectHandler;
