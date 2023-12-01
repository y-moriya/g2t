import { calculateDuration, convertEnds, fixDate } from "./main.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

// test convertEnds function
Deno.test("convertEnds", () => {
  const ends = "July 24, 2023 at 01:00PM";
  const expected = "2023-07-24 13:00 まで";
  const actual = convertEnds(ends);
  assertEquals(actual, expected);
});

Deno.test("convertEnds2", () => {
  const ends = "September 8, 2023 at 02:30PM";
  const expected = "2023-09-08 14:30 まで";
  const actual = convertEnds(ends);
  assertEquals(actual, expected);
});

Deno.test("convertEnds3", () => {
  const ends = "September 8, 2023 at 12:00PM";
  const expected = "2023-09-08 12:00 まで";
  const actual = convertEnds(ends);
  assertEquals(actual, expected);
});

Deno.test("convertEnds4", () => {
  const ends = "November 24, 2023 at 12:30PM";
  const expected = "2023-11-24 12:30 まで";
  const actual = convertEnds(ends);
  assertEquals(actual, expected);
});

Deno.test("convertEnds5", () => {
  const ends = "December 7, 2023 at 12:30PM";
  const expected = "2023-12-07 12:30 まで";
  const actual = convertEnds(ends);
  assertEquals(actual, expected);
});

Deno.test("convertEnds6", () => {
  const ends = "January 3, 2024 at 12:00AM";
  const expected = "2024-01-03 00:00 まで";
  const actual = convertEnds(ends);
  assertEquals(actual, expected);
});

Deno.test("calculateDuration function", () => {
  const testData = [
    {
      starts: "January 01, 2023 at 12:00PM",
      ends: "January 01, 2023 at 01:00PM",
      expected: 60,
    },
    {
      starts: "January 01, 2023 at 12:00PM",
      ends: "January 01, 2023 at 02:30PM",
      expected: 150,
    },
    {
      starts: "February 20, 2023 at 05:00AM",
      ends: "February 20, 2023 at 06:30AM",
      expected: 90,
    },
    {
      starts: "December 7, 2023 at 09:00AM",
      ends: "December 7, 2023 at 12:30PM",
      expected: 210,
    },
    {
      starts: "January 2, 2024 at 12:00AM",
      ends: "January 3, 2024 at 12:00AM",
      expected: 1440,
    },
  ];

  for (const data of testData) {
    const result = calculateDuration(data.starts, data.ends);
    assertEquals(result, data.expected);
  }
});

// test fixDate function
Deno.test("fixDate", () => {
  const testData = [
    {
      ends: "July 24, 2023 at 01:00PM",
      expected: "July 24 2023 01:00PM",
    },
    {
      ends: "September 8, 2023 at 02:30PM",
      expected: "September 8 2023 02:30PM",
    },
    {
      ends: "September 8, 2023 at 12:00PM",
      expected: "September 8 2023 00:00PM",
    },
    {
      ends: "November 24, 2023 at 12:30PM",
      expected: "November 24 2023 00:30PM",
    },
    {
      ends: "December 7, 2023 at 12:30PM",
      expected: "December 7 2023 00:30PM",
    },
  ];

  for (const data of testData) {
    const result = fixDate(data.ends);
    assertEquals(result, data.expected);
  }
});
