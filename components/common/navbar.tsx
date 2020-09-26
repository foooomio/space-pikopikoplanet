import Link from 'next/link';
import { Menu, Dropdown } from 'semantic-ui-react';
import { useUser } from '@/hooks/use-user';
import firebase from '@/lib/firebase';

const Navbar = () => {
  const [user] = useUser();

  const dropdownMenuItems = user ? (
    <>
      <Link href="/compose" passHref>
        <Dropdown.Item text="新規作成" icon="file outline" />
      </Link>
      <Link href="/likes" passHref>
        <Dropdown.Item text="お気に入り" icon="heart" />
      </Link>
      <Link href="/settings" passHref>
        <Dropdown.Item text="設定" icon="cog" />
      </Link>
      <Dropdown.Divider />
      <Dropdown.Item
        text="サインアウト"
        icon="sign-out"
        onClick={() => {
          firebase.auth().signOut();
          location.href = '/sign-out';
        }}
      />
    </>
  ) : (
    <Link href="/sign-in" passHref>
      <Dropdown.Item text="サインイン" icon="sign-in" />
    </Link>
  );

  return (
    <Menu as="header" size="large" inverted borderless>
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
        <Dropdown icon="bars" item>
          <Dropdown.Menu content={dropdownMenuItems} />
        </Dropdown>
      </Menu.Menu>
    </Menu>
  );
};

export default Navbar;
