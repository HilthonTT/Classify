"use client";

import { useEffect, useState } from "react";
import { Loader2Icon, TagIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

import { Tag } from "@/types/tag";
import { fetcher } from "@/lib/fetcher";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FormTagsProps {
  onChange: (value: string) => void;
}

export const FormTags = ({ onChange }: FormTagsProps) => {
  const { pending } = useFormStatus();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [tags, setTags] = useState<Tag[] | undefined>(undefined);

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const result = (await fetcher("/api/tags")) as Tag[];

        setTags(result);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTags();
  }, []);

  const disabled = pending || isLoading || tags?.length === 0;

  return (
    <Select onValueChange={onChange} disabled={disabled}>
      <SelectTrigger disabled={disabled}>
        <div className="w-full flex items-center justify-start">
          {isLoading ? (
            <Loader2Icon className="h-5 w-5 mr-2 animate-spin" />
          ) : (
            <TagIcon className="h-5 w-5 mr-2" />
          )}
          <SelectValue
            placeholder={disabled && !isLoading ? "No tags" : "Tags"}
          />
        </div>
      </SelectTrigger>
      <SelectContent>
        {tags && (
          <>
            {tags.map((tag) => (
              <SelectItem key={tag.id} value={String(tag.id)}>
                {tag.name}
              </SelectItem>
            ))}
          </>
        )}
      </SelectContent>
    </Select>
  );
};
