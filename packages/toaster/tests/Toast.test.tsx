import * as React from "react";
import { shallow, mount } from "enzyme";
import { createSerializer } from "@emotion/jest";
import toJson from "enzyme-to-json";
import { Toaster, Toast } from "../";

expect.addSnapshotSerializer(createSerializer());

describe("Toast", () => {
  it("renders default", () => {
    const component = shallow(
      <Toaster children={[<Toast title="I Am Toast" key={0} id={0} />]} />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders with description", () => {
    const component = shallow(
      <Toaster
        children={[
          <Toast title="I Am Toast" description="Description" key={0} id={0} />
        ]}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("renders with actions", () => {
    const component = shallow(
      <Toaster
        children={[
          <Toast
            primaryAction={<button>primaryAction</button>}
            secondaryAction={<button>secondaryAction</button>}
            title="I Am Toast"
            key={0}
            id={0}
          />
        ]}
      />
    );
    expect(toJson(component)).toMatchSnapshot();
  });

  it("should call the function in the action when clicked", () => {
    const action = jest.fn();
    const component = mount(
      <Toaster
        children={[
          <Toast
            primaryAction={<button onClick={action}>primaryAction</button>}
            title="I Am Toast"
            key={0}
            id={0}
          />
        ]}
      />
    );
    const primaryActionBtn = component.find(`button`);

    expect(action).not.toHaveBeenCalled();
    primaryActionBtn.simulate("click");
    expect(action).toHaveBeenCalled();
  });

  it("calls dismissToast when the dismiss button is clicked", () => {
    const dismissToastSpy = spyOn(Toaster.prototype, "dismissToast");
    const component = mount(
      <Toaster children={[<Toast title="I Am Toast" key={0} id={0} />]} />
    );
    const dismissBtn = component.find('span[role="button"]');
    expect(dismissToastSpy).not.toHaveBeenCalled();
    dismissBtn.simulate("click");
    expect(dismissToastSpy).toHaveBeenCalled();
  });

  it("should remove the Toast from the Toaster `toasts` state when the dismiss button is clicked", () => {
    const component = mount(
      <Toaster children={[<Toast title="I Am Toast" key={0} id={0} />]} />
    );
    const instance = component.find(Toaster).instance() as Toaster;
    const dismissBtn = component.find('span[role="button"]');
    let toastsState = instance.state.toasts || [];

    expect(toastsState.length).toBe(1);

    dismissBtn.simulate("click");
    toastsState = instance.state.toasts || [];

    expect(toastsState.length).toBe(0);
  });
});
