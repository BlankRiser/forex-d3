interface ReturnData {
  time: any;
  open: any;
  high: any;
  low: any;
  close: any;
  volume: any;
}

export function convertToArrayObjects(data: { [key: string]: Array<number> }): Array<{ [key: string]: number }> {
  const keys = Object.keys(data);
  return data[keys[0]].map((_, index) => {
    const obj: { [key: string]: number } = {};
    keys.forEach((key) => {
      obj[key] = data[key][index];
    });
    return obj;
  });
}
