import React, { useRef, useEffect, useState } from 'react';

function SearchBar1({ }) {
    return (
        <React.Fragment>

{/* relative bg-indigo-200 dark:bg-indigo-500 p-4 sm:p-6 rounded-sm overflow-hidden mb-8 */}
        <div className="relative p-2 sm:p-2 rounded-sm mb-8 z-20">
            <form className="max-w-lg mx-auto">
                <div className="flex">
                    <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
                    <button id="dropdown-button-search" data-dropdown-toggle="dropdownSearch" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-s-lg hover:bg-gray-200 focus:ring-0 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">Stát <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg></button>
                    <div id="dropdownSearch" className="z-20 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
                        <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button-search">
                            <li>
                                <button type="button" className="inline-flex w-full px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Stát</button>
                            </li>
                            <li>
                                <button type="button" className="inline-flex w-full px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Kraje</button>
                            </li>
                            <li>
                                <button type="button" className="inline-flex w-full px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Okresy</button>
                            </li>
                            <li>
                                <button type="button" className="inline-flex w-full px-4 py-1 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Města</button>
                            </li>
                        </ul>
                    </div>
                    <div className="relative w-full">
                        <input type="search" id="search-dropdown" style={{ borderColor: "#00000022" }} className="block py-2.5 px-4 w-full z-20 text-sm font-medium text-gray-900 bg-gray-50 rounded-s-lg border focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Vyhledejte územní část..." required />
                    </div>
                </div>
            </form>
        </div>


        </React.Fragment>
    );
}

export default SearchBar1;
