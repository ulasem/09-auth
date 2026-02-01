import Link from 'next/link';
import Image from 'next/image';
import { getServerMe } from '@/lib/api/serverApi';

import css from './ProfilePage.module.css';

const Profile = async () => {
  const user = await getServerMe();

  const avatarSrc = user?.avatar || 'https://ac.goit.global/fullstack/react/default-avatar.jpg';

  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>

          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>

        <div className={css.avatarWrapper}>
          <Image
            src={avatarSrc}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
            loading="eager"
            priority
          />
        </div>

        <div className={css.profileInfo}>
          <p>Email: {user?.email}</p>
          {user?.username && <p>Username: {user.username}</p>}
        </div>
      </div>
    </main>
  );
};

export default Profile;
