"use client";

import { useState } from "react";
import { Tag } from "@constructpluseu/react";

export function TagRemovableDemo() {
  const [tags, setTags] = useState(["Eletricidade", "Pintura"]);

  return (
    <>
      {tags.map((tag) => (
        <Tag key={tag} status="info" onRemove={() => setTags((current) => current.filter((t) => t !== tag))}>
          {tag}
        </Tag>
      ))}
    </>
  );
}
