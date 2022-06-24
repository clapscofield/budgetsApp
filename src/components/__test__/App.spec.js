import { act as domAct } from "react-dom/test-utils";
import { act as testAct, create } from "react-test-renderer";
import App from "./../../App"

let root;

describe("Testing root", () => {
    it("should render root", () => {
        domAct(() => {
            testAct(() => {
                root = create(<App />);
            });
        });
        expect(root).toMatchSnapshot();
    })
})