import Link from "next/link";

export default function HomePage() {
  return (
    <div className="p-5 font-sans">
      <h1 className="mb-5 text-4xl font-bold">
        CPRG 306: Web Development 2 - Assignments
      </h1>
      <div className="flex flex-col space-y-3">
        <Link href="/week-2" className="text-white hover:underline hover:text-blue-600">
          Week 2 Assignment
        </Link>
        <Link href="/week-3" className="text-white hover:underline hover:text-blue-600">
          Week 3 Assignment
        </Link>
        <Link href="/week-4" className="text-white hover:underline hover:text-blue-600">
          Week 4 Assignment
        </Link>
        <Link href="/week-5" className="text-white hover:underline hover:text-blue-600">
          Week 5 Assignment
        </Link>
        <Link href="/week-6" className="text-white hover:underline hover:text-blue-600">
          Week 6 Assignment
        </Link>
        <Link href="/week-7" className="text-white hover:underline hover:text-blue-600">
          Week 7 Assignment
        </Link>
        <Link href="/week-8" className="text-white hover:underline hover:text-blue-600">
          Week 8 Assignment
        </Link>
        <Link href="/week-9" className="text-white hover:underline hover:text-blue-600">
          Week 9 Assignment
        </Link>
        <Link href="/week-10" className="text-white hover:underline hover:text-blue-600">
          Week 10 Assignment
        </Link>
      </div>
    </div>
  );
}
