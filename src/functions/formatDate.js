import { format } from "date-fns";

export const formatDate = (date) => {
  const dateString = format(date, "dd MMMM yyyy");

  const month = [
    {
        name : "January",
        value : "Janvier"
    },
    {
        name : "February",
        value : "Fevrier"
    },
    {
        name : "March",
        value : "Mars"
    },
    {
        name : "January",
        value : "Janvier"
    },
    {
        name : "January",
        value : "Janvier"
    },
    {
        name : "January",
        value : "Janvier"
    },
    {
        name : "January",
        value : "Janvier"
    },
    {
        name : "January",
        value : "Janvier"
    },
    {
        name : "January",
        value : "Janvier"
    },
    {
        name : "January",
        value : "Janvier"
    },
  ]
  console.log(dateString.split(" ")[1]);
  var finalDate = ""
  switch (dateString.split(" ")[1].toLocaleLowerCase) {
    case "january":
      finalDate = dateString.replace("January", "janvier");
      return dateString;
      break;
    case "february":
      finalDate = dateString.replace("february", "fevrier");
      return dateString;
      break;
    default:
      finalDate = dateString.replace("November", "novembre");
    break;
      return dateString;
  }
};
