import { renderHook } from "@testing-library/react-hooks";
import useAuth from "./useAuth";

describe("useAuth", () => {
  test("should return undefined token", () => {
    const { token } = renderHook(() => useAuth("xxxx"));
    expect(token).toBe(undefined);
  });
});
