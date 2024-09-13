import { type ReactNode, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { ROUTER } from '@/constants/router';

import useGetMyContents from '@/hooks/profile/use-get-my-contents';

import ProfileLayout from '@/components/layouts/profile-layout';
import MenuBar from '@/components/menu-bar';

import { ContentItem, NavItem, ProfileHeader, UserSettings } from './components';

import s from './style.module.scss';

import { ArrowDownIcon, ArrowUpIcon, ArticleIcon, ForwardIcon, PersonIcon } from '@/assets/icons';

export default function Profile() {
  const router = useRouter();
  const [openContents, setOpenContents] = useState<boolean>(false);
  const { data, isPending } = useGetMyContents({ id: 1, open: openContents });

  let contents;

  if (openContents && isPending) {
    contents = <div>로딩중?</div>;
  }

  if (openContents && data) {
    contents = (
      <div className={s.contentsWrapper}>
        {data.map((page) => (
          <>
            {page.content.map((e) => (
              <ContentItem key={e.contentId} content={e} />
            ))}
          </>
        ))}
      </div>
    );
  }

  return (
    <div className={s.profileContainer}>
      <ProfileHeader text="프로필 수정" />
      <main>
        <div className={s.profileWrapper}>
          <Image src="/images/default_profile.png" alt="profile img" width={76} height={76} />
          <div className={s.userInfoWrapper}>
            <div>졸린 무지</div>
            <p>2342@gmail.com</p>
          </div>
        </div>
        <nav className={s.navWrapper}>
          <NavItem leftIcon={<PersonIcon />} text="내 정보 보기" rightIcon={<ForwardIcon />} onClick={() => router.push(`${ROUTER.profileEdit}/1`)} />
          <NavItem
            leftIcon={<ArticleIcon />}
            text="내 작성글 모두보기"
            rightIcon={!openContents ? <ArrowDownIcon /> : <ArrowUpIcon />}
            onClick={() => setOpenContents((prev) => !prev)}
          />
        </nav>
        {contents}
      </main>
      <UserSettings />
    </div>
  );
}

Profile.getLayout = (page: ReactNode) => (
  <ProfileLayout>
    {page}
    <MenuBar pk={1} />
  </ProfileLayout>
);
