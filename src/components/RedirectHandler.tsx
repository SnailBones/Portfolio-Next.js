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

    const path = window.location.pathname;
    const pathMatch = path.match(/^\/(games|web|other)\/(.+)/);

    if (pathMatch) {
      const projectId = pathMatch[2];
      console.log("pathMatch is", pathMatch);
      const redirectPath = `/project/${projectId}`;
      console.log("redirecting to", redirectPath);
      router.replace("");
    }
  }, [router]);

  return <>{children}</>;
};

export default RedirectHandler;
