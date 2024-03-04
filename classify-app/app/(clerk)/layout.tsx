interface ClerkLayoutProps {
  children: React.ReactNode;
}

const ClerkLayout = ({ children }: ClerkLayoutProps) => {
  return (
    <main className="h-full w-full flex items-center justify-center">
      {children}
    </main>
  );
};

export default ClerkLayout;
