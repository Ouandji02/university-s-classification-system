function compare(a, b, critere) {
  if (a[critere] < b[critere]) {
    return -1;
  }
  if (a[critere] > b[critere]) {
    return 1;
  }
  return 0;
}

objs.sort(compare);
