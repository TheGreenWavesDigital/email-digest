import { Suspense } from "react";
import ProfileClient from "./ProfileClient";

// Optional: disable any caching/SSG for this page (keeps it always dynamic)
export const revalidate = 0;

export default function ProfilePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-white">
          Loading Profile...
        </div>
      }
    >
      <ProfileClient />
    </Suspense>
  );
}
