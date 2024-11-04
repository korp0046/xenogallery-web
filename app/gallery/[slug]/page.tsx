import LoginProvider from "@/app/components/Login/LoginProvider";
import Gallery from "@/app/components/Gallery/Gallery";



export default function Page({ params }: { params: { slug: string } }) {
    return <LoginProvider><Gallery slug={params.slug} /></LoginProvider>;
}