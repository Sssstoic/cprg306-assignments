// /app/week-5/page.js

"use client";  // Mark this file as a Client Component

import NewItem from './new-item';

export default function Week5Page() {
  return (
    <div>
      <NewItem />  {/* Renders just the form, no extra heading */}
    </div>
  );
}
