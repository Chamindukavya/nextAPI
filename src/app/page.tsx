'use client'
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  

  const goToNotePage = () => {
    router.push(`/notepage/${"67b02cd1559133a0fa4a1565"}`);
  }

  return (
    <div>
      <h1>Home page</h1>
      <button onClick={goToNotePage}>Go to note page</button>
    </div>
  );
}
