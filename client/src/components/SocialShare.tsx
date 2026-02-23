import { Button } from "@/components/ui/button";
import { Share2, Twitter, Facebook, Linkedin, Link2, Check } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";

interface SocialShareProps {
  title: string;
  description: string;
  url?: string;
}

export default function SocialShare({ title, description, url }: SocialShareProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = url || window.location.href;
  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast.success("Link copied to clipboard!");
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  };

  const handleShare = (platform: keyof typeof shareLinks) => {
    window.open(shareLinks[platform], "_blank", "width=600,height=400");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="border-purple-600 text-purple-300 hover:bg-purple-950/50"
        >
          <Share2 className="w-4 h-4 mr-2" />
          Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48 bg-black border-purple-900/30">
        <DropdownMenuItem
          onClick={() => handleShare("twitter")}
          className="cursor-pointer hover:bg-purple-950/50 text-gray-300"
        >
          <Twitter className="w-4 h-4 mr-2" />
          Share on Twitter
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleShare("facebook")}
          className="cursor-pointer hover:bg-purple-950/50 text-gray-300"
        >
          <Facebook className="w-4 h-4 mr-2" />
          Share on Facebook
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => handleShare("linkedin")}
          className="cursor-pointer hover:bg-purple-950/50 text-gray-300"
        >
          <Linkedin className="w-4 h-4 mr-2" />
          Share on LinkedIn
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleCopyLink}
          className="cursor-pointer hover:bg-purple-950/50 text-gray-300"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-green-500" />
              Link Copied!
            </>
          ) : (
            <>
              <Link2 className="w-4 h-4 mr-2" />
              Copy Link
            </>
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
