import Link from 'next/link';
import useSWR from 'swr';
import { Menu, Icon } from 'semantic-ui-react';
import { useUser } from '@/hooks/use-user';
import { fetchUnreadNotificationCount } from '@/lib/database';

const NotificationIcon = () => {
  const [user] = useUser();

  const { data: count, error } = useSWR(
    user ? 'unreadNotificationCount' : null,
    () => fetchUnreadNotificationCount(user!.uid)
  );

  if (error) {
    console.error(error);
  }

  return (
    <Link href="/notifications" passHref>
      <Menu.Item>
        <Icon.Group>
          <Icon name="bell" />
          {!!count && <Icon name="circle" color="red" corner="top right" />}
        </Icon.Group>
      </Menu.Item>
    </Link>
  );
};

export default NotificationIcon;
