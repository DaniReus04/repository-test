import { ReactNode } from "react";

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <div className="w-full max-w-7xl mx-auto">{children}</div>
  )
};

export default Wrapper;
