export function compareDates(date1, date2) {
    // Lấy ra các thành phần ngày, tháng, năm của date1 và date2
    const day1 = date1.getDate();
    const month1 = date1.getMonth();
    const year1 = date1.getFullYear();
  
    const day2 = date2.getDate();
    const month2 = date2.getMonth();
    const year2 = date2.getFullYear();
  
    // So sánh theo thứ tự năm -> tháng -> ngày
    if (year1 < year2) {
      return 1; // date1 < date2
    } else if (year1 > year2) {
      return -1; // date1 > date2
    } else {
      // Cùng năm, so sánh tháng
      if (month1 < month2) {
        return 1; // date1 < date2
      } else if (month1 > month2) {
        return -1; // date1 > date2
      } else {
        // Cùng năm và tháng, so sánh ngày
        if (day1 < day2) {
          return 1; // date1 < date2
        } else if (day1 > day2) {
          return -1; // date1 > date2
        } else {
          return 0; // date1 = date2
        }
      }
    }
  }