import { cn } from "@/utils/cn";

interface MdxCodeProps extends React.HTMLAttributes<HTMLElement> {
    "data-language"?: string;
}

export function MdxCode({ className, ...props }: MdxCodeProps) {
    const languageClassExist = className
        ?.split(" ")
        ?.find((className: string) => className.indexOf("language") !== -1);

    const languageProp = Boolean(props["data-language"]) || languageClassExist;

    return (
        <code
            className={cn(
                className,
                languageProp
                    ? ""
                    : "p-1 border border-gray-700 dark:border-purple-600 dark:bg-transparent bg-purple-100",
            )}
            {...props}
        />
    );
}
