import { datetime } from "https://deno.land/x/ptera@v1.0.2/datetime.ts";
import { convertEnds } from "./main.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

// test convertEnds function
Deno.test("convertEnds", () => {
  const ends = "July 24, 2023 at 01:00PM";
  const expected = "2023-07-24 13:00 まで";
  const actual = convertEnds(ends);
  assertEquals(actual, expected);
});

Deno.test("convertEnds2", () => {
  const ends = " September 8, 2023 at 11:00PM";
  const expected = "2023-09-08 23:00 まで";
  const actual = convertEnds(ends);
  assertEquals(actual, expected);
});
