// app/dashboard/layout.tsx

'use client';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-screen h-[calc(100vh-64px)] bg-gray-100 p-[6rem]">
      {children}
    </section>
  );
}
