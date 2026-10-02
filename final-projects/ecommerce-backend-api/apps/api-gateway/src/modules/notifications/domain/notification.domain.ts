export type NotificationDomainProps = {
  id?: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;
};

export class NotificationDomain {
  id?: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(props: NotificationDomainProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.title = props.title;
    this.message = props.message;
    this.type = props.type;
    this.isRead = props.isRead;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
  }
}
