import LoginProvider from "@/app/components/Login/LoginProvider";
import Room from "@/app/components/Room/Room";



export default function Page({ params }: { params: { slug: string } }) {
    return <LoginProvider><Room slug={params.slug} /></LoginProvider>;
}