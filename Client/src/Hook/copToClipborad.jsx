import { useState } from 'react';
const useCopyToClipboard = () => {
  const [isCopied, setIsCopied] = useState(false);
  const copyToClipboard = async (text) => {
    if (!document.hasFocus()) {
      console.error('Failed to copy text to clipboard: Document is not focused');
      return;
    }
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy text to clipboard:', error);
      setIsCopied(false);
    }
  };
  return { isCopied, copyToClipboard };
};
export default useCopyToClipboard;
