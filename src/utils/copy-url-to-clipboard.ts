export const copyUrlToClipboard = async (): Promise<boolean> => {
  const currentUrl = window.location.href;
  try {
    await navigator.clipboard.writeText(currentUrl);
    return true;
  } catch (err) {
    console.error('Failed to copy URL: ', err);
    return false;
  }
};