import Game from "@/app/components/Game/Game";
import LoginProvider from "@/app/components/Login/LoginProvider";



export default function Page({ params }: { params: { slug: string } }) {
    return <LoginProvider><Game slug={params.slug}/></LoginProvider>;
}