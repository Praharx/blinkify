import { FeaturesSectionDemo } from "@/components/App/Features";

import GridBackgroundDemo from "@/components/App/gridBackground";
import { FloatingNav } from "@/components/ui/floating-navbar";
export const runtime = "edge";
export default function Home() {

  return (
   <div className=" w-screen bg-black">
      <FloatingNav navItems={[{name: 'Home', link: '/'}, {name: 'About', link: '/about'}, {name: 'Contact', link: '/contact'}]} />
      <GridBackgroundDemo/>
      <FeaturesSectionDemo/>
   </div>
  );
}
