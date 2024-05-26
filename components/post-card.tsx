import Image from "next/image";
import PostProgress from "./post-progress";
import { IconBadge } from "./icon-badge";
import { BookOpen } from "lucide-react";
import Link from "next/link";

interface PostCardProps {
  id: string;
  title: string;
  imageUrl: string;
  sectionsLength: number;
  progress: number | null;
  category: string;
};

const PostCard = ({
  id,
  title,
  imageUrl,
  sectionsLength,
  progress,
  category,
}: PostCardProps) => {
  return (
    <Link href={`/posts/${id}`}>
      <div className="group hover:shadow-sm transition overflow-hidden border rounded-lg p-3 h-full">
        <div className="relative w-full aspect-video rounded-md overflow-hidden">
          <Image fill className="object-cover" alt={title} src={imageUrl} />
        </div>
        <div className="flex flex-col pt-2">
          <div className="text-lg md:text-base font-medium group-hover:text-sky-700 transition live-clamp-2">
            {title}
          </div>
          <p className="text-xs text-muted-foreground">{category}</p>
          <div className="my-3 flex items-center gap-x-2 text-sm md:text-xs">
            <div className="flex items-center gap-x-1 text-slate-500">
              <IconBadge size="sm" icon={BookOpen} />
              <span>{sectionsLength}</span> {sectionsLength === 1 ? "section" : "sections"}
            </div>
          </div>
          {progress !== null ? (
            <div>
              <PostProgress
                value={progress}
                variant={progress === 100 ? "success" : "default"}
                size="sm"
              />
            </div>
          ) : (
            <p className="text-md md:text-sm font-medium text-slate-700">
              not subscribed
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}
 
export default PostCard;