import * as React from "react";
import { cx } from "@emotion/css";
import { IconSize } from "../../shared/types/iconSize";
import { iconSizes } from "../../shared/styles/styleUtils/layout/iconSizes";
import { avatarContainer, avatarSize, avatarImg } from "../style";

const DEFAULT_AVATAR_SIZE: IconSize = "m";

export interface AvatarProps {
  /**
   * URL for the image displayed
   */
  src: string;
  /**
   * Text a screenreader will read aloud when it gets to the avatar
   */
  label?: string;
  /**
   * Which icon size to use for the width and height
   */
  size?: IconSize;
}

const Avatar: React.FC<AvatarProps> = ({
  label,
  src,
  size = DEFAULT_AVATAR_SIZE
}: AvatarProps) => (
  <div
    className={cx(avatarContainer, avatarSize(iconSizes[size]))}
    role="img"
    aria-label={label}
    data-cy="avatar"
  >
    {/*
          tslint:disable react-a11y-img-has-alt
          intententionally not setting "alt" so it doesn't appear in the avatar
          box when/if src is empty or a broken URL
        */}
    <img className={avatarImg} src={src} alt="" />
  </div>
);

Avatar.defaultProps = {
  size: DEFAULT_AVATAR_SIZE
};

export default Avatar;
