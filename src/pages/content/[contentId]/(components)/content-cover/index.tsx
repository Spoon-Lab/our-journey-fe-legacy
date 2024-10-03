import Image from 'next/image';

import type { Content, ContentWriterDto } from '@/types/threads';

import { formatTimeStamp } from '@/utils/format-date-timestamp';

import ParallaxImage from '../parallax-image';

import s from './style.module.scss';

interface ContentCoverProps {
  content: Content;
  user: ContentWriterDto;
}

export default function ContentCover({ content, user }: ContentCoverProps) {
  const { title, postImg, createdAt } = content || {};
  const { profileImgUrl, name } = user || {};

  return (
    <div className={s.contentCover}>
      <div className={s.contentContainer}>
        <div className={s.contentInfoWrapper}>
          <div className={s.memoryDateWrapper}>
            <span className={s.timeStamp}>{formatTimeStamp(createdAt)} Memory</span>
          </div>
          <div className={s.contentInfo}>
            <div className={s.contentTitle}>{title || 'No data'}</div>
            <div className={s.writerInfo}>
              <div className={s.profileImage}>
                {profileImgUrl ? (
                  <Image src={profileImgUrl} alt="profile-image" width={40} height={40} />
                ) : (
                  <span className={s.invalidImage}>현재 유효하지 않은 이미지입니다.</span>
                )}
              </div>
              <span className={s.writerName}>{name}</span>
            </div>
          </div>
        </div>
        <div className={s.imageWrapper}>
          <div className={s.imageGradient} />
          {postImg ? <ParallaxImage src={postImg} alt="content-image" /> : <span className={s.invalidImage}>현재 유효하지 않은 이미지입니다.</span>}
        </div>
      </div>
    </div>
  );
}
