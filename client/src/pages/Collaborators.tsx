import Search from "../components/Search";
import UserList from "../components/UserList";
import { useQuery } from "@tanstack/react-query";
import { findAllUsers } from "../apis/user.apis";
import Loader from "../components/Loader";
import { useState, useEffect } from "react";
import Pagination from "../components/Pagination";
import type { CollaboratorResponse } from "../types/Collaborators.types";
import { Divide, Funnel, X } from "lucide-react";

const Collaborators = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
  const [sortBy, setSortBy] = useState("email");
  const [orderBy, setOrderBy] = useState("desc");
  const [openSortModel, setOpenSortModel] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  const { data, isLoading, error } = useQuery<CollaboratorResponse>({
    queryKey: ["users", page, debouncedSearch, sortBy],
    queryFn: () =>
      findAllUsers({
        page,
        search: searchQuery,
        sortBy: sortBy,
        orderBy: orderBy,
      }),
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  return (
    <div className="flex flex-col space-y-3 flex-1">
      <h2>Team Management</h2>
      <p> Manage team members and their access levels</p>
      <div className="flex items-center  justify-between space-x-4 relative">
        <div className="basis-11/12">
          <Search onSearch={handleSearch} />
        </div>
        <span
          onClick={() => setOpenSortModel(!openSortModel)}
          className="flex justify-center cursor-pointer  items-center gap-2 basis-1/12 relative top-3 bg-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 active:bg-neutral-300 dark:active:bg-neutral-900 dark:bg-neutral-800 p-2 rounded-md "
        >
          Sort by <Funnel strokeWidth={1.3} />
        </span>
        {openSortModel && (
          <div className="absolute flex flex-col right-2 bg-neutral-100 dark:bg-neutral-800 min-w-28 space-y-2 top-20">
            <span className="absolute right-0 cursor-pointer" onClick={()=>setOpenSortModel(false)}>
              <X />
            </span>
            <span
              className="border-b cursor-pointer hover:bg-neutral-50 hover:dark:bg-neutral-600 active:bg-neutral-200 dark:active:bg-neutral-900 p-2 border-neutral-200 dark:border-neutral-700"
              onClick={() => setSortBy("name")}
            >
              Name
            </span>
            <span
              className="border-b cursor-pointer hover:bg-neutral-50 hover:dark:bg-neutral-600 active:bg-neutral-200 dark:active:bg-neutral-900 p-2 border-neutral-200 dark:border-neutral-700"
              onClick={() => setSortBy("email")}
            >
              Email
            </span>
            <span
              className="border-b cursor-pointer hover:bg-neutral-50 hover:dark:bg-neutral-600 active:bg-neutral-200 dark:active:bg-neutral-900 p-2 border-neutral-200 dark:border-neutral-700"
              onClick={() => setSortBy("role")}
            >
              Role
            </span>
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="w-full flex justify-center">
          <Loader />
        </div>
      ) : error ? (
        <div className="text-red-500 py-4 w-full text-center">
          Error loading users: {error.message}
        </div>
      ) : data && data.users && data?.users.length > 0 ? (
        <>
          <UserList users={data.users} />
          <Pagination
            currentPage={data.currPage}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        </>
      ) : (
        <>
          <p className="w-full text-center">No user found</p>
        </>
      )}
    </div>
  );
};

export default Collaborators;
