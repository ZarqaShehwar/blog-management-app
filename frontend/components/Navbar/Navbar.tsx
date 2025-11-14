import Link from "next/link";
import { Button } from "../ui/button";
import { cookies } from "next/headers";

const Navbar = async () => {
const cookieStore = await cookies();
const token = cookieStore.get("token");
  return (
    <nav className="border-b bg-card">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
            BlogApp
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/blogs">
              <Button variant="ghost">Blogs</Button>
            </Link>
            
            {token ? (
              <>
                <Link href="/dashboard">
                  <Button >Dashboard</Button>
                </Link>
                
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Login</Button>
                </Link>
                <Link href="/signup">
                  <Button>Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
