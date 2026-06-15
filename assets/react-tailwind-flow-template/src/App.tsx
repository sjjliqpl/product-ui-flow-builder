import { FlowShell } from "./components/frame/FlowShell";
import { chapters } from "./data/designStructure";

export default function App() {
  return <FlowShell chapters={chapters} />;
}
