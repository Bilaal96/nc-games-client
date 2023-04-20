function getDateStringFromTimestamp(unixTimestamp) {
  // example: Fri, 5 February 2021
  return new Date(unixTimestamp).toLocaleDateString(undefined, {
    weekday: 'short',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default getDateStringFromTimestamp;
