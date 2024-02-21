// import Image from "next/image";

// export default function Home() {
//   return (
//     <main className="flex min-h-screen flex-col items-center justify-between p-24">
//             <Image
//               src="/vercel.svg"
//               alt="Vercel Logo"
//               className="dark:invert"
//               width={100}
//               height={24}
//               priority
//             />
//     </main>
//   );
// }

'use client';
import React, { useState } from 'react';
import { SearchInput, SearchResults } from './components/Search';
import Image from "next/image";

function Home() {
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = (searchTerm) => {
        // Perform your search here and update the state with the results.
        // This is just a dummy implementation.
        setSearchResults([searchTerm]);
    };

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
             {/* <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            /> */}
            <SearchInput onSearch={handleSearch} />
            <SearchResults results={searchResults} />
        </main>
    );
}

export default Home;