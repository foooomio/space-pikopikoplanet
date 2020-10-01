import Link from 'next/link';
import { Menu } from 'semantic-ui-react';
import DropdownMenu from '@/components/common/menu';
import NotificationIcon from '@/components/notification/icon';

const Navbar = () => {
  return (
    <Menu as="header" inverted borderless>
      <Link href="/">
        <a>
          <Menu.Item header as="h1">
            <span className="star">☆</span>
            <span className="title">ピコピコプラネット</span>
            <span className="star">☆</span>
            <span className="subtitle">SPACE</span>
          </Menu.Item>
        </a>
      </Link>
      <Menu.Menu position="right">
        <NotificationIcon />
        <DropdownMenu />
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
