export default function VerifyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="verify-bg min-h-screen">{children}</div>;
}
