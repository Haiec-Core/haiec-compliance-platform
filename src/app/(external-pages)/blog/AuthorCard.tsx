import { Link } from "@/components/intl-link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DBTable } from "@/types";

type Props = {
  author: DBTable<"marketing_author_profiles">;
  trimSummary?: boolean;
};

const AuthorCard = ({ author, trimSummary = true }: Props) => {
  return (
    <Link href={`/blog/authors/${author.slug}`} key={author.id}>
      <Card>
        <CardHeader>
          <div className="flex">
            <Avatar>
              <AvatarImage src={author.avatar_url} />
              <AvatarFallback>
                {generateInitials(author.display_name)}
              </AvatarFallback>
            </Avatar>
            <div className="ml-4">
              <CardTitle>{author.display_name}</CardTitle>
              <CardDescription className="mt-2">
                {trimSummary
                  ? author.bio.length > 120
                    ? author.bio.slice(0, 120) + "..."
                    : author.bio.length
                  : author.bio}
              </CardDescription>
            </div>
          </div>
        </CardHeader>
      </Card>
    </Link>
  );
};

export default AuthorCard;

function generateInitials(name: string) {
  // Split the name into individual words
  const words = name.split(" ");

  // Initialize an empty string to store initials
  let initials = "";

  // Iterate through each word
  for (let i = 0; i < words.length; i++) {
    // Get the first character of each word and convert it to uppercase
    initials += words[i][0].toUpperCase();
  }

  // Return the generated initials
  return initials;
}
