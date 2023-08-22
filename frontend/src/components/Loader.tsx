import { Ring } from "@uiball/loaders";

const Loader = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-dark">
      <Ring size={40} speed={1.6} color="#525252" />
    </div>
  );
};

export default Loader;
