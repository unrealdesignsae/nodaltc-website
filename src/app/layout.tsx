import type { Metadata, Viewport } from 'next';
import { Inter, Rajdhani, Share_Tech_Mono } from 'next/font/google';
import './globals.css';
import './survey.css';
import './experience.css';
import './integration.css';
import './survey-symbols.css';
import { SITE_URL } from '@/lib/survey-config';
const inter=Inter({subsets:['latin'],variable:'--font-body',weight:['300','400','500','600']});
const rajdhani=Rajdhani({subsets:['latin'],variable:'--font-display',weight:['400','500','600','700']});
const mono=Share_Tech_Mono({subsets:['latin'],variable:'--font-mono',weight:'400'});
const title='Nodal Technical Consultancy — Precision Event Engineering';
const description='Technical production, AV systems integration, international touring and event site survey. Nodal Technical Consultancy, Dubai, UAE.';
export const viewport:Viewport={themeColor:'#070a0f',colorScheme:'dark',width:'device-width',initialScale:1};
export const metadata:Metadata={
  ...(SITE_URL?{metadataBase:new URL(SITE_URL),alternates:{canonical:SITE_URL}}:{}),
  title,description,
  keywords:['technical production UAE','event engineering Dubai','international tour production','AV systems integration','GPS site survey UAE','drone site scan events'],
  robots:{index:process.env.NEXT_PUBLIC_ALLOW_INDEXING==='true',follow:true},
  openGraph:{title,description:description,type:'website',siteName:'Nodal Technical Consultancy',locale:'en_AE',...(SITE_URL?{url:SITE_URL}:{})},
  twitter:{card:'summary_large_image',title,description:description},
  icons:{icon:'/Nodal logo final-03.png'},
};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en" className={`${inter.variable} ${rajdhani.variable} ${mono.variable}`}><body className="bg-[#070a0f] text-[#e8f0fe] font-[var(--font-body)] antialiased overflow-x-hidden"><a className="skip-link" href="#main-content">Skip to main content</a>{children}</body></html>;}
