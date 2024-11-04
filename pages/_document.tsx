import { identity } from 'lodash';
import Document, { Html, Head, Main, NextScript } from 'next/document';



class CustomDocument extends Document {
    static async getInitialProps(ctx: any) {
        let pageProps = null;

        const originalRenderPage = ctx.renderPage;
        ctx.renderPage = () =>
            originalRenderPage({
                enhanceApp: (App: any) => (props: any) => {
                    pageProps = props.pageProps;
                    return <App {...props} />
                },
                enhanceComponent: (Component: any) => Component,
            })

        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps, pageProps }
    }

    render() {
        const { pageProps }: any = this.props;

        return (
            <Html>
                <Head>
                    <meta property="og:url" content="https://www.elementrogue.com" />
                    <meta property="og:site_name" content="Element Rogue TTRPG" />
                    <meta name="twitter:card" content="summary_large_image" />
                    <meta name="twitter:site" content="@site" />
                    <meta name="twitter:creator" content="@handle" />
                    <link rel="icon" href="/favicon.ico" />
                    <link href = "https://fonts.googleapis.com/css?family=Roboto+Mono|Roboto+Slab|Roboto:300,400,500,700" rel = "stylesheet" />
                    <meta name="robots" content="index,follow" />
                    <meta name="keywords" content="TTRPG, Pathfinder, 13th Age, Dungeons & Dragons, D&D, DnD, Fantasy, Setting, 13 True Ways, Book of Demons, Book of Ages, Book of Loot, Loot Harder, Battle Scenes, The Crown Commands, Fire & Faith, High Magic Low Cunning, Shadows of Eldolan, The Strangling Sea, Eyes of the Stone Thief, Shards of a Broken Sky, 13th Age Glorantha, Pelgrane Press, Drakkenhall City of Monsters" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default CustomDocument;