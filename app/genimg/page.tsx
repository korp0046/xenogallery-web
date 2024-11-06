import LoginProvider from "@/app/components/Login/LoginProvider";
import EditorImageGenerate from "../components/Editors/EditorImageGenerate";



export default function Page({ params }: { params: { } }) {
    return <LoginProvider><EditorImageGenerate /></LoginProvider>;
}