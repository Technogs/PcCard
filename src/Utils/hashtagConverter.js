export default function hashtagConverter(params) {
  let data = params;
  let arr = data.split(',');
  let newArr = [];
  for (let i = 0; i < arr.length; i++) {
    let val = '#' + arr[i];
    newArr.push(val);
  }

  return newArr.toString();
}
