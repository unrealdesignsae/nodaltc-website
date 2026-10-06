// Public form identifier inherited from Nodal; replace with a dedicated verified form if required.
export const FORM_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || "aab72214-a231-401a-a55b-3538d2f2d449";
export const WHATSAPP = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "971547102223").replace(/\D/g, "");
export const SOUND_URL = process.env.NEXT_PUBLIC_SOUND_LEVEL_URL || "";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://nodaltc.com";

export const PHONE_DISPLAY = WHATSAPP.length === 12 && WHATSAPP.startsWith("971") ? WHATSAPP.replace(/^(971)(\d{2})(\d{3})(\d{4})$/, "+$1 $2 $3 $4") : `+${WHATSAPP}`;
