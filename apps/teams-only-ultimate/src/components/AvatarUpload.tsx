"use client";
import { Button } from "@/components/ui/button";
import { Camera } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

export function AvatarUpload({
  avatarUrl,
  onFileChange,
}: {
  avatarUrl: string;
  onFileChange: (file: File) => void;
}) {
  const [preview, setPreview] = useState(avatarUrl);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onFileChange(file);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200 shrink-0">
        {preview ? (
          <Image
            src={preview}
            alt="Avatar preview"
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full text-gray-400">
            <Camera size={32} />
          </div>
        )}
      </div>
      <div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          Change Avatar
        </Button>
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />
      </div>
    </div>
  );
}
