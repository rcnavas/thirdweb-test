import Spline from "@splinetool/react-spline/next";
import { Application } from "@splinetool/runtime";

export default function Page() {
  function onLoad(spline: Application) {
    spline.setVariables({ X: 0, Z: 0 });
  }
  return (
    <main>
      <Spline
        scene="https://prod.spline.design/Ta0wTlrqf-rlGl9Q/scene.splinecode"
        onLoad={onLoad}
      />
    </main>
  );
}
