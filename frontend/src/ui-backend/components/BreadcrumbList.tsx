import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import type { BreadCrumbItems } from "../interface/Common";

export function BreadcrumbModule({ href, title, pagename }: BreadCrumbItems) {
  return (
    <Breadcrumb className="flex items-center whitespace-nowrap overflow-hidden">
      <BreadcrumbList className="flex flex-nowrap">
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href={href}>{title}</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{pagename}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
