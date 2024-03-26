import React from "react";
import Tag from "../Tag";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

interface TagProps {
  date?: string;
}

export default function DateTag({ date }: TagProps) {
  return <Tag text={date ? dayjs(date).fromNow() : "None"} />;
}
