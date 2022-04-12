const Logo = ({ size = 40 }) => {
  return (
    <span className="flex justify-center items-center gap-2">
      <img src="/logo.png" width={size} />
    </span>
  );
};

export default Logo;
