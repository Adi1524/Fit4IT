export const validateFirstPage = () => {
  if (!userDetails.age || userDetails.age < 1 || userDetails.age > 60) {
    alert("Please enter a valid age between 1 and 60");
    return false;
  }
  if (
    !userDetails.height ||
    userDetails.height < 50 ||
    userDetails.height > 220
  ) {
    alert("Please enter a valid height (50 - 220 cm)");
    return false;
  }
  if (
    !userDetails.weight ||
    userDetails.weight < 10 ||
    userDetails.weight > 200
  ) {
    alert("Please enter a valid weight (10 - 200 kg)");
    return false;
  }
  if (!userDetails.gender) {
    alert("Please select your gender");
    return false;
  }
  return true;
};
