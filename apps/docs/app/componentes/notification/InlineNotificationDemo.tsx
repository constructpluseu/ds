"use client";

import { InlineNotification } from "@constructpluseu/react";

export function InlineNotificationDemo({
  status,
  title,
  description,
}: {
  status: "info" | "success" | "warning" | "danger";
  title: string;
  description?: string;
}) {
  return <InlineNotification status={status} title={title} description={description} />;
}
