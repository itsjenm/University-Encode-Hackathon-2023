import Navigation from "./Navigation";


export default function Layout({ children }) {
  return (
    <>
      <Navigation />
      <main style={{marginTop: '300px'}}>{children}</main>
      {/* <Footer /> */}
    </>
  );
}
