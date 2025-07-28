import { Link } from "@/components/intl-link";
import { T } from "@/components/ui/Typography";
import { useNotificationsContext } from "@/contexts/NotificationsContext";
import { cn } from "@/utils/cn";
import { motion } from "framer-motion";

/**
 * Props for the NotificationItem component
 * Defines the structure and optional properties for rendering a notification
 */
type NotificationItemProps = {
  /** Title of the notification */
  title: string;
  /** Detailed description of the notification */
  description: string;
  /** Optional link destination for the notification */
  href?: string;
  /** Optional click handler for the notification */
  onClick?: () => void;
  /** Image URL for the notification avatar */
  image: string;
  /** Indicates if the notification has been read */
  isRead: boolean;
  /** Timestamp when the notification was created */
  createdAt: string;
  /** Indicates if the notification is new */
  isNew: boolean;
  /** Unique identifier for the notification */
  notificationId: string;
  /** Callback triggered on mouse hover */
  onHover: () => void;
  /** Optional custom icon to replace the default image */
  icon?: React.ReactNode;
};

/**
 * Renders an individual notification item with dynamic styling and interactions
 *
 * @param props - Configuration properties for the notification
 * @returns A renderable notification component with optional linking and hover effects
 */
export function NotificationItem({
  title,
  description,
  href,
  image,
  isRead,
  isNew,
  onClick,
  createdAt,
  notificationId,
  onHover,
  icon,
}: NotificationItemProps) {
  // Access the notification mutation context to mark notifications as read
  const { mutateReadNotification } = useNotificationsContext();

  // Shared content rendering for both linked and non-linked notifications
  const content = (
    <motion.div
      // Animate notification entrance with fade and vertical translation
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      onMouseOver={onHover}
      // Dynamically style notification based on read status and hover state
      className={cn(
        "flex items-start w-full py-3 gap-4",
        isRead ? "bg-accent/50" : "bg-background",
        "hover:bg-accent/25 transition-colors duration-200",
      )}
    >
      {/* Render either a custom icon or a default avatar image */}
      {icon ? (
        <div className="w-12 h-12 flex items-center justify-center">{icon}</div>
      ) : (
        <motion.img
          // Animate image scaling for subtle entrance effect
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.2 }}
          src={image}
          alt={title}
          className="h-12 w-12 rounded-full object-cover "
        />
      )}

      {/* Notification text content with typography variations */}
      <div className="grow">
        <T.P className="font-semibold text-foreground leading-5!">{title}</T.P>
        <T.Small className="text-muted-foreground">{description}</T.Small>
        <T.Subtle className="text-xs text-muted-foreground/75">
          {createdAt}
        </T.Subtle>
      </div>

      {/* Render a small indicator for new notifications */}
      {isNew && (
        <motion.div
          // Animate new notification indicator with scale
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="h-2 w-2 rounded-full bg-primary"
        />
      )}
    </motion.div>
  );

  // Conditionally render as a link or a div based on href prop
  if (href) {
    return (
      <Link
        href={href}
        // Mark notification as read when clicked
        onClick={() => mutateReadNotification(notificationId)}
        className="block w-full"
      >
        {content}
      </Link>
    );
  }

  // Render as a standard div with optional click handler
  return (
    <div className="w-full" onClick={onClick}>
      {content}
    </div>
  );
}
