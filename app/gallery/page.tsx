import LoginProvider from "@/app/components/Login/LoginProvider";
import GalleryRoot from "@/app/components/GalleryRoot/GalleryRoot";



export default function Page({ params }: { params: { } }) {
    return <LoginProvider><GalleryRoot slug={null} /></LoginProvider>;
}