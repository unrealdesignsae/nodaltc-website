/* Local-only validation: never calls the form provider or sends email. */
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const scriptDirectory=path.dirname(fileURLToPath(import.meta.url));
import ts from 'typescript';
function load(relative) {
  const filename = path.resolve(scriptDirectory, '../src/lib', relative + '.ts');
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  const mod = {exports:{}};
  new Function('require','module','exports',code)((name)=>load(name.replace('./','')),mod,mod.exports);
  return mod.exports;
}
const {validateEnquiry,validateDrawing,buildEnquiryPayload,MAX_FILE_BYTES}=load('enquiry');
const {dronePhases}=load('survey-content');
const data=new FormData();
Object.entries({name:'Local QA',contact:'qa@example.com',project:'Local test only',location:'Dubai test site',size:'1–10 ha',dateStart:'2026-11-01',dateEnd:'2026-11-03',days:'3',drawingLink:'https://example.com/drawing.pdf'}).forEach(([k,v])=>data.set(k,v));
data.append('services','GPS set-out');data.append('services','Drone Site Scan (add-on)');
dronePhases.forEach(([phase])=>data.append('dronePhases',phase));
assert.equal(validateEnquiry(data),'');
const payload=buildEnquiryPayload(data,'LOCAL-TEST-NOT-A-REAL-KEY','test/drawing.pdf');
assert.equal(payload.drone_phases,dronePhases.map(([p])=>p).join(', '));
assert.equal(payload.services,'GPS set-out, Drone Site Scan (add-on)');
assert.equal(payload.date_start,'2026-11-01');assert.equal(payload.date_end,'2026-11-03');
assert.equal(payload.attachment,'test/drawing.pdf');assert.equal(payload.drawing_link,'https://example.com/drawing.pdf');
assert.equal(payload.set_out_days,'3');assert.equal(payload.replyto,'qa@example.com');
data.set('dateEnd','2026-10-31');assert.match(validateEnquiry(data),/end date/);
data.set('dateEnd','2026-11-03');data.set('dateStart','2026-02-30');assert.match(validateEnquiry(data),/valid start and end dates/);
data.set('dateStart','2026-11-01');data.set('contact','not-an-email');assert.match(validateEnquiry(data),/valid email/);
data.set('contact','+971 50 000 0000');assert.equal(validateEnquiry(data),'');
data.delete('services');data.append('services','GPS set-out');
assert.equal(buildEnquiryPayload(data,'local').drone_phases,'','Hidden drone phases must not be submitted');
data.delete('services');assert.match(validateEnquiry(data),/at least one service/);
assert.equal(validateDrawing({name:'drawing.PDF',size:MAX_FILE_BYTES}),'');
assert.match(validateDrawing({name:'drawing.pdf',size:MAX_FILE_BYTES+1}),/larger than 5 MB/);
assert.match(validateDrawing({name:'drawing.pdf',size:0}),/empty/);
assert.match(validateDrawing({name:'drawing.exe',size:100}),/Choose a DWG/);
console.log('PASS: services, four drone phases, dates, attachment reference, drawing link, hidden-field exclusion and upload boundaries. No network requests.');

// Shared transport regression tests: fake fetch only, no external requests.
const {submitForm,buildBriefPayload}=load('form-submit');
const brief=new FormData();
Object.entries({name:'Local QA',email:'qa@example.com',company:'Local test',brief:'Do not send externally'}).forEach(([k,v])=>brief.set(k,v));
const homePayload=buildBriefPayload(brief,'Festival / Outdoor','LOCAL-TEST-NOT-A-REAL-KEY');
assert.equal(homePayload.replyto,'qa@example.com');
assert.equal(homePayload.email,'qa@example.com');
assert.equal(homePayload.event_type,'Festival / Outdoor');
const surveyData=new FormData();
Object.entries({name:'Local QA',contact:'qa@example.com',project:'Survey test'}).forEach(([k,v])=>surveyData.set(k,v));
const surveyPayload=buildEnquiryPayload(surveyData,homePayload.access_key);
assert.equal(surveyPayload.email,homePayload.email);
assert.equal(surveyPayload.replyto,homePayload.replyto);
assert.equal(surveyPayload.access_key,homePayload.access_key);
for(const payload of [homePayload,surveyPayload]){
  let calls=0;
  await submitForm(payload,async(url,options)=>{
    calls++;
    assert.equal(url,'https://api.web3forms.com/submit');
    assert.equal(options.method,'POST');
    assert.equal(options.headers['Content-Type'],'application/json');
    assert.deepEqual(JSON.parse(options.body),payload);
    return new Response(JSON.stringify({success:true}),{status:200});
  });
  assert.equal(calls,1);
  await assert.rejects(()=>submitForm(payload,async()=>new Response(JSON.stringify({success:false}),{status:200})),/could not be sent/);
  await assert.rejects(()=>submitForm(payload,async()=>new Response(JSON.stringify({success:true}),{status:500})),/could not be sent/);
  await assert.rejects(()=>submitForm(payload,async()=>new Response('{}',{status:429})),/wait a minute/);
  await assert.rejects(()=>submitForm(payload,async()=>new Response('not JSON',{status:502})),/could not be sent/);
  await assert.rejects(()=>submitForm(payload,async()=>{throw new TypeError('network offline')}),/Check your internet/);
}
surveyData.set('contact','+971500000000');
const phonePayload=buildEnquiryPayload(surveyData,'local');
assert.equal(phonePayload.phone,'+971500000000');
assert.equal(phonePayload.email,undefined);
assert.equal(phonePayload.replyto,undefined);
console.log('PASS: both forms use identical transport; success, provider rejection, HTTP errors, rate limits, invalid JSON and offline behavior. No external email.');
