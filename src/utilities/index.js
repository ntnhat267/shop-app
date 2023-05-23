export const convertToVND = (price) => {
  try {
    const result = price?.toLocaleString();
    return `${result} VND`;
  } catch (error) {
    return null;
  }
};
export const convertToDolla = (price) => {
  try {
    // const result  = price?.toLocaleString();
    let newPrice = Number(price / 30000);
    let result = Math.round(newPrice * 100) / 100;
    // const result  = price / 3000;
    return `$${result} `;
  } catch (error) {
    return null;
  }
};

export const capitalizeFirstLetter = (str) => {
  try {
    return str.charAt(0).toUpperCase() + str.slice(1);
  } catch (error) {
    return null;
  }
};

export const formatTime = (dateString) => {
  try {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");

    const formattedDateString = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDateString;
  } catch (error) {
    return null;
  }
};

export const formatTimeToDate = (dateString) => {
  try {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
  

    const formattedDateString = `${day}/${month}/${year}`;
    return formattedDateString;
  } catch (error) {
    return null;
  }
};

export const paymentMethod =  (method) => {
  try {
    if (method === "later_money") {
      return "Payment on delivery"
    } else {
      return "pay by paypal"
    }
  } catch (error) {
    return null
  }
} 
