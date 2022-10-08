import Alert from "@/components/Alert";
import Footer from "@/components/Footer";
import Meta from "@/components/Meta";

interface Layout {
  preview: boolean;
  children: string | JSX.Element | JSX.Element[];
}

export default function Layout({ preview, children }): JSX.Element {
  return (
    <>
      <Meta />
      <div className="min-h-screen">
        <Alert preview={preview} />
        <main>{children}</main>
      </div>
      <Footer />
    </>
  );
}
