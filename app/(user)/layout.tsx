import { Toaster } from "@/components/ui/sonner";

export default function UserLayout({
  children,
  header,
}: {
  children: React.ReactNode;
  header: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-svh overflow-hidden">
      {header}
      <main className="flex-1 overflow-y-auto">{children}</main>
      <Toaster />
    </div>
  );
}
