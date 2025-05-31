export function sortRemoveDuplicates(arr) {
  const sortedArr = arr.sort((a, b) => a - b);
  const noDuplicationArr = [];

  sortedArr.forEach((num) => {
    if (!noDuplicationArr.includes(num)) noDuplicationArr.push(num);
  });

  return noDuplicationArr;
}
