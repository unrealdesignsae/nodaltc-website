export const dynamic = 'force-static';
import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
export const alt='Nodal Technical Consultancy — Precision Event Engineering.';
export const size={width:1200,height:630};
export const contentType='image/png';
export default async function OpenGraphImage(){
  const photo=await readFile(join(process.cwd(),'public/survey/social-drone.jpg'));
  const logo=await readFile(join(process.cwd(),'public/Nodal logo final-03.png'));
  return new ImageResponse(<div style={{display:'flex',width:'100%',height:'100%',background:'#070a0f',color:'#e8f0fe',position:'relative'}}><img src={`data:image/jpeg;base64,${photo.toString('base64')}`} width={1200} height={630} style={{position:'absolute',inset:0,objectFit:'cover'}} alt=""/><div style={{display:'flex',position:'absolute',inset:0,background:'linear-gradient(90deg,rgba(3,7,13,0.9),rgba(3,7,13,0.4) 55%,transparent)'}}/><div style={{display:'flex',flexDirection:'column',padding:'48px 55px',position:'relative'}}><div style={{display:'flex',gap:15,alignItems:'center',fontSize:22,letterSpacing:5}}><img src={`data:image/png;base64,${logo.toString('base64')}`} width={30} height={36} alt=""/>NODAL</div><div style={{display:'flex',fontSize:11,letterSpacing:2,color:'#98c4d5',marginTop:85}}>TECHNICAL PRODUCTION | TOURING | SITE SURVEY</div><div style={{display:'flex',flexDirection:'column',fontSize:60,lineHeight:1.1,marginTop:22}}><span>Precision behind</span><span style={{color:'#00d4ff'}}>every show.</span></div><div style={{display:'flex',fontSize:17,color:'#b4c1d2',marginTop:32}}>Technical production. From the ground up.</div></div></div>,size);
}
