import {
  Skeleton,
  Image,
  Avatar,
  ImageProps,
  AvatarProps,
} from "@chakra-ui/react";
import { useState } from "react";

interface SkeletonAvatarProps extends ImageProps {
  alt: string;
  isLoaded?: boolean;
}

// renders a skeleton while the image `src` is loading to avoid layout shifts
// useful for profile pictures and other circular images
// example: <SkeletonAvatar src={user.profilePicture} alt={user.name} />
export default function SkeletonAvatar({
  w,
  h,
  isLoaded,
  alt,
  ...props
}: SkeletonAvatarProps) {
  const [loaded, setLoaded] = useState(!props.src);
  const sharedProps = { w, h };

  return (
    <Skeleton
      isLoaded={(isLoaded === undefined || isLoaded) && loaded}
      borderRadius="full"
      {...sharedProps}
    >
      {props.src ? (
        <Image
          {...props}
          {...sharedProps}
          alt={alt}
          borderRadius="full"
          onLoad={() => setLoaded(true)}
          objectFit="cover"
        />
      ) : (
        <Avatar
          {...(props.src && { bg: "white" })}
          {...(props as AvatarProps)}
          {...sharedProps}
        />
      )}
    </Skeleton>
  );
}
