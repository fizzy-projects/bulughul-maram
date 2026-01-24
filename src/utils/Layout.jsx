import { Link, Outlet } from "react-router-dom";

function Layout( {includeHeader=false} ) {
  return (
    <>
      
      {includeHeader && 
        <div>
            <header style={{ padding: "1rem", background: "#eee" }}>
            <nav>
              <Link to="/">Home</Link> |{" "}
              <Link to="/login">Admin</Link> |{" "}
            </nav>
          </header>
          {/* <main style={{ padding: "1rem" }}>
            <Outlet />
          </main> */}
      </div>}
      
      <Outlet/>
    </>

  );
}

export default Layout;
