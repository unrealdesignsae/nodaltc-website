'use client';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { Check, LoaderCircle, ArrowRight } from 'lucide-react';
import { FORM_KEY } from '@/lib/survey-config';
import { submitForm } from '@/lib/form-submit';
import { serviceOptions, dronePhases } from '@/lib/survey-content';
import { validateEnquiry, buildEnquiryPayload } from '@/lib/enquiry';

export function EnquiryForm() {
  const [selectedServices,setSelectedServices]=useState<string[]>([]);
  const successRef=useRef<HTMLDivElement>(null);
  const [error,setError]=useState('');
  const [busy,setBusy]=useState(false);
  const sendingRef=useRef(false);
  const [success,setSuccess]=useState(false);
  const [startDate,setStartDate]=useState('');
  const errorRef=useRef<HTMLParagraphElement>(null);
  useEffect(()=>{if(success)successRef.current?.focus();},[success]);
  function showError(message:string){setError(message);requestAnimationFrame(()=>errorRef.current?.focus());}
  async function submit(event:FormEvent<HTMLFormElement>){
    event.preventDefault(); if(sendingRef.current)return;
    const form=event.currentTarget, data=new FormData(form);
    if(data.get('website')){showError('Unable to send this enquiry. Please email info@nodaltc.com.');return;}
    const issue=validateEnquiry(data);if(issue){showError(issue);return;}
    setError('');sendingRef.current=true;setBusy(true);
    try{
      const payload=buildEnquiryPayload(data,FORM_KEY);
      await submitForm(payload);
      setSuccess(true);setSelectedServices([]);form.reset();setStartDate('');
    }catch(err){showError(err instanceof Error && err.name!=='TimeoutError' ? err.message : 'The connection timed out. Please retry or email info@nodaltc.com.');}
    finally{sendingRef.current=false;setBusy(false);}
  }
  if(success)return <div className="form-success" ref={successRef} role="status" tabIndex={-1}><Check size={36}/><h3>Enquiry received.</h3><p>Thank you. We’ll come back with a proposal within 24 hours.</p><button className="button button-outline" onClick={()=>setSuccess(false)}>Send another enquiry</button></div>;
  return <form className="enquiry-form" aria-label="Site survey enquiry" aria-busy={busy} onSubmit={submit}><p className="form-required-note">Fields marked <span>*</span> are required. Drawings are optional.</p>
    <div className="honeypot" aria-hidden="true"><label>Leave empty<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
    <fieldset disabled={busy} className="form-grid"><legend className="sr-only">Project and contact details</legend>
      <div className="form-section-title full"><span>01</span><div><h3>Your site</h3><p>Where are we working?</p></div></div>
      <label className="field">Event / project name<input name="project" placeholder="Event or project" maxLength={200}/></label>
      <label className="field"><span>Location (city / site) <span className="required">*</span></span><input name="location" placeholder="City and site" maxLength={200} required/></label>
      <label className="field"><span>Approx. site size <span className="required">*</span></span><select name="size" defaultValue="" required aria-describedby="size-help"><option value="" disabled>Select size</option>{['< 1 ha','1–10 ha','10–50 ha','> 50 ha','Not sure yet'].map(size=><option key={size}>{size}</option>)}</select><small id="size-help" className="field-help">1 hectare = 10,000 m². An estimate is fine.</small></label>
      <div className="form-section-title full"><span>02</span><div><h3>Services & timing</h3><p>Select all the support you need.</p></div></div>
      <fieldset className="service-options full"><legend>Services needed <span className="required">*</span></legend><div className="checks">{serviceOptions.map(service=><label key={service}><input type="checkbox" name="services" value={service} checked={selectedServices.includes(service)} onChange={e=>setSelectedServices(current=>e.target.checked?[...current,service]:current.filter(value=>value!==service))}/><span>{service}</span></label>)}</div><p className="selection-help" aria-live="polite">{selectedServices.length ? `${selectedServices.length} service${selectedServices.length===1?'':'s'} selected` : 'Choose at least one service.'}</p></fieldset>
      {selectedServices.includes('Drone Site Scan (add-on)')&&<fieldset className="service-options drone-phase-options full"><legend>Drone scan phases — select all that apply</legend><div className="checks">{dronePhases.map(([phase])=><label key={phase}><input type="checkbox" name="dronePhases" value={phase}/><span>{phase}</span></label>)}</div></fieldset>}
      {selectedServices.includes('GPS set-out')&&<label className="field full">Estimated set-out days (optional)<input type="number" name="days" placeholder="e.g. 3" min="1" step="1"/></label>}
      <fieldset className="date-group full"><legend>Your working date range <span className="required">*</span></legend><div className="date-fields"><label className="field"><span>Start date</span><input type="date" name="dateStart" aria-label="Start date" required defaultValue="" onInput={e=>setStartDate(e.currentTarget.value)}/></label><span className="date-to">to</span><label className="field"><span>End date</span><input type="date" name="dateEnd" aria-label="End date" min={startDate||undefined} required/></label></div></fieldset>
      <div className="form-section-title full"><span>03</span><div><h3>Your details</h3><p>How can we reach you?</p></div></div>
      <label className="field"><span>Name / Company <span className="required">*</span></span><input name="name" autoComplete="name" placeholder="Your name or company" maxLength={150} required/></label>
      <label className="field"><span>Email / Phone (WhatsApp) <span className="required">*</span></span><input name="contact" autoCapitalize="none" spellCheck={false} placeholder="Email or phone with country code" maxLength={150} required/></label>
      <div className="form-section-title full"><span>04</span><div><h3>Drawing & brief</h3><p>Optional details to help us scope the work.</p></div></div>
      <label className="field full">Drawing download link (optional)<input type="url" name="drawingLink" placeholder="https://…" maxLength={2000}/><small className="field-help">Share a link we can open, or email your drawing to info@nodaltc.com.</small></label>
      <label className="field full">Anything else we should know?<textarea name="message" rows={3} maxLength={5000} placeholder="Tell us about your site, access or specific requirements…"/></label>
    </fieldset>
    {error&&<p className="form-error" ref={errorRef} role="alert" tabIndex={-1}>{error}</p>}
    <button className="button button-primary submit-button" type="submit" disabled={busy}>{busy?<><LoaderCircle className="spin" size={18}/>Sending enquiry…</>:<>Send enquiry <ArrowRight size={18} aria-hidden="true"/></>}</button>
    <p className="form-note">We use your details and drawing to respond to this enquiry. <a href="/privacy">Privacy notice</a></p>
  </form>;
}
