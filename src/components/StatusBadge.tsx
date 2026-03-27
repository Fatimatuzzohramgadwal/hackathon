const statusStyles: Record<string, string> = {
  applied: "bg-info/10 text-info",
  shortlisted: "bg-warning/10 text-warning",
  interview: "bg-primary/10 text-primary",
  selected: "bg-success/10 text-success",
  rejected: "bg-destructive/10 text-destructive",
  pending: "bg-muted text-muted-foreground",
  active: "bg-success/10 text-success",
  closed: "bg-muted text-muted-foreground",
  open: "bg-info/10 text-info",
};

const StatusBadge = ({ status }: { status: string }) => {
  const style = statusStyles[status.toLowerCase()] || "bg-muted text-muted-foreground";
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${style}`}>
      {status}
    </span>
  );
};

export default StatusBadge;
