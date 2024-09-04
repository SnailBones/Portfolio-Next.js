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
        grid: `/web/grid`,
        run: `/games/runner`,
        cactris: `/games/cactris`,
        trees: `/games/trees`,
        lamplight: `/games/lamplight`,
        forest: `/games/forest`,
        okeeffe: "/web/okeeffe",
        ocean: "/games/explocean",
        nature: "other/nature",
      };

      const redirectPath = projectRedirects[projectId] || `/games/${projectId}`;
      router.replace(redirectPath);
    }
  }, [router]);

  return <>{children}</>;
};

export default RedirectHandler;
