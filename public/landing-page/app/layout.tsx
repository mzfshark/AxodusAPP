import type { Metadata } from "next";
import "./globals.css";
import { Footer, Header } from "./ui";

export const metadata: Metadata = { title:{default:"Axodus — A Governed Prototype",template:"%s — Axodus"}, description:"Axodus is a prototype-stage, research-driven initiative building a governed foundation for a new ecosystem direction.", metadataBase:new URL("https://axodus.example"), openGraph:{title:"Axodus — A Governed Prototype",description:"Research-driven, documentation-first and built through staged execution.",type:"website"}, robots:{index:true,follow:true}, other:{"codex-preview":"development"}, icons:{icon:"/favicon.svg"} };
const themeBootScript = `try{var t=localStorage.getItem("axodus-theme");document.documentElement.dataset.theme=t==="dark"?"dark":"light";}catch(e){document.documentElement.dataset.theme="light";}`;
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><script dangerouslySetInnerHTML={{__html:themeBootScript}}/><a className="skip-link" href="#main">Skip to content</a><Header/><div id="main">{children}</div><Footer/></body></html>}
