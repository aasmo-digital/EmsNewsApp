import Snackbar from 'react-native-snackbar';

export const Toast = (
  text: string,
  backgroundColor?: string,
  marginBottom?: number,
) => {
  return Snackbar.show({
    text: text,
    backgroundColor: backgroundColor,
    marginBottom: marginBottom,
  });
};

// export const getTimeAgo = (dateString: string) => {
//   const now = new Date();
//   const past = new Date(dateString);
//   const seconds = Math.floor((now - past) / 1000);

//   const intervals = {
//     year: 31536000,
//     month: 2592000,
//     week: 604800,
//     day: 86400,
//     hour: 3600,
//     minute: 60,
//     second: 1,
//   };

//   for (const key in intervals) {
//     const value = intervals[key];
//     const amount = Math.floor(seconds / value);

//     if (amount > 0) {
//       return `${amount} ${key}${amount > 1 ? 's' : ''} ago`;
//     }
//   }

//   return 'just now';
// };

export const getTimeAgo = (dateString: string) => {
  const now = new Date().getTime();
  const past = new Date(dateString).getTime();
  const seconds = Math.floor((now - past) / 1000);

  if (seconds < 0) return 'in the future';

  const intervals = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  };

  for (const key in intervals) {
    const value = intervals[key];
    const amount = Math.floor(seconds / value);

    if (amount > 0) {
      return `${amount} ${key}${amount > 1 ? 's' : ''} ago`;
    }
  }

  return 'just now';
};
