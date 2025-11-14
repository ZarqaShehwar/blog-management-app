"use client";

import React, { useState } from "react";
import {
  useDeleteBlogsMutation,
  useGetBlogByUserQuery,
} from "@/lib/services/blogApi";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  ColumnDef,
  flexRender,
} from "@tanstack/react-table";
import { Edit2, Trash2 } from "lucide-react";
import { BlogPost } from "@/types";
import EditBlogForm from "../Blogs/EditPost";
import EditBlogDialog from "../Blogs/EditPost";

export default function BlogTable() {
  const { data: blogs, isLoading } = useGetBlogByUserQuery({});
  const [deleteBlogs, { isLoading: deleting }] = useDeleteBlogsMutation();

  const posts: BlogPost[] = blogs?.data?.post || [];
  const [selected, setSelected] = useState<string[]>([]);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [editBlog, setEditBlog] = useState<BlogPost | null>(null);

  // Select all
  const toggleSelectAll = (checked: boolean) => {
    setSelected(checked ? posts.map((b) => b._id) : []);
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const handleDelete = async () => {
    try {
      await deleteBlogs(selected).unwrap();
      toast.success("Deleted successfully!");
      setSelected([]);
      setIsConfirmOpen(false);
    } catch {
      toast.error("Delete failed");
    }
  };

  const columns: ColumnDef<BlogPost>[] = [
    {
      id: "select",
      header: () => (
        <Checkbox
          checked={selected.length === posts.length && posts.length > 0}
          onCheckedChange={(checked) => toggleSelectAll(!!checked)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={selected.includes(row.original._id)}
          onCheckedChange={() => toggleSelect(row.original._id)}
        />
      ),
      size: 50,
    },
    {
      accessorKey: "image",
      header: "Image",
      cell: ({ getValue }) => (
        <img
          src={getValue() as string}
          alt="blog"
          className="w-14 h-14 object-cover rounded-md"
        />
      ),
    },
    {
      accessorKey: "title",
      header: "Title",
      cell: ({ getValue }) => (
        <span className="font-medium text-wrap ">{getValue() as string}</span>
      ),
    },
   {
  accessorKey: "content",
  header: () => <span className="hidden md:inline">Description</span>,
  cell: ({ getValue }) => {
    const html = getValue() as string;

    return (
      <div
        className="text-muted-foreground hidden md:block line-clamp-3 prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  },
},
    {
      id: "actions",
      header: "Action",
      cell: ({ row }) => (
       <EditBlogDialog  blog= {row.original}/>
      ),
    },
  ];

  const table = useReactTable({
    data: posts,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  if (isLoading) return <p className="p-4">Loading...</p>;

  return (
    <div className="space-y-6 w-full  ">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold">Manage Blogs</h1>
        <Button
          size="sm"
          onClick={() =>
            selected.length > 0
              ? setIsConfirmOpen(true)
              : toast.info("No blogs selected")
          }
          disabled={selected.length === 0 || deleting}
          className="flex items-center gap-2"
        >
          <Trash2 className="w-4 h-4" />
          {deleting ? "Deleting..." : `Delete (${selected.length})`}
        </Button>
      </div>
      {
        isLoading ? (
<div className="w-full h-full grid place-content-center">
      <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-300 border-t-black" />
    </div>
        ) : (
          <>
 <div className="border rounded-lg">
        <Table className="min-w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="bg-muted/50">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody className="w-full">
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="hover:bg-muted/30">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center py-6">
                  No blogs found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center pt-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <span className="text-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
      </>
        )
      }

      {/* Table */}
     

      {/* Confirm Delete Modal */}
      <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            Are you sure you want to delete {selected.length} blog(s)?
          </p>
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setIsConfirmOpen(false)}>
              Cancel
            </Button>
            <Button  onClick={handleDelete}>
              Confirm
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

     
    </div>
  );
}
