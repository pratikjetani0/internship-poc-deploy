import { usePayments } from "../api/payment.queries";
import {
  CreditCard,
  Calendar,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  Smartphone,
  Banknote,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { CommonTable } from "@/components/common/table/CommonTable";
import type { CommonTableColumn } from "@/components/common/table/common-table.types";
import { useMemo } from "react";
import { Badge } from "@/components/ui/badge";
import type { Payment, PaymentMethod } from "../types/payment.types";
import { parseDate } from "@/lib/date";

export default function AdminPaymentsPage() {
  const { data: payments, isPending } = usePayments();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "SUCCESS":
        return (
          <Badge className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 gap-1 font-bold">
            <CheckCircle2 className="size-3.5" />
            SUCCESS
          </Badge>
        );
      case "PENDING":
        return (
          <Badge className="bg-amber-500/10 text-amber-600 border-amber-500/20 gap-1 font-bold">
            <Clock className="size-3.5" />
            PENDING
          </Badge>
        );
      case "FAILED":
        return (
          <Badge className="bg-rose-500/10 text-rose-600 border-rose-500/20 gap-1 font-bold">
            <XCircle className="size-3.5" />
            FAILED
          </Badge>
        );
      default:
        return (
          <Badge variant="outline" className="gap-1 font-bold">
            <AlertCircle className="size-3.5" />
            {status}
          </Badge>
        );
    }
  };
  const getMethodBadge = (method: PaymentMethod) => {
    const map: Record<
      PaymentMethod,
      { label: string; Icon: typeof CreditCard }
    > = {
      CARD: { label: "Card", Icon: CreditCard },
      UPI: { label: "UPI", Icon: Smartphone },
      COD: { label: "Cash on Delivery", Icon: Banknote },
    };
    const { label, Icon } = map[method] ?? {
      label: method,
      Icon: CreditCard,
    };
    return (
      <Badge variant="outline" className="gap-1.5 font-semibold text-muted-foreground">
        <Icon className="size-3.5" />
        {label}
      </Badge>
    );
  };

  const columns = useMemo<CommonTableColumn<Payment>[]>(
    () => [
      {
        id: "transactionId",
        header: "Transaction ID",
        cell: (payment) => (
          <span className="font-bold text-sm tracking-tight text-foreground">
            {payment.transactionId}
          </span>
        ),
      },
      {
        id: "orderId",
        header: "Order ID",
        cell: (payment) => (
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            #{payment.orderId.slice(-8)}
          </span>
        ),
      },
      {
        id: "createdAt",
        header: "Date & Time",
        sortable: true,
        getSortValue: (row) => parseDate(row.createdAt).getTime(),
        cell: (payment) => (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
            <Calendar className="size-3.5" />
            {parseDate(payment.createdAt).toLocaleString()}
          </div>
        ),
      },
      {
        id: "amount",
        header: "Amount",
        sortable: true,
        getSortValue: (row) => Number(row.amount),
        cell: (payment) => (
          <span className="font-black text-foreground">
            ₹{Number(payment.amount).toLocaleString()}
          </span>
        ),
      },
      {
        id: "method",
        header: "Method",
        sortable: true,
        getSortValue: (row) => row.method,
        cell: (payment) => getMethodBadge(payment.method),
      },
      {
        id: "status",
        header: "Status",
        cell: (payment) => getStatusBadge(payment.status),
      },
    ],
    []
  );

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground flex items-center gap-3">
            <CreditCard className="size-8 text-primary" />
            <span>Payments & Settlements</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Monitor transaction histories, checkout gateways, and review
            settlement statuses for all incoming store orders.
          </p>
        </div>
      </div>

      {/* Analytics Mini-Cards */}
      {payments && payments.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="rounded-2xl border-border/60 bg-card/60 backdrop-blur shadow-sm">
            <CardContent className="p-4 sm:p-5 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-emerald-500/10 text-emerald-600 shrink-0">
                <CheckCircle2 className="size-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-muted-foreground">
                  Successful Payments
                </div>
                <div className="text-xl font-black text-foreground">
                  {payments.filter((p) => p.status === "SUCCESS").length}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-border/60 bg-card/60 backdrop-blur shadow-sm">
            <CardContent className="p-4 sm:p-5 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-primary/10 text-primary shrink-0">
                <CreditCard className="size-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-muted-foreground">
                  Total Volume Processed
                </div>
                <div className="text-xl font-black text-foreground">
                  ₹
                  {payments
                    .filter((p) => p.status === "SUCCESS")
                    .reduce((sum, p) => sum + Number(p.amount), 0)
                    .toLocaleString()}
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="rounded-2xl border-border/60 bg-card/60 backdrop-blur shadow-sm">
            <CardContent className="p-4 sm:p-5 flex items-center gap-4">
              <div className="p-3 rounded-2xl bg-amber-500/10 text-amber-600 shrink-0">
                <Clock className="size-6" />
              </div>
              <div>
                <div className="text-sm font-bold text-muted-foreground">
                  Pending / Failed
                </div>
                <div className="text-xl font-black text-foreground">
                  {payments.filter((p) => p.status !== "SUCCESS").length}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Main Table Card */}

      <CommonTable
        columns={columns}
        data={payments ?? []}
        getRowKey={(payment) => payment.id}
        loading={isPending}
        emptyIcon={<CreditCard className="size-12 text-muted-foreground/50" />}
        emptyTitle="No Payment Transactions"
        emptyDescription="No payment transactions found in the system yet."
      />
    </div>
  );
}
