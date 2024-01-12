import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar';
import { clerkClient } from '@clerk/nextjs';

interface RecentSalesProps {
  name: string;
  price: number;
}

export async function RecentSales({ name, price }: RecentSalesProps) {
  const user = await clerkClient.users.getUser(name);

  const fullName = `${user.firstName} ${user.lastName}`;
  const initials = `${user.firstName![0]}${user.lastName![0]}`;

  const userEmail = user.emailAddresses[0].emailAddress;
  return (
    <div className="flex items-center">
      <Avatar className="h-9 w-9">
        <AvatarImage src="/avatars/01.png" alt="Avatar" />
        <AvatarFallback>{initials}</AvatarFallback>
      </Avatar>
      <div className="ml-4 space-y-1">
        <p className="text-sm font-medium leading-none">{fullName}</p>
        <p className="text-sm text-muted-foreground">{userEmail}</p>
      </div>
      <div className="ml-auto font-medium">+${price}</div>
    </div>
  );
}
