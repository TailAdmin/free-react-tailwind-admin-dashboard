import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { useTranslations } from "@/i18n";
import { HorizontalDotsIcon } from "@/icons";

export default function CardHeader() {
  const t = useTranslations("ecommerce.monthlySales");
  const tCommon = useTranslations("common");

  return (
    <div className="flex items-center justify-between">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        {t("title")}
      </h3>
      <DropdownMenu>
        <DropdownMenuTrigger render={<Button variant="ghost" size="icon-xs" />}>
          <HorizontalDotsIcon />
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="min-w-40">
          <DropdownMenuItem>{tCommon("viewMore")}</DropdownMenuItem>
          <DropdownMenuItem variant="destructive">
            {tCommon("delete")}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
