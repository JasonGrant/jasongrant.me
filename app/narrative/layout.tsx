// import '@radix-ui/themes/styles.css';
// import { Theme, ThemePanel } from '@radix-ui/themes';
// import { ThemeProvider } from 'next-themes';
import PageLayout from "@/ui/narrative/PageLayout";
import Home from "@/app/narrative/home/Home";

export default function NarrativeLayout({ children }: { children: React.ReactNode }) {
    return (
        // <ThemeProvider attribute="class">
        //     <Theme
        //     // appearance="dark"
        //     accentColor="blue" 
        //     radius="large" 
        //     >
            <PageLayout
                leftZone={<Home></Home>} 
                children={children}
            ></PageLayout>
        //     </Theme>
        // </ThemeProvider>
    );
}