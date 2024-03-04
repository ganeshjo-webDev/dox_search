'use client';
import React, { useState } from 'react';
import { SearchInput } from './components/Search';
import { SearchResults } from './components/searchResults';
import { store } from './lib/store';
import { Provider } from 'react-redux';
function Home() {
    return (
            <main className="min-h-screen flex-col items-center justify-between p-24 shadow-md">
                <Provider store={store()}>
                    <SearchInput />
                    <SearchResults />
                </Provider>
            </main>
    );
}

export default Home;