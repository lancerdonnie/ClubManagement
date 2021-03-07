const Container = ({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div className={`h-full overflow-auto px-4 pt-3 relative ${className ?? ''}`} {...props}>
      {children}
    </div>
  );
};

export default Container;
