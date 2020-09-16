import Link from 'next/link';
import { Menu, Dropdown } from 'semantic-ui-react';
import { useUser } from '@/lib/user-context';
import firebase from '@/lib/firebase';

export default function Navbar() {
  const [user] = useUser();

  const dropdownMenuItems = user ? (
    <>
      <Link href="/compose" passHref>
        <Dropdown.Item text="新規作成" icon="file outline" />
      </Link>
      <Link href="/settings" passHref>
        <Dropdown.Item text="設定" icon="cog" />
      </Link>
      <Dropdown.Divider />
      <Dropdown.Item
        text="サインアウト"
        icon="sign-out"
        onClick={() => firebase.auth().signOut()}
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
}
