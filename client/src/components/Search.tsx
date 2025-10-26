import { SearchIcon } from 'lucide-react'
// import React from 'react'

interface SearchProps{
    onSearch: (query: string) => void;
}
const Search = ({onSearch}:SearchProps) => {
  return (
    <div className='relative flex flex-col space-y-2'>
       <label htmlFor="search" className='font-primary text-[16px] font-body'>Search</label> 
      <input type="text" className='input-base' name='search' placeholder='search here...' onChange={(e)=>onSearch(e.target.value)}/>
      <SearchIcon strokeWidth={1.3} className='absolute top-10 left-2 '/>
    </div>
  )
}

export default Search
