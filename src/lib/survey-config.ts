// Public form identifier inherited from Nodal; replace with a dedicated verified form if required.
export const FORM_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "aab72214-a231-401a-a55b-3538d2f2d449";
export const WHATSAPP = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "").replace(/\D/g, "");
export const SOUND_URL = process.env.NEXT_PUBLIC_SOUND_LEVEL_URL || "";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nodaltc.com";
