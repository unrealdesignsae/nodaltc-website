import { serviceOptions, dronePhases } from './survey-content';
export const MAX_FILE_BYTES = 5 * 1024 * 1024;
export const ALLOWED_EXTENSIONS = /\.(dwg|dxf|vwx|skp|pdf)$/i;
export function validateDrawing(file: Pick<File, 'name' | 'size'>) {
  if (!ALLOWED_EXTENSIONS.test(file.name)) return 'Choose a DWG, DXF, VWX, SKP or PDF drawing.';
  if (file.size === 0) return 'This file is empty. Please choose another drawing.';
  if (file.size > MAX_FILE_BYTES) return 'Your drawing is larger than 5 MB. Please choose a smaller file.';
  return '';
}
export function validateEnquiry(data: FormData) {
  for (const key of ['name','contact','location','size','dateStart','dateEnd']) {
    if (!String(data.get(key)||'').trim()) return 'Please complete all required fields.';
  }
  const contact=String(data.get('contact')).trim();
  const validPhone = /^\+?[\d\s().-]{8,25}$/.test(contact) && contact.replace(/\D/g, '').length >= 8;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact) && !validPhone) return 'Enter a valid email address or phone number, including the country code.';
  const start=String(data.get('dateStart')),end=String(data.get('dateEnd'));
  if (!/^\d{4}-\d{2}-\d{2}$/.test(start) || !/^\d{4}-\d{2}-\d{2}$/.test(end) || !Number.isFinite(Date.parse(start)) || !Number.isFinite(Date.parse(end))) return 'Choose valid start and end dates.';
  if ([start,end].some(date=>new Date(date).toISOString().slice(0,10)!==date)) return 'Choose valid start and end dates.';
  if (start > end) return 'The end date must be on or after the start date.';
  if (!['< 1 ha','1–10 ha','10–50 ha','> 50 ha','Not sure yet'].includes(String(data.get('size')))) return 'Choose a site size.';
  const selected=data.getAll('services').map(String);
  if (!selected.length || selected.some(s=>!serviceOptions.includes(s))) return 'Please select at least one service.';
  if (selected.includes('Drone Site Scan (add-on)') && data.getAll('dronePhases').some(phase=>!dronePhases.some(([name])=>name===String(phase)))) return 'Choose a valid drone scan phase.';
  const link=String(data.get('drawingLink')||'').trim();
  if(link){try{if(!['https:','http:'].includes(new URL(link).protocol))return 'Use a valid web link for your drawing.';}catch{return 'Use a valid web link for your drawing.';}}
  const days=String(data.get('days')||'');
  if (days && (!/^\d+$/.test(days) || Number(days)<1)) return 'Set-out days must be a whole number of at least 1.';
  return '';
}

export function buildEnquiryPayload(data:FormData, accessKey:string, attachmentKey='') {
  const selected=data.getAll('services').map(String);
  const contact=String(data.get('contact')||'').trim();
  const payload:Record<string,unknown>={access_key:accessKey,subject:`Nodal Site Survey enquiry — ${String(data.get('project')||data.get('name')).slice(0,120)}`,from_name:'Nodal Site Survey',name:data.get('name'),contact,event_project:data.get('project'),location:data.get('location'),site_size:data.get('size'),date_start:data.get('dateStart'),date_end:data.get('dateEnd'),services:selected.join(', '),drone_phases:selected.includes('Drone Site Scan (add-on)')?data.getAll('dronePhases').join(', '):'',drawing_link:data.get('drawingLink'),set_out_days:selected.includes('GPS set-out')?data.get('days'):'',message:data.get('message'),botcheck:''};
  if(contact.includes('@')){payload.email=contact;payload.replyto=contact;}else{payload.phone=contact;}
  if(attachmentKey)payload.attachment=attachmentKey;
  return payload;
}
