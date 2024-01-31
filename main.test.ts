import { calculateDuration } from "./main.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

Deno.test("calculateDuration function", () => {
  const testData = [
    {
      starts: "2013-11-20T15:00:00+09:00",
      ends: "2013-11-20T16:00:00+09:00",
      expected: 60,
    },];
  for (const data of testData) {
    const result = calculateDuration(data.starts, data.ends);
    assertEquals(result, data.expected);
  }
});
