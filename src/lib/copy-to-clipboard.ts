import toast from "react-hot-toast";

export const copyToClipboard = (text: string, fieldName: string) => {
  navigator.clipboard.writeText(text).then(
    () => {
      toast.success(`${fieldName} copied to clipboard`);
    },
    (err) => {
      toast.error("Failed to copy");
      console.error("Could not copy text: ", err);
    }
  );
};
