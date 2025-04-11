import * as React from "react";

import { cn } from "../../lib/utils";

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <table
    ref={ref}
    className={cn("w-full border-collapse border-2 border-black", className)}
    {...props}
  />
));
Table.displayName = "Table";

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("bg-gray-200 border-b-2 border-black", className)} {...props} />
));
TableHeader.displayName = "TableHeader";

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr ref={ref} className={cn("border-b border-black", className)} {...props} />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn("px-4 py-2 text-left font-semibold border-r-2 border-black", className)}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody ref={ref} className={cn("bg-white", className)} {...props} />
));
TableBody.displayName = "TableBody";

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("px-4 py-2 border-r-2 border-black", className)}
    {...props}
  />
));
TableCell.displayName = "TableCell";

export { Table, TableHeader, TableRow, TableHead, TableBody, TableCell };