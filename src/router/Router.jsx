import React, { useState, useEffect } from 'react';

export function Router({ children }) {
  const [currentPath, setCurrentPath] = useState(window.location.hash.slice(1) || '/');

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPath(window.location.hash.slice(1) || '/');
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return React.Children.map(children, child => {
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { currentPath });
    }
    return child;
  });
}

export function Route({ path, component: Component, currentPath }) {
  const pathRegex = new RegExp('^' + path.replace(/:\w+/g, '([^/]+)') + '$');
  const match = currentPath.match(pathRegex);
  
  if (!match) return null;
  
  const params = {};
  const paramNames = (path.match(/:\w+/g) || []).map(p => p.slice(1));
  paramNames.forEach((name, index) => {
    params[name] = match[index + 1];
  });
  
  return <Component params={params} />;
}

export function Link({ to, children, className = '' }) {
  return (
    <a href={`#${to}`} className={className} onClick={(e) => {
      e.preventDefault();
      window.location.hash = to;
    }}>
      {children}
    </a>
  );
}