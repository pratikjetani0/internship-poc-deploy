export type DashboardDomainProps = {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  paidOrders: number;
};

export class DashboardDomain {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
  paidOrders: number;

  constructor(props: DashboardDomainProps) {
    this.totalUsers = props.totalUsers;
    this.totalProducts = props.totalProducts;
    this.totalOrders = props.totalOrders;
    this.totalRevenue = props.totalRevenue;
    this.pendingOrders = props.pendingOrders;
    this.paidOrders = props.paidOrders;
  }
}
