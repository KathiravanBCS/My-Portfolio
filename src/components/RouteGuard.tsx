"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import NotFound from "@/app/not-found";

interface RouteGuardProps {
  children: React.ReactNode;
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const [isRouteEnabled, setIsRouteEnabled] = useState(false);
  const [isPasswordRequired, setIsPasswordRequired] = useState(false);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const performChecks = async () => {
      setLoading(true);
      setIsRouteEnabled(false);
      setIsPasswordRequired(false);
      setIsAuthenticated(false);

      const checkRouteEnabled = () => {
        if (!pathname) return false;
        if (pathname in routes) {
          return routes[pathname as keyof typeof routes];
        }
        const dynamicRoutes = ["/blog", "/work"] as const;
        for (const route of dynamicRoutes) {
          if (pathname?.startsWith(route) && routes[route]) {
            return true;
          }
        }
        return false;
      };

      const routeEnabled = checkRouteEnabled();
      setIsRouteEnabled(routeEnabled);

      if (protectedRoutes[pathname as keyof typeof protectedRoutes]) {
        setIsPasswordRequired(true);
        const response = await fetch("/api/check-auth");
        if (response.ok) {
          setIsAuthenticated(true);
        }
      }

      setLoading(false);
    };

    performChecks();
  }, [pathname]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-32">
        <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin" />
      </div>
    );
  }

  if (!isRouteEnabled) {
    return <NotFound />;
  }

  if (isPasswordRequired && !isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-32 max-w-sm mx-auto gap-6">
        <h2 className="text-2xl font-bold text-center">
          This page is password protected
        </h2>
        <div className="w-full flex flex-col gap-3">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handlePasswordSubmit()}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {error && <p className="text-sm text-red-500">{error}</p>}
          <button type="button" onClick={handlePasswordSubmit} className="btn-primary justify-center">
            Submit
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
