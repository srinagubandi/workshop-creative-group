import { beforeEach, describe, expect, it, vi } from "vitest";

const mocks = vi.hoisted(() => ({ deleteAdminSession: vi.fn() }));
vi.mock("./db", () => ({ deleteAdminSession: mocks.deleteAdminSession }));

import { adminRouter } from "./adminRouter";

describe("admin.logout", () => {
  beforeEach(() => mocks.deleteAdminSession.mockReset());

  it("invalidates the custom administrator session and reports success", async () => {
    const caller = adminRouter.createCaller({} as any);
    const result = await caller.logout({ token: "secure-session-token" });
    expect(result).toEqual({ success: true });
    expect(mocks.deleteAdminSession).toHaveBeenCalledWith("secure-session-token");
  });
});
