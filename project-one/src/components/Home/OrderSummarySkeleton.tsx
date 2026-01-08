import Skeleton from "@mui/material/Skeleton";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export default function OrderSummarySkeleton() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton width="80%" />
      </TableCell>
      <TableCell>
        <Skeleton width="70%" />
      </TableCell>
      <TableCell align="right">
        <Skeleton width="60%" />
      </TableCell>
      <TableCell align="right">
        <Skeleton width="60%" />
      </TableCell>
      <TableCell align="right">
        <Skeleton width="60%" />
      </TableCell>
      <TableCell align="right">
        <Skeleton width="60%" />
      </TableCell>
      <TableCell align="right">
        <Skeleton width="60%" />
      </TableCell>
      <TableCell align="right">
        <Skeleton width="60%" />
      </TableCell>
      <TableCell>
        <Skeleton variant="circular" width={24} height={24} />
      </TableCell>
    </TableRow>
  );
}
