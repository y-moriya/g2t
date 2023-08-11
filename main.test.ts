import { calculateDuration, convertEnds } from "./main.ts";
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

Deno.test("convertEnds3", () => {
  const ends = " September 8, 2023 at 12:00AM";
  const expected = "2023-09-08 12:00 まで";
  const actual = convertEnds(ends);
  assertEquals(actual, expected);
});

Deno.test("calculateDuration function", () => {
  const testData = [
    {
      starts: "January 01, 2023 at 12:00AM",
      ends: "January 01, 2023 at 01:00PM",
      expected: 60,
    },
    {
      starts: "January 01, 2023 at 12:00AM",
      ends: "January 01, 2023 at 02:30PM",
      expected: 150,
    },
    {
      starts: "February 20, 2023 at 05:00AM",
      ends: "February 20, 2023 at 06:30AM",
      expected: 90,
    },
  ];

  for (const data of testData) {
    const result = calculateDuration(data.starts, data.ends);
    assertEquals(result, data.expected);
  }
});
