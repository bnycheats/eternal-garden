import UserDefaultPic from "@/assets/images/user_pic-225x225.png";
import { cn } from "@/lib/utils";

function Avatar(props: AvatarProps) {
  const { className, name, imgUrl } = props;
  return (
    <div
      className={cn(
        "relative inline-flex h-9 w-9 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary shadow-inner",
        className
      )}
    >
      {imgUrl ? (
        <img className="h-full w-full object-cover" src={imgUrl} alt={imgUrl} />
      ) : name ? (
        <span className="font-semibold uppercase text-white">
          {name.charAt(0)}
        </span>
      ) : (
        <img className="'h-full w-full object-cover" src={UserDefaultPic} />
      )}
    </div>
  );
}

type AvatarProps = {
  className?: string;
  name?: string;
  imgUrl?: string;
};

export default Avatar;
