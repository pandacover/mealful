import { FC, lazy, Suspense } from "react";
const Abstract = lazy(() => import("./components/Abstract"))

const App: FC = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Abstract />
      </Suspense>
    </div>
  );
}

export default App;
