let popupSequence = 0;

export const openPreparedWhatsApp = (url: string) => {
  const windowName = `yacht_dxb_whatsapp_${Date.now()}_${popupSequence++}`;
  let popup: Window | null;

  try {
    popup = window.open("about:blank", windowName);
  } catch {
    return false;
  }

  if (!popup) return false;

  try {
    popup.opener = null;
    popup.location.replace(url);
    return true;
  } catch {
    try {
      popup.close();
    } catch {
      // The usable anchor fallback remains available even if cleanup is blocked.
    }
    return false;
  }
};
