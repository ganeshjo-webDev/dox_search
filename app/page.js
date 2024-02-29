'use client';
import React, { useState } from 'react';
import { SearchInput, SearchResults } from './components/Search';
import { store } from './lib/store';
import { Provider } from 'react-redux';
function Home() {
    return (
            <main className="flex min-h-screen flex-col items-center justify-between p-24">
                <Provider store={store()}>
                    <SearchInput />
                    <SearchResults />
                </Provider>
            </main>
    );
}

export default Home;