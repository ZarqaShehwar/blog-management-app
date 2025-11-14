
import Index from "@/components/dashboard";
import { DashboardLayoutProps } from "@/types";


export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <html lang="en">
      <body className="bg-gray-50 w-full">
              <Index children={children}/>
      </body>
    </html>
  );
}
