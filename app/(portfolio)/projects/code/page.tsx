import React, { unstable_ViewTransition as ViewTransition } from "react";

type Props = {};

const Page: React.FC<Props> = () => {
  const years = Array.from({ length: 20 }, (_, i) => i + 2020);
  console.log(years);

  return (
    <div className="overflow-visible space-y-10">
      <ViewTransition name={"coding"}>
        <div className="contain-inline-size rounded-md border-[0.5px] border-gray-300 relative bg-gray-100 dark:bg-gray-950">
          <div className="flex items-center text-gray-700 px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-gray-200 dark:bg-gray-800 select-none">
            jsx
          </div>

          <div className="sticky top-9 md:top-[5.75rem]">
            <div className="absolute bottom-0 right-2 flex h-9 items-center">
              <div className="flex items-center rounded bg-gray-100 px-2 font-sans text-xs text-gray-700 dark:bg-gray-800">
                <span data-state="closed">
                  <button className="flex gap-1 items-center select-none py-1">
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon-sm"
                    >
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z"
                        fill="currentColor"
                      />
                    </svg>
                    Copy code
                  </button>
                </span>
              </div>
            </div>
          </div>

          <div className="overflow-y-auto p-4" dir="ltr">
            <pre className="whitespace-pre-wrap">
              <code>
                {`const findMostFrequentWord = (text) => {
  // แยกคำออกจากข้อความ
  const words = text.split(" ");

  // นับจำนวนครั้งที่คำปรากฏ
  const wordCount = words.reduce((acc, word) => {
    acc[word] = (acc[word] || 0) + 1;
    return acc;
  }, {});

  // ค้นหาคำที่พบบ่อยที่สุด
  let mostFrequentWord = "";
  let maxCount = 0;

  for (const word in wordCount) {
    if (wordCount[word] > maxCount) {
      mostFrequentWord = word;
      maxCount = wordCount[word];
    }
  }

  return mostFrequentWord;
};

    console.log(findMostFrequentWord("hello world hello world hello")); // ผลลัพธ์: "hello"
    console.log(findMostFrequentWord("apple banana apple orange orange orange")); // ผลลัพธ์: "orange"
    console.log(findMostFrequentWord("one two three two three three")); // ผลลัพธ์: "three"

`}
              </code>
            </pre>
          </div>
        </div>
      </ViewTransition>
      <FindMissingNumbers />
      <Isparindrome />
    </div>
  );
};

export default Page;

const FindMissingNumbers = () => {
  const findMissingNumbers = (numbers: number[]) => {
    const missingNumbers: number[] = [];

    for (let i = 0; i < numbers.length - 1; i++) {
      // หาเลขที่ขาดระหว่าง numbers[i] และ numbers[i+1]
      let current = numbers[i];
      const next = numbers[i + 1];

      while (current + 1 < next) {
        current++;
        missingNumbers.push(current);
      }
    }

    return missingNumbers;
  };

  console.log(findMissingNumbers([1, 2, 4, 6, 12, 15]));
  return (
    <div className="contain-inline-size rounded-md border-[0.5px] border-gray-300 relative bg-gray-100 dark:bg-gray-950">
      <div className="flex items-center text-gray-700 px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-gray-200 dark:bg-gray-800 select-none">
        tsx
      </div>

      <div className="sticky top-9 md:top-[5.75rem]">
        <div className="absolute bottom-0 right-2 flex h-9 items-center">
          <div className="flex items-center rounded bg-gray-100 px-2 font-sans text-xs text-gray-700 dark:bg-gray-800">
            <span data-state="closed">
              <button className="flex gap-1 items-center select-none py-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon-sm"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z"
                    fill="currentColor"
                  />
                </svg>
                Copy code
              </button>
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto p-4" dir="ltr">
        <pre className="whitespace-pre-wrap">
          <code>
            {`const years  = Array.from({length:20},(_,i) => i+2020)
console.log(years)
[2020, 2021, 2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035, 2036, 2037, 2038, 2039]

const findMissingNumbers = (numbers: number[]) => {
  const missingNumbers: number[] = [];

  for (let i = 0; i < numbers.length - 1; i++) {
    // หาเลขที่ขาดระหว่าง numbers[i] และ numbers[i+1]
    let current = numbers[i];
    const next = numbers[i + 1];

    while (current + 1 < next) {
      current++;
      missingNumbers.push(current);
    }
  }

  return missingNumbers;
};

console.log(findMissingNumbers([1, 2, 4, 6, 12, 15]));
`}
          </code>
        </pre>
      </div>
    </div>
  );
};

const Isparindrome = () => {
  const isPalindrome = (str: string) => {
    const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
    const reversedStr = cleanedStr.split("").reverse().join("");
    return `${str} is ${cleanedStr === reversedStr ? "" : "not "}parindrome`;
  };
  console.log(isPalindrome("radar"));
  console.log(isPalindrome("hello"));

  return (
    <div className="contain-inline-size rounded-md border-[0.5px] border-gray-300 relative bg-gray-100 dark:bg-gray-950">
      <div className="flex items-center text-gray-700 px-4 py-2 text-xs font-sans justify-between rounded-t-md h-9 bg-gray-200 dark:bg-gray-800 select-none">
        tsx
      </div>

      <div className="sticky top-9 md:top-[5.75rem]">
        <div className="absolute bottom-0 right-2 flex h-9 items-center">
          <div className="flex items-center rounded bg-gray-100 px-2 font-sans text-xs text-gray-700 dark:bg-gray-800">
            <span data-state="closed">
              <button className="flex gap-1 items-center select-none py-1">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon-sm"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 5C7 3.34315 8.34315 2 10 2H19C20.6569 2 22 3.34315 22 5V14C22 15.6569 20.6569 17 19 17H17V19C17 20.6569 15.6569 22 14 22H5C3.34315 22 2 20.6569 2 19V10C2 8.34315 3.34315 7 5 7H7V5ZM9 7H14C15.6569 7 17 8.34315 17 10V15H19C19.5523 15 20 14.5523 20 14V5C20 4.44772 19.5523 4 19 4H10C9.44772 4 9 4.44772 9 5V7ZM5 9C4.44772 9 4 9.44772 4 10V19C4 19.5523 4.44772 20 5 20H14C14.5523 20 15 19.5523 15 19V10C15 9.44772 14.5523 9 14 9H5Z"
                    fill="currentColor"
                  />
                </svg>
                Copy code
              </button>
            </span>
          </div>
        </div>
      </div>

      <div className="overflow-y-auto p-4" dir="ltr">
        <pre className="whitespace-pre-wrap">
          <code>
            {`
const isPalindrome = (str: string) => {
  const cleanedStr = str.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
  const reversedStr = cleanedStr.split("").reverse().join("");
  return \`\${str} is \${cleanedStr === reversedStr ? "" : "not "}a palindrome\`;
};

console.log(isPalindrome("radar")); // radar is a palindrome
console.log(isPalindrome("hello")); // hello is not a palindrome
          `}
          </code>
        </pre>
      </div>
    </div>
  );
};
