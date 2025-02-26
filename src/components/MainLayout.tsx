import {Outlet} from "react-router";

export function MainLayout() {
  return <div className="background">
    <video autoPlay loop muted playsInline>
      <source src="public/Background.mp4" type="video/mp4"/>
      your browser does not support the video tag.
    </video>
    <Outlet/>
  </div>
}