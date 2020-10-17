import Link from 'next/link';
import { Dropdown } from 'semantic-ui-react';
import { useUser } from '@/hooks/use-user';
import firebase from '@/lib/firebase';

const DropdownMenu = () => {
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
      <Link href="/sparql-guide" passHref>
        <Dropdown.Item text="エンドポイント" icon="question circle" />
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
    <>
      <Link href="/sparql-guide" passHref>
        <Dropdown.Item text="エンドポイント" icon="question circle" />
      </Link>
      <Dropdown.Divider />
      <Link href="/sign-in" passHref>
        <Dropdown.Item text="サインイン" icon="sign-in" />
      </Link>
    </>
  );

  return (
    <Dropdown icon="bars" item>
      <Dropdown.Menu content={dropdownMenuItems} />
    </Dropdown>
  );
};

export default DropdownMenu;
